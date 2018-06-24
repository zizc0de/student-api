const expressValidator = require('express-validator');
const moment = require('moment');
const validator = require('validator');
const util = require('util');

let custom = expressValidator({
	customValidators: {
		isValidDatetimeArray:function(values){
			if(util.isArray(values)){
				return values.every(val=>{
					return moment(val, "YYYY-MM-DD hh:mm").isValid();
				});
			}

			return moment(values, "YYYY-MM-DD hh:mm").isValid();
		},
		isIntArray:function(values){
			if(values == undefined){
				return false;
			}
			if(util.isArray(values)){
				return values.every(val=>{
					return validator.isInt(val);
				});
			}

			return validator.isInt(values);
		},
	}
});

module.exports = custom;