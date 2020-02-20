require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const md5 = require("md5");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

ts = Math.floor(Date.now() / 1000);
PublicKey = "031b52ea3308644001fe99df69e2c703";
PrivateKey = "c16647d3489b91f2fc7692bebf605dfd7043a325";
const hash = md5(ts + PrivateKey + PublicKey);
console.log(hash);

//READ
app.get("/", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PublicKey}&hash=${hash}&limit=100&offset=0`
  );

  res.json(response.data);
});

app.get("/characters/:id", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/characters/${req.params.id}/comics?ts=${ts}&apikey=${PublicKey}&hash=${hash}&limit=100&offset=0`
  );
  console.log(req.query.id);
  res.json(response.data);
});

app.get("/comics/:id", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/comics/${req.params.id}?ts=${ts}&apikey=${PublicKey}&hash=${hash}&limit=100&offset=0`
  );
  console.log(req.query.id);
  res.json(response.data);
});

app.get("/comics/", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PublicKey}&hash=${hash}&limit=100&offset=0`
  );

  res.json(response.data);
});
//UPDATE

//DELETE

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(4000, () => {
  console.log("Server started");
});
