//We need to link firebase and our program together so user information is saved and ready to be recalled when neccessary
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
const auth = firebase.auth() // Authentication service initialised
const database = firebase.database() // Realtime Database service initialised


// Set up our login function
function loginU () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid')
    return
  }


  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
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
  