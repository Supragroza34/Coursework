function changeButtonColor() {
  var colorInput = document.getElementById("colorInput").value;

  var buttons = document.getElementsByClassName("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = colorInput;
  }
}
