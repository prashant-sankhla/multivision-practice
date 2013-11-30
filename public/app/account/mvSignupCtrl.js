angular.module('app').controller('mvSignupCtrl', function($scope, mvUser) {

  function formIsValid() {
    console.log($scope.password);
    return $scope.signupForm.$valid && $scope.password === $scope.confirmpassword
  }

  $scope.signup = function() {
    if(formIsValid()) {
      var newUser = new mvUser({
        username: $scope.email,
        password: $scope.password,
        firstName: $scope.fname,
        lastName: $scope.lname
      });

      newUser.$save();
      console.log(newUser);
    }
    console.log($scope.signupForm);

  }

});