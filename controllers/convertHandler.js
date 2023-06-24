function ConvertHandler(input) {
  
  this.getNum = function(input) {
    let re = new RegExp(/[a-z]+/i);
    let index = input.search(re);
    let initNum = (index > 0) 
      ? input.slice(0, index)
      : 1 ;

    if(initNum.toString().includes('/')){
      values = initNum.toString().split('/');
      if(values.length > 2){
        initNum = 'invalid number';
        return initNum;
      }
      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      initNum = values[0] / values[1];
      return initNum;
    }
    
    return parseFloat(initNum);
  };
  
  this.getUnit = function(input) {
    let re = new RegExp(/[a-z]+/i);
    let index = input.search(re);
    let initUnit = input.slice(index);
    
    let units = ['gal', 'GAL', 'l', 'L', 'mi', 'MI', 'km', 'KM', 'lbs', 'LBS', 'kg', 'KG'];
    
    if(!units.includes(initUnit)){
      return 'invalid unit';
    }
    if(initUnit.toUpperCase() == 'L'){ return 'L'; };
    
    return initUnit.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let returnUnit;
    
    switch (initUnit.toLowerCase()){
      case 'l':
        returnUnit = 'gal';
        break;
      case 'gal':
        returnUnit = 'L';
        break;
      case 'lbs':
        returnUnit = 'kg';
        break;
      case 'kg':
        returnUnit = 'lbs';
        break;
      case 'mi': 
        returnUnit = 'km';
        break;
      case 'km':
        returnUnit = 'mi';
        break;
      default:
        returnUnit = 'invalid unit'
    }

    return returnUnit;
  };

  this.spellOutUnit = function(unit) {
    let spelledUnit;
    
    switch(unit.toLowerCase()) {
      case 'gal':
        spelledUnit = 'gallons';
        break;
      case 'l':
        spelledUnit = 'liters';
        break;
      case 'lbs':
        spelledUnit = 'pounds';
        break;
      case 'kg':
        spelledUnit = 'kilograms';
        break;
      case 'mi':
        spelledUnit = 'miles';
        break;
      case 'km':
        spelledUnit = 'kilometers';
        break;
      default:
        spelledUnit = 'invalid unit'
    }
    return spelledUnit
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let returnNum;

    switch(initUnit.toLowerCase()) {
      case 'gal':
        returnNum = initNum * galToL;
        break;
      case 'l':
        returnNum = initNum / galToL;
        break;
      case 'lbs':
        returnNum = initNum * lbsToKg;
        break;
      case 'kg':
        returnNum = initNum / lbsToKg;
        break;
      case 'mi':
        returnNum = initNum * miToKm;
        break;
      case 'km':
        returnNum = initNum / miToKm;
        break;
      default:
        returnNum = "invalid number"
    }
    return Math.round(returnNum * 100000) / 100000
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let string = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    
    return string;
  };
  
}

module.exports = ConvertHandler;