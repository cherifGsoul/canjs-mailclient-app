(function($, can) {
    can.fixture.delay = 1000;
    can.route(':app', {
        app: 'mail',
        folder: 'inbox'
    });
    can.route(':app/:folder', {
        app: 'mail',
        folder: 'inbox'
    });


    new EmailsApp('#app')
    can.route.ready();
})(jQuery, can);