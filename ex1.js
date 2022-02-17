const din = 19;
const clk = 18;
const cs = 16;

const { MAX7219 } = require("./index");
const max = new MAX7219(din, clk, cs);
max.setup();

// heart icon
const data = new Uint8Array([
  0b00000000, 0b01100110, 0b11111111, 0b11111111, 0b01111110, 0b00111100,
  0b00011000, 0b00000000,
]);

// show heart
max.write(data);
delay(3000);

// on and off
var pow = false;
for (var i = 0; i < 6; i++) {
  if (pow) {
    max.on();
  } else {
    max.off();
  }
  pow = !pow;
  delay(1000);
}

// brightness
for (var b = 0; b < 16; b++) {
  max.setIntensity(b);
  delay(500);
}
