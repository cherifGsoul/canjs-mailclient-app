/*!
 * CanJS - 2.0.4
 * http://canjs.us/
 * Copyright (c) 2013 Bitovi
 * Mon, 23 Dec 2013 19:49:29 GMT
 * Licensed MIT
 * Includes: can/map/sort
 * Download from: http://canjs.com
 */
(function(can) {

    var proto = can.List.prototype,
        _changes = proto._changes,
        setup = proto.setup;

    // extend the list for sorting support
    can.extend(proto, {
            comparator: undefined,
            sortIndexes: [],


            sortedIndex: function(item) {
                var itemCompare = item.attr(this.comparator),
                    equaled = 0,
                    i;

                for (var i = 0, length = this.length; i < length; i++) {
                    if (item === this[i]) {
                        equaled = -1;
                        continue;
                    }

                    if (itemCompare <= this[i].attr(this.comparator)) {
                        return i + equaled;
                    }
                }

                return i + equaled;
            },


            sort: function(method, silent) {
                var comparator = this.comparator,
                    args = comparator ? [
                        function(a, b) {
                            a = (typeof a[comparator] === 'function') ? a[comparator]() : a[comparator];
                            b = (typeof b[comparator] === 'function') ? b[comparator]() : b[comparator];
                            return a === b ? 0 : (a < b ? -1 : 1);
                        }
                    ] : [method],
                    res = [].sort.apply(this, args);

                !silent && can.trigger(this, "reset");
            }
        });

    // create push, pop, shift, and unshift
    // converts to an array of arguments
    var getArgs = function(args) {
        return args[0] && can.isArray(args[0]) ?
            args[0] :
            can.makeArray(args);
    };

    can.each({

            push: "length",

            unshift: 0
        },
        // adds a method where
        // - name - method name
        // - where - where items in the array should be added

        function(where, name) {
            var proto = can.List.prototype,
                old = proto[name];

            proto[name] = function() {
                // get the items being added
                var args = getArgs(arguments),
                    // where we are going to add items
                    len = where ? this.length : 0;

                // call the original method
                var res = old.apply(this, arguments);

                // cause the change where the args are:
                // len - where the additions happened
                // add - items added
                // args - the items added
                // undefined - the old value
                if (this.comparator && args.length) {
                    this.sort(null, true);
                    can.batch.trigger(this, "reset", [args]);
                    this._triggerChange("" + len, "add", args, undefined);
                }

                return res;
            }
        });

    //- override changes for sorting
    proto._changes = function(ev, attr, how, newVal, oldVal) {
        if (this.comparator && /^\d+./.test(attr)) {
            // get the index
            var index = +(/^\d+/).exec(attr)[0],
                // and item
                item = this[index];

            if (typeof item != "undefined") {
                // and the new item
                var newIndex = this.sortedIndex(item);

                if (newIndex !== index) {
                    // move ...
                    [].splice.call(this, index, 1);
                    [].splice.call(this, newIndex, 0, item);

                    can.trigger(this, "move", [item, newIndex, index]);
                    can.trigger(this, "change", [
                            attr.replace(/^\d+/, newIndex),
                            how,
                            newVal,
                            oldVal
                        ]);

                    return;
                }
            }
        }

        _changes.apply(this, arguments);
    };

    //- override setup for sorting
    proto.setup = function(instances, options) {
        setup.apply(this, arguments);

        if (this.comparator) {
            this.sort()
        }
    };

    return can.Map;
})(can);