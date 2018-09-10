import supertest from 'supertest';
import { expect } from 'chai';
import app from '../src/index';
import { db } from '../src/db'

const request = supertest(app);

describe('Contact Controller', () => {
  before(done => {
    db.dropDatabase()
      .then(() => {
        done();
      });
  });

  it('Should persist a new contact information', (done) => {
    request
      .post('/api/')
      .send({
        name: 'femi abolaji',
        phone: '07064356136',
        email: 'femi.systems@gmail.com'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.be.an('object');
        expect(Object.keys(res.body.data)).to.have.length.greaterThan(5);
        expect(res.body.data.name).to.equal('femi abolaji');
        done();
      });
  });

  it('Should persist a new contact information', (done) => {
    request
      .get('/api/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});