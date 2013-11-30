var mongoose = require('mongoose');



var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  salt: String,
  hashed_pwd: String,
  roles: [String]
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  }
}

userSchema.statics = {
  signupNewUser: function(userData) {
    if(isValid(userData)) {
      User.create(userData);
      console.log('user created');
    } else {
      console.log('user not created');
    }
  }
};

var User = mongoose.model('User', userSchema);



function isValid(userData) {
  return userData.firstName.length > 0 &&
      userData.lastName.length > 0 &&
      userData.username.length > 0 &&
      isValidEmail(userData.email) &&
      userData.password.length > 2
}

function isValidEmail(email) {
  return true;
}

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'joe');
      User.create({firstName:'Joe',lastName:'Eames',username:'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = createSalt();
      hash = hashPwd(salt, 'john');
      User.create({firstName:'John',lastName:'Papa',username:'john', salt: salt, hashed_pwd: hash, roles: []});
      salt = createSalt();
      hash = hashPwd(salt, 'dan');
      User.create({firstName:'Dan',lastName:'Wahlin',username:'dan', salt: salt, hashed_pwd: hash});
    }
  });
};

exports.createDefaultUsers = createDefaultUsers;
exports.User = User;