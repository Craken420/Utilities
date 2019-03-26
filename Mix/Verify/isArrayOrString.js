module.exports.isStringOrArray = (param) => {
		if (Array.isArray(param) == true) {
			return 'Array'
		}
		else if (typeof param == 'string') {
			return 'String'
		} else {
			console.log(`Invalid Param: ${typeof(param)}`)
			return 'Other'
		}
}
