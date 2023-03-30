const fs = require("fs");
const jsonFile = "./db.json";

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
  fs.writeFileSync(jsonFile, JSON.stringify(dbArray));
};

const editItem = (data) => {
  console.log("insideEdit");
  let foundFlag = 0;
  dbArray.map((el) => {
    if (el.id == data.id) {
      console.log("Found Item");
      el.title = data.title;
      el.body = data.body;
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  }
  fs.writeFileSync(jsonFile, JSON.stringify(dbArray));
};

const listItems = (data) => {
  console.log("listFunc");
  switch (data[0]) {
    case "a": //List All
      dbArray.map((obj) => {
        console.log(obj);
      });
      break;

    case "c": //List check=true
      dbArray.filter((obj) => {
        if (obj.checked) {
          console.log(obj);
        }
      });
      break;

    case "uc": //List check=false
      dbArray.filter((obj) => {
        if (obj.checked == false) {
          console.log(obj);
        }
      });
      break;

    default:
      console.log("Wrong Input...");
      break;
  }
};

const removeItem = (id) => {
  console.log("removeFunc");
  let foundFlag = 0;

  dbArray.filter((item, index) => {
    if (id == item.id) {
      console.log("FoundItem");
      dbArray.splice(index, 1);
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    fs.writeFileSync(jsonFile, JSON.stringify(dbArray));
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
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
 fs.writeFileSync(jsonFile, JSON.stringify(dbArray));
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
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    fs.writeFileSync(jsonFile, JSON.stringify(dbArray));
  }
};

module.exports = {
  addItem,
  editItem,
  removeItem,
  listItems,
  ckeckedItem,
  un_ckeckedItem,
};
