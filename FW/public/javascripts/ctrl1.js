angular.module('myApp', []).controller('myCtrl',['$scope', function($scope){
	$scope.list = [
		{_id: '1', username: 'TOTO', password:'TOTO1'},
		{_id: '2', username: 'TITI', password:'TITI1'},
		{_id: '3', username: 'TATA', password:'TATA1'}
	];
}]);
