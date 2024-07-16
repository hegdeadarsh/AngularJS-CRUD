// app/service/angularJSService.js
angular.module("myModule")
.service("EmployeeService", function() {
  var employees = [];

  this.getEmployees = function() {
    return employees;
  };

  this.addEmployee = function(employee) {
    employees.push(employee);
  };

  this.updateEmployee = function(index, employee) {
    employees[index] = employee;
  };

  this.deleteEmployee = function(index) {
    employees.splice(index, 1);
  };

  this.findEmployeeIndex = function(id) {
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        return i;
      }
    }
    return -1;
  };

  this.generateId = function() {
    return employees.length + 1;
  };
});
