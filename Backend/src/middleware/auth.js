const db = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId)
      return res.status(401).json({ error: "No user" });

    const [[user]] = await db.query(
      "SELECT id,role FROM Users WHERE id=?",
      [userId]
    );

    if (!user)
      return res.status(401).json({ error: "Invalid user" });

    req.user = user;
    next();

  } catch {
    res.status(500).json({ error: "Auth error" });
  }
};
