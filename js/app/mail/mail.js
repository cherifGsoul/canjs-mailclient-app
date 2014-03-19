(function($, can) {
    can.Control.extend('Mail', {
        init: function(el, options) {
            var state = options.state,
                folders = new Folder.List({});
            var self = this;
            new Navigation('#menu', {
                state: state,
                folders: folders
            });

            this.on();
        },
        '{state} folder': function(state) {
            can.route.attr('folder', state.attr('folder'));
        },
        '{can.route} folder': function(route) {
            this.options.state.attr('folder', route.attr('folder'));
        },
        '{state} destroy': function(state, ev, emails) {
            var self = this;
            var selected = self.options.state.attr('selected');

            emails.each(function(email) {
                email.destroy(function(email) {
                    var index = selected.indexOf(email);
                    if (index > -1) {
                        selected.splice(index);
                    }
                });
            });
        }
    })
})(jQuery, can);