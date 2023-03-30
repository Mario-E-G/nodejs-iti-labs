const userModel = require("../models/userModel");

const addUser = async (req, res) => {
  const user = { ...req.body };
  try {
    const createdUser = await userModel.create(user);
    return res.status(201).json(createdUser);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const editUser = async (req, res) => {
  const userData = { ...req.body };
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, userData);
    if (user) {
      return res.json(user);
    } else {
      return res.json({ Message: "User is not exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Deletion" });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (user) {
      return res.json(user);
    } else {
      return res.json({ Message: "No User exist" });
    }
  } catch (error) {
    return res.status(500).send("Error In Retreival");
  }
};

//////////////////////////////////////////////////////////////////Anoter Way to remove///////////////////////////////////////////////
// const removeItem = (id) => {
//   const arrayaFterFilter = dbArray.filter((el) => el.id != id);
//   fs.writeFileSync(jsonFile, JSON.stringify(arrayaFterFilter, null, 2));
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const removeUser = async (req, res) => {
  try {
    const user = userModel.findByIdAndRemove(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.json({ Message: "User is not exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Deletion" });
  }
};

const listUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.json({ Message: "User is not exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Retreival" });
  }
};

module.exports = {
  addUser,
  editUser,
  removeUser,
  listAllUsers,
  listUserById,
};
