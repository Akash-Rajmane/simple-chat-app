const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

const loginRoutes = require("./routes/login"); 

app.get("/login",loginRoutes);

app.get("/", (req, res, next) => {
    // Read chat messages from chat.txt
    fs.readFile('chat.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Send HTML response with chat messages
        res.send(`<div id="chats">${data}</div>
                  <form action="/send" method="POST" id="messageForm">
                      <input type="text" id="msg" name="message"/>
                      <input type="hidden" id="username" name="username"/> <!-- Hidden input for username -->
                      <button id="sendBtn" type="submit">Send</button>
                  </form>
                  <script>
                      // Populate the hidden input with username before form submission
                      document.getElementById('messageForm').addEventListener('submit', function(event) {
                          event.preventDefault(); // Prevent form submission
                          
                          // Get the username from local storage
                          const username = localStorage.getItem('username');
                          
                          // Set the value of the hidden input field to the username
                          document.getElementById('username').value = username;
                          
                          // Submit the form
                          this.submit();
                      });
                  </script>`);
    });
});


app.post("/send", (req, res, next) => {
    const message = req.body.message;
    const username = req.body.username;

    // Append new message along with username to chat.txt
    fs.appendFile('chat.txt', `<p>${username}: ${message}</p>\n`, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Redirect back to the homepage after sending message
        res.redirect("/");
    });
});

app.listen(3000);