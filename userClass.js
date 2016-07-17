//User Class for database
function User (data) {
    //this.userName = data.userName;
    this.name = data.name;
    //this.firstName = data.firstName;
    //this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    //this.date_of_birth = data.date_of_birth;
    this.education_level = data.education_level;
    this.occupation = data.occupation;
    this.skills = data.skills;
    this.location = {
      city: data.location.city,
      state: data.location.state,
      zip: data.location.zip
    //Incorporate imgur API for profile pictures
    }
}

User.prototype.checkPassword = function(password) {
    if (password == this.password){
      return true;
    }
    else {
      return false;
    }
}

module.exports = User;

/*
myFirebaseRef.set({
  firstName: "Hello World!",
  lastName: "Hello World!",
  userName: "Hello World!",
  email: "Firebase",
  password: "Firebase",
  education_level: "Firebase",
  age: "Firebase",
  occupation: "Firebase",
  skills: "Firebase",
  location: {
    city: "Hoboken",
    state: "New Jersey",
    zip: 07030
  }
});
*/
