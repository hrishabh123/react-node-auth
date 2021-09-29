const path = require("path");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./config/database").connect();

const User = require("./model/user");
const Auth = require("./middleware/auth");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user101 = await User.findOne({ email });

    if (user101 && (await bcrypt.compare(password, user101.password))) {
      const token = jwt.sign(
        { user_id: user101._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user101.token = token;

      res.status(200).json(user101);
    } else if (user101 && !(await bcrypt.compare(password, user101.password))) {
      res.status(400).send("Incorrect Credentials");
    }

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    if (!user101) {
      encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/auth", Auth, (req, res) => {
  res.status(200).json({ message: "ok" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
