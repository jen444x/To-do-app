const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// registering
router.post("/register", async (req, res) => {
  const first_name = req.body.first_name?.trim();
  const last_name = req.body.last_name?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password;

  // make sure all required fields are filled
  if (!first_name || !last_name || !password) {
    return res.status(400).json({ error: "Missing fields." });
  }

  try {
    // check if user already exists
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkUser.rows.length !== 0) {
      res.status(401).json({ error: "Email already in use" });
    }

    // encrypt user pw
    const hashed = await bcrypt.hash(password, 10);

    // add new user
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, hashed]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
