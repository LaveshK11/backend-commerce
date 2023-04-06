exports.checkValidation = async (data) => {
  let validity = 0;
  if (Object.keys(data).length) {
    for (let key in data) {
      if (data[key] == "") {
        return 1;
      }
    }
  } else {
    return 1;
  }
  return validity;
};
