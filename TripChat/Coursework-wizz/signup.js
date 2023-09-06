var firebaseConfig = {
  apiKey: "AIzaSyAEZPr0IXy-ShzCaGGfmG8W6yHBuUj6lQg",
  authDomain: "coursework-f1a2d.firebaseapp.com",
  projectId: "coursework-f1a2d",
  storageBucket: "coursework-f1a2d.appspot.com",
  messagingSenderId: "255130409141",
  appId: "1:255130409141:web:33c136f2011ae70a2706fc",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

function registerU() {
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  full_name = document.getElementById('full_name').value;
  PreUsername = document.getElementById('PreUsername').value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password not filled correctly');
    return;
  }
  if (validate_field(full_name) == false) {
    alert('Full name not filled.');
    return;
  }
  if (validate_field(PreUsername) == false) {
    alert('Username not filled.');
    return;
  }

  checkUsernameAvailability(PreUsername)
    .then(function(isAvailable) {
      if (!isAvailable) {
        alert('Username is already taken.');
        return;
      }

      auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
          var user = auth.currentUser;
          var database_ref = database.ref();
          var user_data = {
            email: email,
            full_name: full_name,
            PreUsername: PreUsername,
            last_login: Date.now(),
            banCount: 0,
          };

          database_ref.child('usernames/' + PreUsername).set(user.uid);
          database_ref.child('users/' + user.uid).set(user_data);

          alert('User Created!!');
        })
        .catch(function(error) {
          var error_code = error.code;
          var error_message = error.message;

          alert(error_message);
        });
    });
}

function checkUsernameAvailability(username) {
  return database.ref('usernames/' + username).once('value')
    .then(function(snapshot) {
      return !snapshot.exists();
    });
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}