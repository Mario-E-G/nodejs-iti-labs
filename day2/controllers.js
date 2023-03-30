const fs = require("fs");
const jsonFile = "./db/db.json";

let objectsReturn;

if (fs.existsSync(jsonFile) === false) {
  fs.writeFileSync(jsonFile, "[]");
}
if (fs.existsSync(jsonFile)) {
  const content = fs.readFileSync(jsonFile, "utf-8");
  if (content.length == 0) {
    fs.writeFileSync(jsonFile, "[]");
  }
}

const contentAfterLengthCheck = fs.readFileSync(jsonFile, "utf-8");
const dbArray = JSON.parse(contentAfterLengthCheck);

const addItem = (data) => {
  let item;
  if (dbArray.length == 0) {
    item = {
      id: 1,
      title: data.title,
      body: data.body,
      checked: false,
    };
  } else {
    item = {
      id: dbArray[dbArray.length - 1].id + 1,
      title: data.title,
      body: data.body,
      checked: false,
    };
  }
  dbArray.push(item);
  fs.writeFileSync(jsonFile, JSON.stringify(dbArray, null, 2));
  return item;
};

const editItem = (data) => {
  console.log("insideEdit");
  let foundFlag = 0;
  dbArray.map((el) => {
    if (el.id == data.id) {
      console.log("Found Item");
      console.log(el);
      objectsReturn = el;
      el.title = data.title;
      el.body = data.body;
      foundFlag = 1;
    }
  });
  if (foundFlag == 0) {
    console.log("Element not found...");
  } else {
    fs.writeFileSync(jsonFile, JSON.stringify(dbArray, null, 2));
    return objectsReturn;
  }
};

const listItems = (data) => {
  console.log("listFunc");
  switch (data[0]) {
    case "a": //List All
      return dbArray;

    case "c": //List check=true
      objectsReturn = dbArray.filter((obj) => {
        if (obj.checked) {
          return obj;
        }
      });
      return objectsReturn;

    case "u": //List check=false
      objectsReturn = dbArray.filter((obj) => {
        if (obj.checked == false) {
          return obj;
        }
      });
      return objectsReturn;

    default:
      console.log("Wrong Input...");
      break;
  }
};
//////////////////////////////////////////////////////////////////Anoter Way to remove///////////////////////////////////////////////
// const removeItem = (id) => {
//   const arrayaFterFilter = dbArray.filter((el) => el.id != id);
//   fs.writeFileSync(jsonFile, JSON.stringify(arrayaFterFilter, null, 2));
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const removeItem = (id) => {
  console.log("removeFunc");
  let foundFlag = 0;
  dbArray.filter((item, index) => {
    if (id == item.id) {
      dbArray.splice(index, 1);
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    fs.writeFileSync(jsonFile, JSON.stringify(dbArray, null, 2));
  }
};

const listItemById = (id) => {
  let objectsReturn;
  let foundFlag = 0;
  dbArray.map((el) => {
    if (el.id == id) {
      objectsReturn = el;
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element not found...");
  } else {
    return objectsReturn;
  }
};

const ckeckedItem = (id) => {
  console.log("checkedFunc");
  let foundFlag = 0;

  dbArray.map((el) => {
    if (el.id == id) {
      console.log("Found Item");
      el.checked = true;
      foundFlag = 1;
      objectsReturn = el;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    fs.writeFileSync(jsonFile, JSON.stringify(dbArray, null, 2));
    return objectsReturn;
  }
};

const un_ckeckedItem = (id) => {
  console.log("un_checkedFunc");
  let foundFlag = 0;
  dbArray.map((el) => {
    if (el.id == id) {
      console.log("Found Item");
      el.checked = false;
      foundFlag = 1;
      objectsReturn = el;
    }
  });
  if (foundFlag == false) {
    console.log("Element not found...");
  } else {
    fs.writeFileSync(jsonFile, JSON.stringify(dbArray, null, 2));
    return objectsReturn;
  }
};

module.exports = {
  addItem,
  editItem,
  removeItem,
  listItems,
  listItemById,
  ckeckedItem,
  un_ckeckedItem,
};
