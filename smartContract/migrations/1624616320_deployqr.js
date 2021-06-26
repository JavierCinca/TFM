const Qr = artifacts.require("Qr");

module.exports = function (deployer) {
  deployer.deploy(Qr, "RealMadrid-Barcelona", 16728339, 2);
};
