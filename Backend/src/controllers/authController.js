const db = require("../config/db");

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Missing credentials" });

  try {
    const [[user]] = await db.query(
      "SELECT id,name,email,role,password FROM Users WHERE email=?",
      [email]
    );

    if (!user || user.password !== password)
      return res.status(401).json({ error: "Invalid credentials" });

    // return user info (token later)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (e) {
    res.status(500).json({ error: "Login failed" });
  }
};
