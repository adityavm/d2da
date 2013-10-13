function makeOKVKey(){
	var time = (new Date()).getTime();
	return time + "-d2da";
}

function jsonp_get_callback(val,key){
	var scope = angular.element( document.body ).scope();
	scope.data = JSON.parse(val);
	scope.$apply();
}