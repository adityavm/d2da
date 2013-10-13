function makeOKVKey(obj){
	var object = angular.copy(obj),
		time = obj.timestamp;

	return time + "-d2da";
}

function jsonp_get_callback(val,key){
	var scope = angular.element( document.body ).scope();
	scope.match = JSON.parse(val).data;
	scope.object = JSON.parse(val);
	scope.$apply();
}