;angular.module("dda")
.directive('autoGrow', function() {
	return {
		restrict: "A",
		require: "?ngModel",
		link: function post(scope,element,attrs,ngModel){
			var minHeight = element[0].offsetHeight,
				paddingLeft = element.css('paddingLeft'),
				paddingRight = element.css('paddingRight');
	 
			var $shadow = angular.element('<div></div>').css({
				position: 'absolute',
				top: -10000,
				left: -10000,
				width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
				fontSize: element.css('fontSize'),
				fontFamily: element.css('fontFamily'),
				lineHeight: element.css('lineHeight'),
				resize:     'none'
			});
			angular.element(document.body).append($shadow);
	 
			var update = function(v) {
				var value = v || element.val();

				var times = function(string, number) {
					for (var i = 0, r = ''; i < number; i++) {
						r += string;
					}
					return r;
				}
	 
				var val = value.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/&/g, '&amp;')
					.replace(/\n$/, '<br/>&nbsp;')
					.replace(/\n/g, '<br/>')
					.replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
				$shadow.html(val);
	 
				element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */, minHeight) + 'px');
			}
	 
			element.bind('keyup keydown keypress change', function(){ update(); });

			// call it
			ngModel.$formatters.push(function(value){
				update(value);
				return value;
			});
		}
	}
})
.directive("loader", function(){
	return {
		restrict: "A",
		link: function post(scope,ele,attrs){
			var timer = setInterval(function(){
				if(document.readyState = "complete"){
					clearInterval(timer);
					ele.addClass("hide");
				}
			}, 500);
		}
	}
})
.directive("picksBans", function(){
	return {
		restrict: "A",
		controller: ["$scope", "$http", "object", "heroes", function($scope, $http, object, heroes){
			object.promise.then(function(data){
				$scope.data = data;
			})

			$scope.assets = {
				heroes: heroes
			}

			$scope.save = function(){
				$scope.saving = true;

				var key = makeOKVKey(),
					val = angular.copy($scope.data);

				$http({
					url: "./api/post.php",
					method: "POST",
					data: {key: key, val: JSON.stringify(val)}
				}).then(function(response){
					history.replaceState("", {}, "?key=" + response.data.read_only_key);
					$scope.saving = false;
					$scope.showSaveMsg = true;
				})
			}
		}]
	}
})