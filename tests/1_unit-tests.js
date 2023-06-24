const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
   test('1. Whole Number Input', function(){
    let input = '2mi';
    let expected = 2;

    assert.equal(convertHandler.getNum(input), expected);
  });

  test('2. Decimal Number Input', function(){
    let input = '2.5kg';
    let expected = 2.5;

    assert.equal(convertHandler.getNum(input), expected);
  });

  test('3. Fractional Input', function(){
    assert.equal(convertHandler.getNum('4/2l'), 2);
  });

  test('4. Fractional Input With a Decimal', function(){
    assert.equal(convertHandler.getNum('5/0.5km'), 10);
    assert.equal(convertHandler.getNum('6.6/2mi'), 3.3);
  });

  test('5. Error on Double Fraction', function(){
    assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
  });

  test('6. No Numerical Input', function(){
    assert.equal(convertHandler.getNum('gal'), 1);
  });

    test('7. Correctly Read Each Valid Input Unit', function(){
    let input = ['gal', 'GAL', 'l', 'L', 'mi', 'MI', 'km', 'KM', 'lbs', 'LBS', 'kg', 'KG'];
    let expected = ['gal', 'gal','L','L', 'mi','mi', 'km','km', 'lbs','lbs', 'kg','kg'];

    input.forEach((ele, i) => {
      assert.equal(convertHandler.getUnit(ele), expected[i])
    });
  });

  test('8. Error on Invalid Input Unit', function(){
    assert.equal(convertHandler.getUnit('25g'), 'invalid unit');
  });
  

  
    test('9. Return Correct Unit for Each Unit', function(){
    let input = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    let expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

    input.forEach((ele, i) => {
      assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
    });
  });

  
    test('10. Return Spelled-Out String', function(){
      let input = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      let expected = ['liters', 'gallons', 'kilometers', 'miles', 'kilograms', 'pounds'];

      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
      });
    });
                 
    test('11. Convert gal to L', function(){
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
    });

    test('12. Convert L to gal', function(){
      assert.approximately(convertHandler.convert(3.78541, 'L'), 1, 0.1);
    });

    test('13. Convert lbs to kg', function(){
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
    });

    test('14. Convert kg to lbs', function(){
      assert.approximately(convertHandler.convert(0.453592, 'kg'), 1, 0.1);
    });

    test('15. Convert mi to km', function(){
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
    });

    test('16. Convert km to mi', function(){
      assert.approximately(convertHandler.convert(1.60934, 'km'), 1, 0.1)
    });
});