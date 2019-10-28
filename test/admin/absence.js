const request = require("supertest")("http://127.0.0.1:8080");
const assert = require("chai").assert;
const expect = require("chai").expect;

describe('absence_admin Route', function () {
    it('should return a status 200 when get', async () => {
       const res = await request.get('/absence_admin');
       console.log(res.status);
       assert.isTrue(res.status === 200);
    });
    it('should have an error if no token when post', async () => {
        const res = await request.post('/absence_admin').send({});
        expect(res.body).to.have.property("errorToken").to.equal(true);
    });
});