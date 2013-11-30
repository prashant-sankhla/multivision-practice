angular.module('app').controller('mvSignupCtrl', function($scope, mvUser) {

  function formIsValid() {
    return $scope.signupForm.$valid;
  }

  $scope.signup = function() {
    if(formIsValid()) {
      var newUser = new mvUser({
        username: $scope.email,
        password: $scope.password,
        firstName: $scope.fname,
        lastName: $scope.lname
      });
      console.log(newUser);
    }
    console.log($scope.signupForm);

  }

});