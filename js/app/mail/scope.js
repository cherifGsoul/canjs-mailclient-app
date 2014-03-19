(function($, can) {
    can.Map.extend('Scope', {
        folder: 'inbox',
        emails: new Email.List({}),
        folders: new Folder.List({}),
        selected: [],
        setFolder: function(newFolder, success, error) {
            this.attr('selected', []);
            return newFolder ? newFolder : 'inbox';
        },

        displayedEmails: function() {
            var folder = this.attr('folder');
            return this.attr('emails').filterByFolder(folder);
        },

        toogle: function(item) {
            var selected = this.attr('selected'),
                index = selected.indexOf(item);

            if (index >= 0) {
                selected.splice(index, 1);
            } else {
                selected.push(item);
            }
        },
        countByFolder: function(folder) {
            return this.attr('emails').filterByFolder(folder.attr('id')).length;
        }
    })
})(jQuery, can)