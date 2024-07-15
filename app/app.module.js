var myApp = angular
  .module("myModule", [])
  .controller("MainController", function ($scope) {
    $scope.employees = [];
    $scope.employee = {};
    $scope.editing = false;
    $scope.formVisible = true;

    $scope.showForm = function() {
        $scope.formVisible = true;
        $scope.editing = false;
        $scope.employee = {};
    }

    $scope.submitForm = function() {
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
    };

    $scope.editEmployee = function(employee) {
        $scope.employee = angular.copy(employee); 
        $scope.editing = true;
        $scope.formVisible = true;
    };

    $scope.deleteEmployee = function(employee) {
        var index = findEmployeeIndex(employee.id);
        if (index !== -1) {
            $scope.employees.splice(index, 1);
        }
    };

    $scope.cancelForm = function() {
        $scope.employee = {};
        $scope.editing = false;
        $scope.formVisible = true;
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


