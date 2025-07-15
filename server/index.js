require("dotenv").config();
const express = require("express"); // require express library so we can use it.
// gives you access to the Express functions so you can build a web server.
// means you're saving that functionality into a variable called express.
const cors = require("cors"); // import cors middleware
// CORS stands for Cross-Origin Resource Sharing — it’s a security rule in
// browsers that can block your frontend from talking to your backend if they’re on
// different domains/ports (like React on localhost:3000 calling Express on localhost:5050).
// By requiring it, you’re preparing to use it to avoid those blocks.
const pool = require("./db"); // i dont have to set up the connection again, just import like so

const app = express(); // var app that is holding express library
// creating your server instance by calling the express function.
// app becomes your actual server — this is where you define routes, middleware, and how it handles requests.
const PORT = process.env.PORT || 5050; // fallback to 5050 if not set

// middleware
app.use(cors()); // app.use() means: “Every time a request comes in, run this middleware before anything else.”
// cors() is middleware that modifies the headers on every request so that your backend allows
// requests from other origins (like your React frontend).
app.use(express.json()); // makes data available on req.body

// ROUTES
// create a todo
// route handler that listens for post request in this URl /todos
// async makes the function asyncrounous so i can use await
// (req, res) parameters passed in every request
app.post("/todos", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;

    const newTodo = await pool.query(
      "INSERT INTO todo (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );

    // sends a json formatted response. sets content-type head to applications/json.
    // converts JS object into a JSON string fro the client
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get one todo

// get all
// delete 1
// delete multiple
// delete all
// edit

app.listen(PORT, () => {
  // starts the server and tells it to listen for requests on port 5050.
  // A callback is just a function you pass into another function, to be called later.
  console.log(`Server has started on port ${PORT}.`);
});
