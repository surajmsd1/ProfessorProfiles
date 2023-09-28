const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "public/")));

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/login', (req, res) => {
    res.send({
        token: "token"
    });
});

// Catch-all route
app.get('*', (req, res, next) => {
  if (req.headers.accept && req.headers.accept.startsWith("text/html")) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

require("./routes/faculty.routes.js")(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});
