exports.mongoErrors = error => {
  if (error.includes("E11000")) {
    const getError = error.split("key:")[1].replace(/{|}/gm, "");
    const keyError = getError.split(":");
    return `${keyError[0].trim()} is already in use`;
  }
  return error;
};
