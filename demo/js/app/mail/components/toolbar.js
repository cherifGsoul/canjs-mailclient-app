(function($, can) {
    can.Component.extend({
        tag: 'toolbar',
        template: can.view("js/app/templates/email/toolbar.mustache"),
        scope: {
            selected: [],
            restFolders: [],
            moveTo: function(selected, from, to) {
                selected.each(function(email) {
                    var index = email.attr('folders').indexOf(from);
                    if (index > -1) {
                        email.attr('folders').splice(index, 1);
                        email.attr('folders').push(to);
                    }
                })
            },
            toogleMove: function(data, el, ev) {
                var map = this.attr('map');
                if (this.attr('restFolders').length) {
                    this.attr('restFolders', []);
                } else {
                    var foldersList = map.attr('folders');
                    var folders = foldersList.filter(function(folder) {
                        return folder.attr('id') != map.attr('folder');
                    })
                    this.attr('restFolders', folders);
                }

                ev.stopImmediatePropagation();

            },
        },
        events: {

            '.move-action click': function(el, ev) {
                var selected = this.scope.attr('map').attr('selected');
                var folder = this.scope.attr('map').attr('folder');
                this.scope.moveTo(selected,
                    folder,
                    el.prop('id'));
                this.scope.attr('map').attr('selected', []);

            },

            '{document} click': function(el, ev) {
                this.scope.attr('restFolders', []);
            }
        },

        helpers: {

            isOneSelected: function(length, options) {
                if (can.isFunction(length)) {
                    var length = length();
                }
                if (length != 1)
                    return options.fn();

                else {
                    return options.inverse();
                }
            }
        }
    });
})(jQuery, can);