(function($, can) {
    can.Component.extend({
        tag: 'mails',
        scope: function() {
            return {
                map: new Scope(),
            }
        },
        events: {
            '{can.route} folder': function(route, folder) {
                this.scope.attr('map.folder', route.attr('folder'));
            },
            '{scope} folder': function(scope) {
                can.route.attr('folder', scope.attr('folder'));
            },
            'li.folder-item click': function(el, ev) {
                var folder = can.data(can.$(el), 'folder');
                this.scope.attr('folder', folder.attr('id'));
            }
        },


        helpers: {
            isSelected: function(options) {
                var selected = this.attr('map.selected');
                if (selected.indexOf(options.context) >= 0) {
                    return options.fn();
                } else {
                    return options.inverse();
                }
            },

            isActive: function(options) {
                var folder = this.attr('map.folder');
                if (folder == options.context.id) {
                    return options.fn();
                } else {
                    return options.inverse();
                }
            }
        }

    })
})(jQuery, can)