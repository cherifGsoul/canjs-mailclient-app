(function($, can) {
    can.Control.extend('Navigation', {
        init: function(el, options) {
            this.state = options.state;
            var self = this;
            el.html(can.view('js/app/templates/email/navigation', {
                folders: options.folders
            }, {
                isActive: function(options) {
                    var state = self.options.state;
                    if (state.attr('folder') == options.context.id) {
                        return options.fn();
                    } else {
                        return options.inverse();
                    }
                }
            }));
        },
        '.folder-item click': function(el, ev) {
            this.options.state.attr('folder', el.prop('id'));
        }
    })
})(jQuery, can);