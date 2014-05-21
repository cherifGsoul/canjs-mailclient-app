(function($, can) {
    can.Model.extend('Email', {
        findAll: 'GET /api/emails',
        destroy: 'DELETE /api/emails/{id}',
        findOne: 'GET /api/emails/{id}'

    }, {});


    Email.List = Email.List.extend({
        filter: function(check) {
            var list = [];
            this.each(function(email) {
                if (check(email)) {
                    list.push(email);
                }
            })
            return list;
        },

        filterByFolder: function(folder) {
            return this.filter(function(email) {
                return (email.attr('folders').indexOf(folder) > -1);
            })
        }
    });
})(jQuery, can)