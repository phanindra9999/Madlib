const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
server.use(logger('dev')); // Log HTTP requests

// Serve static files from the public directory
const publicDir = path.join(__dirname, 'public');
server.use(express.static(publicDir));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Route to handle form submission
server.post('/submit', (req, res) => {
  const { noun, verb, verbIng, adjective, pluralNoun } = req.body;

  // Check if all fields are filled
  if (!noun || !verb || !verbIng || !adjective || !pluralNoun) {
    res.send(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8d7da;
            color: #721c24;
            padding: 20px;
          }
          h1 {
            color: #721c24;
          }
          p {
            font-size: 16px;
          }
          a {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 15px;
            background-color: #f5c6cb;
            color: #721c24;
            text-decoration: none;
            border-radius: 5px;
          }
          a:hover {
            background-color: #f1b0b7;
          }
        </style>
      </head>
      <body>
        <h1>Submission Failed</h1>
        <p>Please fill out ALL fields.</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
      </body>
      </html>
    `);
    return;
  }

  // Generate the Mad Lib story
  const madLib = `
    Once upon a time, there was a ${adjective} ${noun}. 
    It loved to ${verb} every day and spent its evenings ${verbIng}. 
    Its favorite companions were a group of ${pluralNoun}, 
    and together they had endless adventures.
  `;

  // Send response with the generated story
  res.send(`
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #d4edda;
          color: #155724;
          padding: 20px;
        }
        h1 {
          color: #155724;
        }
        p {
          font-size: 16px;
        }
        a {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 15px;
          background-color: #c3e6cb;
          color: #155724;
          text-decoration: none;
          border-radius: 5px;
        }
        a:hover {
          background-color: #b1dfbb;
        }
      </style>
    </head>
    <body>
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    </body>
    </html>
  `);
});

// Port selection for production and local environments
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/ITC505/lab-7/index.html`);
});
