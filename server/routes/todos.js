const router = require("express").Router();
const pool = require("../db");

// create a todo
// route handler that listens for post request in this URl /todos
// async makes the function asyncrounous so i can use await
// (req, res) parameters passed in every request
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    // check if nothing was deleted
    if (deleteTodo.rows.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(deleteTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
