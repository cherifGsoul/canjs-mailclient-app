(function($, can) {
    can.Control.extend('Toolbar', {
        init: function(el, options) {
            var state = options.state,

                self = this;

            this.update();
        },
        update: function() {
            var self = this;
            this.element.html(can.view('js/app/templates/email/toolbar.mustache', {
                state: self.options.state,
                selected: self.options.selected
            }));
        },
        '.delete click': function(el, ev) {
            var emails = this.options.state.attr('selected');
            can.trigger(this.options.state, 'destroy', emails);
        },
        '{document} off': function(el, ev) {

        }

    })
})(jQuery, can)