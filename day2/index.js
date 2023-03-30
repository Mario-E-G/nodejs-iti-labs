const express = require("express");
const app = express();
let returnvalue;
const port = process.env.port || 5000;
const {
  addItem,
  ckeckedItem,
  un_ckeckedItem,
  listItems,
  removeItem,
  editItem,
  listItemById,
} = require("./controllers");
const fs = require("fs");

app.use(express.json());

//root page
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Express</>");
});

// list items based on query string
app.get("/todo", (req, res) => {
  let result = listItems(req.query.a);
  res.send(result);
});

// get item by id
app.get("/todo/:id", (req, res) => {
  let result = listItemById(req.params.id);
  res.send(result);
});

// add new item
app.post("/todo", (req, res) => {
  const newItem = addItem(req.body);
  res.send(`Item ${newItem.id} Added Successfully`);
});

//update item by id
app.put("/todo/:id", (req, res) => {
  const full_data = {
    id: req.params.id,
    title: req.body.title,
    body: req.body.body,
  };
  returnvalue = editItem(full_data);
  res.send(`Updated Successfully item with id = ${returnvalue.id}`);
});

// delete item by id
app.delete("/todo/:id", (req, res) => {
  removeItem(req.params.id);
  res.send(`Deleted Successfully`);
});

//update checked properety
app.patch("/todo/:id", (req, res) => {
  if (req.query.c == "true") {
    result = ckeckedItem(req.params.id);
    res.send(result);
  } else {
    result = un_ckeckedItem(req.params.id);
    res.send(result);
  }
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is Running on Port : ${port}`);
  } else {
    console.log("Error: ", err);
  }
});
