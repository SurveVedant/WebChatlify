// index.js

document.addEventListener("DOMContentLoaded", function() {
    // Find the "Chat Now" button by its class name
    var chatNowButton = document.querySelector(".button");
  
    // Add click event listener to the "Chat Now" button
    chatNowButton.addEventListener("click", function() {
      // Redirect the user to chat.html
      window.location.href = "chat.html";
    });
  });
  