(function($, can) {
    can.Control.extend('EmailList', {
        init: function(el, options) {
            this.update();
        },
        "{emails} change": 'update',
        update: function() {
            var emails = can.isFunction(this.options.emails) ? this.options.emails() : this.options.emails,
                self = this;


            if (can.isDeferred(emails)) {
                emails.then(function(items) {
                    self.draw(items)
                });
            } else {
                this.draw(emails);
            }
        },
        draw: function(emails) {
            var self = this,
                el = this.element,
                data = $.extend({}, this.options, {
                    emails: emails
                });
            el.html(can.view('js/app/templates/email/emails.mustache', data, {
                isSelected: function(options) {
                    var selected = self.options.state.attr('selected');
                    if (selected.indexOf(options.context) >= 0) {
                        return options.fn();
                    } else {
                        return options.inverse();
                    }
                },
                format: function(text) {
                    if (can.isFunction(text)) {
                        text = text();
                    }
                    return text.length > 70 ? text.slice(0, 70) + '...' : text;
                }

            }));
        },
        'tr click': function(el, ev) {
            var email = el.closest('tr').data('email');
            this.options.state.toogle(email);
        }


    })
})(jQuery, can)