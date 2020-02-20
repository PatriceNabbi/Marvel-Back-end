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
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const hash = md5(ts + privateKey + publicKey);
console.log(hash);

//READ
app.get("/", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=0`
  );

  res.json(response.data);
});

app.get("/characters/:id", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/characters/${req.params.id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=0`
  );
  console.log(req.query.id);
  res.json(response.data);
});

app.get("/comics/:id", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/comics/${req.params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=0`
  );
  console.log(req.query.id);
  res.json(response.data);
});

app.get("/comics/", async (req, res) => {
  const response = await axios.get(
    `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=0`
  );

  res.json(response.data);
});
//UPDATE

//DELETE

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
