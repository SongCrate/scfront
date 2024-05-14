var modal = document.getElementById("create-list-modal");
var account_modal = document.getElementById("account-modal");
var update_modal = document.getElementById("update-modal");
var follower_modal = document.getElementById("follower-modal");
var following_modal = document.getElementById("following-modal");

var followers_btn = document.getElementById("followers");
var following_btn = document.getElementById("following");
var update_btn = document.getElementById("update");
var btn = document.getElementById("create-list-btn");
var profile_btn = document.getElementById("account_btn");

var account_close_btn = document.getElementById("account-modal-close");
var update_close_btn = document.getElementById("update-modal-close");
var close_btn = document.getElementById("create-list-modal-close");
var follower_close_btn = document.getElementById("follower-modal-close");
var following_close_btn = document.getElementById("following-modal-close");

var cancel_btn = document.getElementById("create-list-modal-cancel-btn");

var name_input = document.getElementById("list-name-input");
var description_input = document.getElementById("list-desc-textarea");

// open modal by clicking button
btn.onclick = function() {
  modal.style.display = "block";
}
profile_btn.onclick = function() {
  account_modal.style.display = "block";
}
update_btn.onclick = function() {
  update_modal.style.display = "block";
  account_modal.style.display = "none";
}
followers_btn.onclick = function() {
  follower_modal.style.display = "block";
}
following_btn.onclick = function() {
  following_modal.style.display = "block";
}

// close modal with close/cancel buttons or clicking outside of modal
close_btn.onclick = function() {
  modal.style.display = "none";
}
account_close_btn.onclick = function() {
  account_modal.style.display = "none";
}
update_close_btn.onclick = function() {
  update_modal.style.display = "none";
}
follower_close_btn.onclick = function() {
  follower_modal.style.display = "none";
}
following_close_btn.onclick = function() {
  following_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal || event.target == account_modal || event.target == follower_modal || event.target == following_modal) {
    modal.style.display = "none";
    account_modal.style.display = "none";
    follower_modal.style.display = "none";
    following_modal.style.display = "none";
  }
}

// also clear input values if cancelled
cancel_btn.onclick = function() {
  modal.style.display = "none";
  update_modal.style.display = "none";
  account_modal.style.display = "none";
  name_input.value = null;
  description_input.value = null;
}