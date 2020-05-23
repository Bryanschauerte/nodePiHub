const x = 'weeeok'
class Gpio {
    constructor(pin, config) {
        this.pin = pin;
        this.config = {
            mode: config.OUTPUT
        }

      this.digitalWrite = val => {
          this.value = val
          console.log(this.pin, ' digital write: ', val)
        }

        this.pwmWrite = val => {
            this.pwmvalue = val
            console.log(this.pin, 'pwmvalue write: ', val)
          }

      this.digitalRead = () => console.log(this.pin, 'digital Read: ', this.value)

      this.pwmRead = () => console.log(this.pin, 'pwmRead Read: ', this.pwmvalue)

}
}

module.exports.Gpio= Gpio