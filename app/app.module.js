var myApp = angular
  .module("myModule", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "form.html",
        controller: "MainController",
      })
      .otherwise({
        redirectTo: "/",
      });
 })
  .controller("MainController", function ($scope, $location) {
    $scope.employees = [];
    $scope.employee = {};
    $scope.editing = false;
    $scope.formVisible = false;
    $scope.formView = true;
    $scope.tableView = false;

    $scope.showForm = function () {
      $scope.formVisible = true;
      $scope.formView = true;
      $scope.editing = false;
      $scope.tableView = false;
      $scope.employee = {};
    };

    $scope.submitForm = function () {
      $scope.formSubmitted = true;
      if (!$scope.employee.gender) {
        return;
      }

      if ($scope.editing) {
        var index = findEmployeeIndex($scope.employee.id);
        if (index !== -1) {
          $scope.employees[index] = angular.copy($scope.employee);
          $scope.cancelForm();
         
        }
      } else {
        $scope.employee.id = generateId();
        $scope.employees.push(angular.copy($scope.employee));
        $scope.cancelForm();
        
      }
      $scope.tableView = true;
      $scope.formView = false;
      console.log($scope.employees);
    };



    $scope.editEmployee = function (employee) {
      $scope.employee = angular.copy(employee);
      $scope.editing = true;
      $scope.formVisible = true;
      $scope.formView = true;
      $scope.tableView = false;
      $location.path("/");
    };

    $scope.deleteEmployee = function (employee) {
      var index = findEmployeeIndex(employee.id);
      if (index !== -1) {
        $scope.employees.splice(index, 1);
      }
    };

    $scope.cancelForm = function () {
      $scope.employee = {};
      $scope.editing = false;
      $scope.formVisible = true;
      $scope.formView = true;
    };

    function generateId() {
      return $scope.employees.length + 1;
    }

    function findEmployeeIndex(id) {
      for (var i = 0; i < $scope.employees.length; i++) {
        if ($scope.employees[i].id === id) {
          return i;
        }
      }
      return -1;
    }
  });
