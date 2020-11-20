const express = require("express");

const app = express();

app.post("/user/login", (req, res) => {
  console.log(req.body);
  //   console.log(res);
  res.json({
    code: 0
  });
});

app.get("/user/info", (req, res) => {
  res.json({
    code: 0
  });
});

app.listen("8088", () => {
  console.log("server start!!!");
});
