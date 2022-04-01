const fs = require("fs");
const express = require("express");
const app = express();

if (fs.existsSync("date-time.html")) {
  fs.unlinkSync("date-time.html");
}

fs.writeFileSync(
  "date-time.html",
  "<head><title>Date-time task</title></head>"
);

setInterval(() => {
  fs.appendFile(
    "date-time.html",
    `
    <p>${new Date().toLocaleTimeString()}</p>`,
    "utf-8",
    (err) => {
      if (err) throw err;
      console.log("data stored");
    }
  );
}, 1000);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(fs.readFileSync("date-time.html", "utf8"));
});

app.listen(PORT, () => console.log("listening on port", PORT));
