const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-box");
const messageForm = document.getElementById("send-box");
const messageInput = document.getElementById("message-input");

const name = prompt("Type your name here");
appendMessage("You are in");
socket.emit("new-chatid", name);

socket.on("chat-message", (data) => {
  appendMessage("${data.name}: ${data.message}");
});

socket.on("chatid-connected", (name) => {
  appendMessage("${name} connected");
});

socket.on("chatid-disconnected", (name) => {
  appendMessage("${name} disconnected");
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage("User: ${message}");
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
