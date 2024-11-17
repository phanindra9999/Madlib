const express = require('express');
const path = require('path');
const server = express();

// Middleware to parse form data
server.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
const publicDir = path.join(__dirname, 'public');
server.use(express.static(publicDir));

// Route for the root URL, redirecting to the main form
server.get('/', (req, res) => {
  res.redirect('/ITC505/lab-7/index.html');
});

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Route to handle form submission
server.post('/submit', (req, res) => {
  const { noun, verb, verbIng, adjective, pluralNoun } = req.body;

  if (!noun || !verb || !verbIng || !adjective || !pluralNoun) {
    res.send(`
      <html>
      <head>
        <title>Submission Failed</title>
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

  const madLib = `
    Once upon a time, there was a ${adjective} ${noun}.
    It loved to ${verb} every day and spent its evenings ${verbIng}.
    Its favorite companions were a group of ${pluralNoun},
    and together they had endless adventures.
  `;

  res.send(`
    <html>
    <head>
      <title>Submission Successful</title>
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

// Handle favicon requests
server.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(publicDir, 'favicon.ico'));
});

// Export the server for Vercel
module.exports = server;
