const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateImageType(imgPath) {
    let errors = {};
    imgPath = !isEmpty(imgPath) ? imgPath : '';

	let img_types = ['.JPG','.JPEG','.GIF','.TIF','.PNG'];
    if(Validator.isEmpty(imgPath)) {
        errors.image = 'Field Empty';
    }
    var includes = false
	for (str in img_types){
		var previous = includes
		//console.log(imgPath.substring(imgPath.length - 5, imgPath.length).toUpperCase().includes(img_types[str]));
		includes = previous || (imgPath
		.substring(imgPath.length - 5, imgPath.length)
		.toUpperCase()
		.includes(img_types[str]))

		}
	if (!includes){
		errors.image = "This is not an image file. Please include a image file";
   	}

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

