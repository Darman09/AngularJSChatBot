angular.module('todoApp', [])
.controller('TodoListController', function($scope) {
  $scope.name = "test";
  $scope.target = "En cours";
  $scope.isExist = false;
  $scope.isRequired = false;
  $scope.newName = {};
  $scope.isEditable = false;
  $scope.indexPersonne = null;
  var age = 25;

  $scope.users = [];

  $scope.test = {
    age: age
  };

  $scope.firstUser = {
    age:age,
    name:name
  };

  $scope.secondUser = {
    age:age,
    name:name
  };

  $scope.people = [
  { name: "gerard" , age: 20},
  { name: "yanis", age: 30 }
  ];

  var testName = function(array, prop) {
    for (var i = 0; i < array.length; i++) {
      var personne = array[i]
      if (personne.name === prop) {
        return true;
      }
    }
    return false;
  }

  $scope.addPerson = function() {
    var exists = testName($scope.people, $scope.newName.name);
    $scope.isExist = false;
    $scope.isRequired = false;
    if (!$scope.newName.name || !$scope.newName.age ) {
      $scope.isRequired = true;
      return
    }

    if (exists) {
      $scope.isExist = true;
      return
    }
    $scope.people.push($scope.newName);
    $scope.newName = {};
  }

  $scope.editPersonne = function(personne, index){
    $scope.indexPersonne = index;
    $scope.newName.age = personne.age;
    $scope.newName.name = personne.name;
    $scope.isEditable = true;
  }

  $scope.deletePersonne = function(personne, index){
    $scope.people.splice($scope.indexPersonne + 1, 1);
  }

  $scope.updatePersonne = function(){
   var personne = $scope.people[$scope.indexPersonne];
   personne.name = $scope.newName.name;
   personne.age = $scope.newName.age;
   $scope.people[$scope.indexPersonne] = personne;
   $scope.isEditable = false;
   $scope.newName = null;
 }

 $scope.selectOtherUser = function(personne) {
  $scope.secondUser.name = personne.name;
  $scope.secondUser.age = personne.age;
  console.log($scope.secondUser);
}

$scope.selectUser = function(personne) {
  $scope.firstUser.name = personne.name;
  $scope.firstUser.age = personne.age;
}

$scope.getMonAge = function() {
  $scope.test.age += 10;
}

$scope.resetAge = function() {
  $scope.test.age = age;
}
});


/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
