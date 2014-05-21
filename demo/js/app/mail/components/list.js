(function($, can) {
    can.Component.extend({
        tag: 'list',
        template: can.view('js/app/templates/email/emails'),
        scope: {
            emails: [],
            emptyMessage: 'Empty emails list'
        },
        events: {

        },
        helpers: {
            format: function(text) {
                if (can.isFunction(text)) {
                    text = text();
                }
                return text.length > 70 ? text.slice(0, 70) + '...' : text;
            }
        }

    })
})(jQuery, can)