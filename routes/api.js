'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
app.route('/api/convert').get((req, res) => {

  let initNum = convertHandler.getNum(req.query.input);
  let initUnit = convertHandler.getUnit(req.query.input);
  let returnNum = convertHandler.convert(initNum, initUnit);
  let returnUnit = convertHandler.getReturnUnit(initUnit);
  let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

  let resObj = {};
  resObj['initNum'] = initNum;
  resObj['initUnit'] = initUnit;
  resObj['returnNum'] = returnNum;
  resObj['returnUnit'] = returnUnit;
  resObj['string'] = string;

  if(initNum == 'invalid number' && initUnit == 'invalid unit') {
    res.json('invalid number and unit');
  }else if(initNum == 'invalid number'){
    res.json('invalid number');
  }else if(initUnit == 'invalid unit'){
    res.json('invalid unit');
  } else {
    res.json(resObj)
  }
})
};
