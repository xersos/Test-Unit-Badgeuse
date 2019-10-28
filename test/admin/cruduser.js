const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;

describe('CrudUser Route Test', function () {
    describe('GET', function () {
        it('should return all users', async () => {
            const res = await request.get('/cruduser');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf.at.least(1);
        });
    });
    describe('POST User', function () {
        var token = '';
        before(async () => {
            token = await request
                .post('/login')
                .send({
                    "action": "tryConnect",
                    "userMail": "daniel.da-fonseca@uha.fr",
                    "password": "uha"
                });
            token = token['body'].token;
        });
        it('should display an no authorization when the token is not set', async () => {
            const res = await request
                .post('/cruduser')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Utilisateur non autorisé");
        });
        it('should add a user, allowed only for an administrator', async () => {
            const res = await request
                .post('/cruduser')
                .send({
                    "token": token,
                    "user": {
                        "prenom_user": "dam",
                        "nom_user": "elio",
                        "mail_user": "dam.elio@uha.fr",
                        "id_role": 1
                    }
                });
            expect(res.body).to.have.property("message").to.equal("Success");
        });
    });

    describe('PUT', function () {
        var token = '';
        before(async () => {
            token = await request
                .post('/login')
                .send({
                    "action": "tryConnect",
                    "userMail": "daniel.da-fonseca@uha.fr",
                    "password": "uha"
                });
            token = token['body'].token;
        });
        it('should display an error when there is no token', async () => {
            const res = await request
                .put('/cruduser')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Utilisateur non autorisé");
        });

        it('should edit a user, allowed only for an administrator', async () => {
            const res = await request
                .post('/cruduser')
                .send({
                    "token": token,
                    "user": {
                        "prenom_user": "dam",
                        "nom_user": "elio",
                        "mail_user": "dam.elio@uha.fr",
                        "id_role": 1,
                        "card": "55555555"
                    }
                });
            expect(res.body).to.have.property("message").to.equal("Success");
        });
    });
});