import express from "express";

const app = express();

app.get("/kossomk", (req, res) => {
  res.send("555555, kossomen omk");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});