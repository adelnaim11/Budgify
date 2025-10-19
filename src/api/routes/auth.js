import express from "express";
import bcrypt from "bcryptjs";
import { db } from "./dbconnect.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "All fields are required!" });

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE Email = ?", [email]);
    const user = rows[0];

    if (!user) return res.json({ success: false, message: "Invalid email or password!" });

    const valid = await bcrypt.compare(password, user.Password_hash);

    if (!valid) return res.json({ success: false, message: "Invalid email or password!" });

    req.session.user = {
      id: user.user_id,
      username: user.Username,
      role: user.role,
    };

    res.json({
      success: true,
      user_id: user.user_id,
      username: user.Username,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

export default router;
