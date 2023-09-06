var firebaseConfig = {
  apiKey: "AIzaSyAEZPr0IXy-ShzCaGGfmG8W6yHBuUj6lQg",
  authDomain: "coursework-f1a2d.firebaseapp.com",
  projectId: "coursework-f1a2d",
  storageBucket: "coursework-f1a2d.appspot.com",
  messagingSenderId: "255130409141",
  appId: "1:255130409141:web:33c136f2011ae70a2706fc",
};
// Initialise Firebase
firebase.initializeApp(firebaseConfig);

// Initialise variables
const auth = firebase.auth(); // Authentication service initialised
const database = firebase.database(); // Realtime Database service initialised

// Set up our login function
function loginU() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Fetch user data from Firebase Database
      var userRef = database.ref('users/' + user.uid);
      userRef.once('value').then(function (snapshot) {
        var userData = snapshot.val();
        if (userData && userData.PreUsername) {
          //store username in 
          var username = userData.PreUsername;
          //shift data in username variable to local storage
          localStorage.setItem('name', username);
          window.username = username;

          alert('User Logged In! Username: ' + username);
          window.location.href = "index.html";
        } else {
          alert('Username not found for this user.');
        }
      });
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
