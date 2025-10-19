app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "All fields required" });

  try {
    const [rows] = await db.execute(
      "SELECT user_id, username, email, password_hash, role FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];

    if (!user || !user.password_hash) {
      return res.json({ success: false, message: "Invalid email or password!" });
    }

    // Fix PHP $2y$ hashes to Node.js compatible $2a$
    let hash = user.password_hash;
    if (hash.startsWith("$2y$")) {
      hash = "$2a$" + hash.slice(4);
    }

    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
      return res.json({ success: false, message: "Invalid email or password!" });
    }

    // Save session
    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role,
    };

    res.json({
      success: true,
      user_id: user.user_id,
      username: user.username,
      role: user.role,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});
