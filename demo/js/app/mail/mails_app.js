can.Control.extend('EmailsApp', {
    init: function() {
        this.element.html(can.view('js/app/templates/email/mails', {}))
    }
})