angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, mvAuth) {


  $scope.signup = function() {
    var newUser = new mvUser({
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    });

    mvAuth.signupUser(newUser).then(function() {
      mvNotifier.notify('User account created!');
    }, function(reason) {
      mvNotifier.error(reason);
    });
  }

});