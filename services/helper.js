var clone = require('clone');

var responseObjSkeleton =  {
	status : "success",
	message :  "",
	totalItems  : 0,
	start : 0,
	end : 0,
	items : []
};
var formatResponse = function(_isSuccess, _messageString, _items, _totalItems, _start, _end) {
	var toRet = clone(responseObjSkeleton);
	
	if(typeof(_isSuccess) === "boolean") {
		if(!_isSuccess) {
			toRet.status = "failure";
		}
		
		if(typeof(_messageString) === "string") {
			toRet.message = _messageString;
			
			if(typeof(_items) === "object") {
				if(Array.isArray(_items)) {
					toRet.items = _items;
					if(typeof(_totalItems) === "number" && _totalItems >= _items.length) {
						toRet.totalItems = _totalItems;
					} else {
						toRet.totalItems = _items.length;
					}
					if(typeof(_start) === "number") {
						toRet.start = _start;
					} else {
						toRet.start = 0;
					}
					if(typeof(_end) === "number") {
						toRet.end = _end;
					} else {
						toRet.end = ((_items.length > 0)? ((toRet.start + _items.length)-1) : 0);
					}
				} else {
					toRet.items[0] = _items;
					toRet.totalItems = 1;
					toRet.start = 0;
					toRet.end = 0;
				}
			} else if(typeof(_items) === "string") {
				var asObject = null;
				try {
					asObject = JSON.parse(_items);
				} catch(e) {
				}
				
				if(asObject && typeof(asObject) === "object") {
					if(Array.isArray(asObject)) {
						toRet.items = asObject;
						if(typeof(_totalItems) === "number") {
							toRet.totalItems = _totalItems;
						} else {
							toRet.totalItems = asObject.length;
						}
						if(typeof(_start) === "number") {
							toRet.start = _start;
						} else {
							toRet.start = 0;
						}
						if(typeof(_end) === "number") {
							toRet.end = _end;
						} else {
							toRet.end = (toRet.start + asObject.length)-1;
							toRet.end = ((asObject.length > 0)? ((toRet.start + asObject.length)-1) : 0);
						}
					} else {
						toRet.items[0] = asObject;
						toRet.totalItems = 1;
						toRet.start = 0;
						toRet.end = 0;
					}
				} else {
					toRet.items[0] = _items;
					toRet.totalItems = 1;
					toRet.start = 0;
					toRet.end = 0;
				}
			}
		} else if(typeof(_messageString) === "object" || typeof(_messageString) === "number") {
			if(Array.isArray(_messageString)) {
				toRet.items = _messageString;
				toRet.totalItems = _messageString.length;
				toRet.start = 0;
				if(_messageString.length > 0) {
					toRet.end = _messageString.length-1;
				} else {
					toRet.end = 0;
				}
			} else {
				toRet.items[0] = _messageString;
				toRet.totalItems = 1;
				toRet.start = 0;
				toRet.end = 0;
			}
		}
	} else if (typeof(_isSuccess) === "string") {
		var asObject = null;
		try {
			asObject = JSON.parse(_isSuccess);
		} catch(e) {
		}
		if(asObject) {
			toRet.items[0] = asObject;
			toRet.totalItems = 1;
			toRet.start = 0;
			toRet.end = 0;
		} else {
			toRet.message = _isSuccess;
		}
	} else if (typeof(_isSuccess) === "object") {
		toRet.items[0] = _isSuccess;
		toRet.totalItems = 1;
		toRet.start = 0;
		toRet.end = 0;
	} else if (typeof(_isSuccess) === "number") {
		toRet.items[0] = _isSuccess;
		toRet.totalItems = 1;
		toRet.start = 0;
		toRet.end = 0;
	} else if (typeof(_isSuccess) === "undefined") {
	} else {
		toRet.message = _isSuccess;
	}
	
	return toRet;
};

module.exports.formatResponse = formatResponse;