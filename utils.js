module.exports.utils = {
  // sending the flag nonPi to the sever scripts
  notOnPi: () => process.argv.slice(2)[0] === "nonPi",
};
