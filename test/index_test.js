"use strict";

var chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    res,
    time;

chai.use(chaihttp);

describe('time server', function () {
    before(function (done) {
        chai.request('localhost:3000')
            .get('/time')
            .send()
            .end(function (err, response) {
                time = Date.now();
                res = response;
                done();
            });
    });
    it('should return the time (within a second)', function () {
        var servertime = Date.parse(res.text);
        var difference = time - servertime;
        expect(difference).to.be.lessThan(1000);
    });
});
describe('get route', function () {
    before(function (done) {
        chai.request('localhost:3000')
            .get('/greet/Greg')
            .send()
            .end(function (err, response) {
                res = response;
                done();
            });
    });
    it('should return a greeting string from GET', function () {
        var expected = 'It is dark out, Greg. ' +
            'You are likely to be eaten by a grue!';
        expect(res.text).to.be.equal(expected);
    });
});
describe('post route', function () {
    before(function (done) {
        chai.request('localhost:3000')
            .post('/greet')
            .send({name: 'Greg'})
            .end(function (err, response) {
                res = response;
                done();
            });
    });
    it('should return a greeting string from POST', function () {
        var expected = 'Who do you think I am, Greg? ' +
            'The postman???!?!?!?11oneoneone';
        expect(res.text).to.be.equal(expected);
    });
});
