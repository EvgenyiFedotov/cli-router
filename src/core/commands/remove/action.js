const action = async (nameModule, nameTemplate) => {
  console.log(nameModule, nameTemplate);
};

module.exports = (...args) => {
  action(...args);
};
