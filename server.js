const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let projectData = {};

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use static websites
app.use(express.static("website"));

app.get("/getData", (req, res) => {
  res.send(projectData)
});

app.post("/sendData", (req, res) => {
    projectData.date    = req.body.date;
    projectData.temp    = req.body.temp;
    projectData.content = req.body.content;
    res.send(projectData)
});


// Initialize the main project folder
const runningServer = app.listen(3030, () => {
  console.log(
    "server is running on http://localhost:" + runningServer.address().port
  );
});
