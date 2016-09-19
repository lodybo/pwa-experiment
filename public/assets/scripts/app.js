// Service Worker
// Register the service worker if available.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceworker.js').then(function(reg) {
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
}


// The Angular App
angular.module("pwa-experimentApp", []).controller("pwa-experimentCtrl", function ($scope, $http) {
	$scope.tasks = [];
	$scope.newTask = "";
	
	$scope.getTasks = function () {
		console.log("[App] Getting tasks from server...");
		$http.get("/tasks").then(function (response) {
			console.log("[App] Succeeded getting tasks from server.");
			console.log("[App] Response is: ", response);
			$scope.tasks = response.data;
		}, function (error) {
			console.log("[App] Error getting tasks: ", error);
		});
	};
	$scope.getTasks();
	
	$scope.addNewTask = function() {
		// If there is a new task, then let's add it!
		if (!$scope.newTask) {
			return;
		}
		
		$http.post("/tasks?task=" + encodeURIComponent($scope.newTask)).then(function (response) {
			console.log("Successfully added a new task, reloading..");
			$scope.newTask = "";
			$scope.getTasks();
		}, function (error) {
			console.log("An error has occured when adding a new task.");
			console.log(error);
		});
	};
	
	$scope.deleteTask = function (task) {
		if (!task) {
			return;
		}
		
		$http.delete("/tasks?task=" + encodeURIComponent(task)).then(function (response) {
			console.log("Successfully deleted a task, reloading..");
			$scope.getTasks();
		}, function (error) {
			console.log("An error has occured when deleting a task.");
			console.log(error);
		});
	};
});