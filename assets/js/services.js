;angular.module("dda")
.service("heroes", ["$http", "$q", function($http, $q){
	var output = $q.defer();

	function reformatHeroes(heroes){
		var obj = heroes.result.heroes,
			output = {};

		for(v in obj){
			output[obj[v].id] = obj[v].name.substring(14);
		}

		return output;
	}
	
	$http({
		url: "assets/js/heroes.json",
		method: "GET"
	}).then(function(response){
		var ref = reformatHeroes(response.data);
		output.resolve(ref);
	})

	return output.promise;
}])
.service("object", ["$location", "$http", "$q", function($location, $http, $q){
	var query = {},
		a = document.createElement("a");
		a.href = $location.$$absUrl,
		queryString = a.search.substring(1).split("&");

	for(var i=0,l=queryString.length;i<l;i++){
		var qs = queryString[i].split("=");
		query[qs[0]] = qs[1];
	}

	var object = {};
		object.timestamp = +new Date();
		object.promise = (function(){
			var promise = $q.defer();

			if(query.key){
				$http.jsonp("http://api.openkeyval.org/"+ query.key +"?callback=jsonp_get_callback");
				promise.resolve();
			} else if(query.match){
				$http({
					url: "./api/get.php", method: "POST", data:{match: query.match}
				}).then(function(response){
					object.data = response.data.result;
					promise.resolve(response.data.result);
				})
			}

			return promise.promise;
		})();

	return object;
}])