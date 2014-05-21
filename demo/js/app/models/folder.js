(function($, can) {
    can.Model.extend('Folder', {
        findAll: 'GET /api/folders'
    }, {})

    Folder.List = Folder.List.extend({
        filter: function(check) {
            var folders = [];
            this.each(function(folder) {
                if (check(folder)) {
                    folders.push(folder);
                }
            })
            return folders;
        }
    })
})(jQuery, can)