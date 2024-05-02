var modal = document.getElementById("create-list-modal");
var btn = document.getElementById("create-list-btn");
var close_btn = document.getElementsByClassName("close")[0];

// open modal by clicking button
btn.onclick = function() {
  modal.style.display = "block";
}

// close modal with button or clicking outside of modal
close_btn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}