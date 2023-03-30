const addpost = (data) => {
  console.log("insideAdd");
  let post = {
    firstName: data.firstName,
    lastName: data.lastName,
  };
  console.log(post);
  //   dbArray.push(item);
  return post;
};

const editpost = (data) => {
  console.log("insideEdit");
};

const listAllposts = (data) => {
  console.log("listFunc");
};
//////////////////////////////////////////////////////////////////Anoter Way to remove///////////////////////////////////////////////
// const removeItem = (id) => {
//   const arrayaFterFilter = dbArray.filter((el) => el.id != id);
//   fs.writeFileSync(jsonFile, JSON.stringify(arrayaFterFilter, null, 2));
// };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const removepost = (id) => {
  console.log("removeFunc");
};

const listpostById = (id) => {
  console.log("Get post by id");
};

module.exports = {
  addpost,
  editpost,
  removepost,
  listAllposts,
  listpostById,
};
