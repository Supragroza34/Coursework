let captcha;

function generate() {
  // Clear old input
  document.getElementById("submit").value = "";

  // Access the element to store the generated CAPTCHA
  captcha = document.getElementById("image");
  let uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate CAPTCHA of length 5 with random characters
  for (let i = 1; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }

  // Store the generated CAPTCHA
  captcha.innerHTML = uniquechar;
}

function printmsg() {
  const usr_input = document.getElementById("submit").value;

  // Check whether the input is equal to the generated CAPTCHA or not
  if (usr_input == captcha.innerHTML) {
    // CAPTCHA matched
    document.getElementById("key").innerHTML = "Matched";

    // Redirect to another page within the same website
    window.location.href = "index.html"; // Replace with the desired page URL
  } else {
    // CAPTCHA not matched
    document.getElementById("key").innerHTML = "Not matched";
    generate();
  }
}
