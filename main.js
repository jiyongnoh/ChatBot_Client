const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");

button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = inputField.value;
  inputField.value = "";
  chatBoxBody.innerHTML += `<div class="message">${message}</div>`;
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
  var dots = window.setInterval(function () {
    var wait = document.getElementById("loading");
    if (window.dotsGoingUp && wait) wait.innerHTML += ".";
    else {
      wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
      if (wait.innerHTML.length < 2) window.dotsGoingUp = true;
    }
    if (wait.innerHTML.length > 3) window.dotsGoingUp = false;
  }, 250);

  fetch("http://43.201.75.68:4000/openAI/message", {
    method: "POST",
    headers: {
      accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("loading").remove();
      chatBoxBody.innerHTML += `<div class="response">${data.message}</div>`;
      scrollToBottom();
    });
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}
