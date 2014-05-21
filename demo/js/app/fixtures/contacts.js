can.fixture({
    "GET /api/contacts": function() {
        return [{
            "id": "contact_342",
            "firstName": "Michael",
            "lastName": "Smith",
            "email": "ms@proxyweb.com"
        }, {
            "id": "contact_377",
            "firstName": "Mary",
            "lastName": "Jones",
            "email": "mary@jones.net"
        }, {
            "id": "contact_398",
            "firstName": "Billy",
            "lastName": "Idiot",
            "email": "william_idiot@gmail.com"
        }]
    }
});