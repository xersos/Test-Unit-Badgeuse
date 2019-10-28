const expect = require("chai").expect;
require('../../src/server/config/database');

describe('Database Pool Testing', function () {
    it('should connect correctly to MariaDB', function () {
        db.getConnection(function (err, connection) {
            expect(err).to.be.null;
        })
    });
    it('should allow the usage of query inside MariaDB', function () {
        db.query("SELECT id_role\n" +
            "FROM `roles`\n" +
            "WHERE nom_role = 'Etudiant'", (err, results, fields) => {
            expect(results[0].id_role).to.equal(1)
        })
    });
});