const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
   test('1. Convert a valid input such as 10L', function(done){
     chai
       .request(server)
      .get('/api/convert')
      .query({
        'input': '10L'
      })
     .end(function(err, res) {
       assert.equal(res.status, 200);
       assert.equal(res.type, 'application/json');
       assert.equal(res.body.initNum, 10);
       assert.equal(res.body.initUnit, 'L');
       done()
     });
   });
  
  test('2. Convert an invalid input unit such as 32g', function(done){
    chai
    .request(server)
    .get('/api/convert')
    .query({
      'input': '32g'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.type, 'application/json');
      assert.equal(res.body, 'invalid unit');
      done()
    });
  });
  
  test('3. Convert an invalid number such as 3/7.2/4kg', function(done){
    chai
    .request(server)
    .get('/api/convert')
    .query({
      "input": '3/7.2/4kg'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.type, 'application/json');
      assert.equal(res.body, 'invalid number');
       done()
    })
  });
  
  test('4. Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done){
      chai
    .request(server)
    .get('/api/convert')
    .query({
      'input': '3/7.2/4kilomegagram'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.type, 'application/json');
      assert.equal(res.body, 'invalid number and unit');
      done()
    })
  });
  
  test('5. Convert with no number such as kg', function(done){
    chai
    .request(server)
    .get('/api/convert')
    .query({
      'input': 'kg'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.type, 'application/json');
      assert.equal(res.body.initNum, 1);
      assert.equal(res.body.initUnit, 'kg');
      done()
    })
  });
});
