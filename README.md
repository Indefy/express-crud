# express-crud

  # Express Server, Database CRUD 

  ### Challenge instructions

//uniqe ID generator useded, https://www.npmjs.com/package/uuid#uuidv4options-buffer-offset

Create a new node.js project
implement an express server that will support CRUD operations of users as a REST API Server

1 - Create an express app
2 - Implement the needed routes  
3 - Use 3rd party middleware if needed
4 - Write custom middleware if needed
5 - log each request made to your express API into logs/http.log
      in the format of - The HTTP Method,  the request URL path, and time stamp in milliseconds
6 - Write errors to logs/errors.log in the format of
     The HTTP Method,  the request URL path, and timestamp in milliseconds, the error message.
7 - The users will be managed in a json file that will serve as our database, lets create one at data/users.json
8 - the json will contain an array of users objects looking like this:
{
    "first_name":"SHlomo",
    "last_name":"Baraba",
    "email":"shlomo@gmail.com",
    "phone":"05236546232"
}
