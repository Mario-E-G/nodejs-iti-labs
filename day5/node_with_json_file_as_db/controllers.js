const fs = require("fs");
const jsonFile = "./db.json";

function asyncReadFile(filePath, encodeFormat) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encodeFormat, (err, data) => {
      if (!err) return resolve(data);
      return reject(err);
    });
  });
}

function asyncExistFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (fileExistence) => {
      return resolve(fileExistence);
    });
  });
}

function asyncWriteFile(filePath, arr) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, arr, (err) => {
      if (!err) return resolve("Done");
      return reject(err);
    });
  });
}

async function write() {
  if ((await asyncExistFile(jsonFile)) === false) {
    await asyncWriteFile(jsonFile, "[]");
  } else {
    const content = await asyncReadFile(jsonFile, "utf-8");
    if (content.length == 0) {
      await asyncWriteFile(jsonFile, "[]");
    }
  }
}

const addItem = async (data) => {
  await write();
  const contentAfterLengthCheck = await asyncReadFile(jsonFile, "utf-8");
  const dbArray = JSON.parse(contentAfterLengthCheck);
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
  await asyncWriteFile(jsonFile, JSON.stringify(dbArray));
};

const editItem = async (data) => {
  await write();

  const contentAfterLengthCheck = await asyncReadFile(jsonFile, "utf-8");
  const dbArray = JSON.parse(contentAfterLengthCheck);
  console.log("insideEdit");
  let foundFlag = 0;
  await dbArray.map((el) => {
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
  await asyncWriteFile(jsonFile, JSON.stringify(dbArray));
};

const listItems = async (data) => {
  await write();

  const contentAfterLengthCheck = await asyncReadFile(jsonFile, "utf-8");
  const dbArray = JSON.parse(contentAfterLengthCheck);
  console.log("listFunc");
  switch (data[0]) {
    case "a": //List All
      await dbArray.map((obj) => {
        console.log(obj);
      });
      break;

    case "c": //List check=true
      await dbArray.filter((obj) => {
        if (obj.checked) {
          console.log(obj);
        }
      });
      break;

    case "uc": //List check=false
      await dbArray.filter((obj) => {
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

const removeItem = async (id) => {
  await write();

  const contentAfterLengthCheck = await asyncReadFile(jsonFile, "utf-8");
  const dbArray = JSON.parse(contentAfterLengthCheck);
  console.log("removeFunc");
  let foundFlag = 0;
  await dbArray.filter((item, index) => {
    if (id == item.id) {
      console.log("FoundItem");
      dbArray.splice(index, 1);
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    await asyncWriteFile(jsonFile, JSON.stringify(dbArray));
  }
};

const ckeckedItem = async (id) => {
  await write();

  const contentAfterLengthCheck = await asyncReadFile(jsonFile, "utf-8");
  const dbArray = JSON.parse(contentAfterLengthCheck);
  console.log("checkedFunc");
  let foundFlag = 0;

  await dbArray.map((el) => {
    if (el.id == id) {
      console.log("Found Item");
      el.checked = true;
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    await asyncWriteFile(jsonFile, JSON.stringify(dbArray));
  }
};

const un_ckeckedItem = async (id) => {
  await write();

  const contentAfterLengthCheck = await asyncReadFile(jsonFile, "utf-8");
  const dbArray = JSON.parse(contentAfterLengthCheck);
  console.log("un_checkedFunc");
  let foundFlag = 0;

  await dbArray.map((el) => {
    if (el.id == id) {
      console.log("Found Item");
      el.checked = false;
      foundFlag = 1;
    }
  });
  if (foundFlag == false) {
    console.log("Element is not found...");
  } else {
    await asyncWriteFile(jsonFile, JSON.stringify(dbArray));
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
