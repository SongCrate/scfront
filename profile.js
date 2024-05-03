var modal = document.getElementById("create-list-modal");
var btn = document.getElementById("create-list-btn");
var close_btn = document.getElementById("create-list-modal-close");
var cancel_btn = document.getElementById("create-list-modal-cancel-btn");

var name_input = document.getElementById("list-name-input");
var description_input = document.getElementById("list-desc-textarea");

// open modal by clicking button
btn.onclick = function() {
  modal.style.display = "block";
}

// close modal with close/cancel buttons or clicking outside of modal
close_btn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// also clear input values if cancelled
cancel_btn.onclick = function() {
  modal.style.display = "none";
  name_input.value = null;
  description_input.value = null;
}