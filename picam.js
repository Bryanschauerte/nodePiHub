const fs = require("fs");

class PiCamera {
  constructor(config) {
    this.config = config;

    this.record = () => {
      const time = this.config.timeout || 1000;

      return new Promise((resolutionFunc, rejectionFunc) => {
        if (this.config.makeProblemRecording) {
          return setTimeout(() => rejectionFunc(true), time);
        }
        return setTimeout(() => resolutionFunc(true), time);
      });
    };
    this.snap = () => {
      const config = this.config || {
        mode: "photo",
        output: `${__dirname}/public/test.jpg`,
        width: 640,
        height: 480,
        nopreview: true,
      };
      return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + "/heman.jpg", (err, data) => {
          if (err) reject(err);
          else {
            fs.writeFile(`${__dirname}/public/test.jpg`, data, (err) => {
              if (err) return reject(err);
              console.log("The file has been saved!");
              resolve(`test.jpg`);
            });
          }
        });
      });
    };
  }
}

module.exports.PiCamera = PiCamera;
