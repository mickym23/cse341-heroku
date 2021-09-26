const http = require('http');
const { listenerCount } = require('process');

// Setting a global array to store user names
let users = ["User 1", "User 2", "User 3", "User 4"];

// Server function
const serverHandler = (req, res) => {

   // Get request url and method
   const url = req.url;
   const method = req.method;
  
   // The '/' "slash" route
   if (url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html><head><title>Home Page</title></head>');
      res.write('<body><h1>Hello there! Welcome to the Home Page!</h1>');
      res.write('<br><form method="post" action="/create-user"><label for="username">Enter new username: </label><input type="text" name="username"><button type="submit">Enter</button>');
      res.write('</form><br><a href="./users">Display the List of Users</a>');
      res.write('</body></html>');
      return res.end();
   }; 

   // Handle the '/users' route
   if (url === '/users') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<body><ul>');

      // Iterate through and display the global array of usernames
      for (user of users) {
      res.write(`<li>${user}</li>`);
      }
      res.write('</ul></body></html>');
      return res.end();
   }; 

   // Form action via POST method
   if (url === "/create-user" && method === "POST") {
      const body = [];
      req.on('data', chunk => {
         body.push(chunk);
      });
      req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         let user = parsedBody.split('=')[1];

         // Add new user to global users array
         users.push(user);

         // Log the new user name to the console
         console.log(user);
      });

         // Redirect home
         res.statusCode = 302;
         res.setHeader('Location', '/');
         return res.end();
   };
};

// Setting route to server function
const route = serverHandler;

// Creating server
const server = http.createServer(route);

// Let server listen on Port 3000
server.listen(3000);