const express = require('express');
const router = express.Router();

router.get("/login", (req, res, next) => {
    res.send(`<form id="loginForm"><input type="text" id="username"/><button id="btn">Submit</button></form>
             <script>
                document.getElementById('btn').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent form submission
                    
                    // Get the username from the input field
                    const username = document.getElementById('username').value;
                    
                    // Store the username in local storage
                    localStorage.setItem('username', username);
                  
                    // Redirect to the homepage
                    window.location.href = "/";
                });
            </script>`);
});

module.exports = router;
