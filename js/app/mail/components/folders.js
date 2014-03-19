(function($, can) {
    can.Component.extend({
        tag: 'folders',
        scope: {
            folders: new Folder.List({})
        },
        events: {},
        helpers: {
            icon: function(options) {
                var id = options.context.attr('id');
                if (id == 'inbox' || id == 'sent') {
                    return 'icon-folder-close';
                }

                if (id == 'later') {
                    return 'icon-share-alt';
                }

                if (id == 'trash') {
                    return 'icon-trash';
                }
            }
        }
    })
})(jQuery, can)