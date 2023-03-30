const userModel = require("../models/userModel");

const addUser = async (data) => {
  let user = { ...data };
  let userCreation = await userModel.create(user, (err, createdUser) => {
  console.log("inside return func : " + createdUser);
    return createdUser;
  });  
  return userCreation;
};

const editUser = (data) => {
  console.log("insideEdit");
};

const listAllUsers = (data) => {
  console.log("listFunc");
};

//////////////////////////////////////////////////////////////////Anoter Way to remove///////////////////////////////////////////////
// const removeItem = (id) => {
//   const arrayaFterFilter = dbArray.filter((el) => el.id != id);
//   fs.writeFileSync(jsonFile, JSON.stringify(arrayaFterFilter, null, 2));
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const removeUser = (id) => {
  console.log("removeFunc");
};

const listUserById = (id) => {
  console.log("Get user by id");
};

module.exports = {
  addUser,
  editUser,
  removeUser,
  listAllUsers,
  listUserById,
};
