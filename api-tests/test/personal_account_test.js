var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://ecse00100f48.epam.com');

describe('New client logon', function () {

    /* phone length verification */
     it('should return a 400 response', function (done) {
        api.post('/api/rest/clients/auth/sendSMS')
            .set('Accept', 'application/json')
            .send({
                phone: 123,
                template: 1
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.have.property("businessResult");
                expect(res.body.error.code).to.equal(400);
                expect(res.body.error.message).to.equal("Неверный номер телефона");
                done();
            });
    });
 
    it('should return a 200 response', function (done) {
        api.post('/api/rest/clients/auth/sendSMS')
            .set('Accept', 'application/json')
            .send({
                phone: 79991234567,
                template: 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("businessResult");
                expect(res.body.businessResult).to.equal('success');
                done();
            });
    });

    /*sending sms-code */
    it('should return a 200 response', function (done) {
        api.get('/api/rest/clients/auth/checkSMS?otp=565656')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("businessResult");
                expect(res.body.businessResult).to.equal('success');
                done();
            });
    });
});