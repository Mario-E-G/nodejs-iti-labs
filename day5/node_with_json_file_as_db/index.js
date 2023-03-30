const {
  addItem,
  ckeckedItem,
  un_ckeckedItem,
  listItems,
  removeItem,
  editItem,
} = require("./controllers");
const fs = require("fs");
const input = process.argv;
const [, , method, ...params] = input;

function orgData(params) {
  const organizedData = params.reduce((prev, el) => {
    const [k, v] = el.split("=");
    prev[k] = v;
    return prev;
  }, {});
  return organizedData;
}
const dataAfterPrepare = orgData(params);

function start() {
  switch (method) {
    case "a": //addItem
      addItem(dataAfterPrepare);
      break;

    case "e": //editItem
      editItem(dataAfterPrepare);
      break;

    case "r": //removeItem
      removeItem(dataAfterPrepare.id);
      break;

    case "l": //listItem
      listItems(params);
      break;

    case "c": //check=true
      ckeckedItem(dataAfterPrepare.id);
      break;

    case "uc": //check=false
      un_ckeckedItem(dataAfterPrepare.id);
      break;

    default:
      console.log("Wrong Input...");
      break;
  }
}
start();
