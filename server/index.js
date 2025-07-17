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
  // ? - if name is not undefined or null, trim it
  // trim() - gets rid of whitespace. make sure name is filled in and not just spaces
  const name = req.body.name?.trim();
  const description = req.body.description?.trim();

  // falsy - empty string, null, undefined
  if (!name) {
    return res.status(400).json({ error: "Task name is required." });
  }

  try {
    // if description is blank, add null
    const newTodo = await pool.query(
      "INSERT INTO todo (name, description) VALUES ($1, $2) RETURNING *",
      [name, description === "" ? null : description]
    );

    // sends a json formatted response. sets content-type head to applications/json.
    // converts JS object into a JSON string fro the client
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// get one todo
// :id is a route parameter, a placeholder for a dynamic value
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    // check if no row was found
    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// edit one todo
app.put("/todos/:id", async (req, res) => {
  const name = req.body.name?.trim();
  const description = req.body.description?.trim();
  const id = req.params.id;

  // check if no fields were provided
  // check like this instead of (!desc) bc maybe they wanna clear it
  // undefined means they sent nothing at all
  if (name === undefined && description === undefined) {
    return res.status(400).json({ error: "No fields to update." });
  }

  // reject empty name
  if (name === "") {
    return res.status(400).json({ error: "Task name cannot be empty." });
  }

  // build dynamic set
  const fields = []; // strings like "name = $1"
  const values = []; // actual values to substitute into query
  let paramIndex = 1; // track which $1, $2 to use

  if (name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(name);
  }

  if (description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(description === "" ? null : description);
  }

  values.push(id); // for WHERE clause. param index is already updated since we did postincrement

  try {
    // build query
    const query = `UPDATE todo SET ${fields.join(
      ", "
    )} WHERE todo_id = $${paramIndex} RETURNING *`;

    // run query
    const updateTodo = await pool.query(query, values);

    if (updateTodo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.json(updateTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// delete one todo
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    // check if nothing was deleted
    if (deleteTodo.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(deleteTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  // starts the server and tells it to listen for requests on port 5050.
  // A callback is just a function you pass into another function, to be called later.
  console.log(`Server has started on port ${PORT}.`);
});
