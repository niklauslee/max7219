/**
 * An example using multiple LED matrices
 */

const din = 19;
const clk = 18;
const cs = 16;
const devices = 4;

const {MAX7219} = require('./index');
const max = new MAX7219(din, clk, cs, devices);

const data = new Uint8Array([
//  device-0    device-1    device-2    device-3 
  0b00000000, 0b00000000, 0b00000000, 0b00000000, // row1
  0b01100110, 0b00000000, 0b00011000, 0b01000010, // row2
  0b11111111, 0b00100100, 0b00100100, 0b00100100, // row3
  0b11111111, 0b00000000, 0b01000010, 0b00011000, // row4
  0b01111110, 0b01000010, 0b01111110, 0b00011000, // row5
  0b00111100, 0b00111100, 0b01000010, 0b00100100, // row6
  0b00011000, 0b00000000, 0b01000010, 0b01000010, // row7
  0b00000000, 0b00000000, 0b00000000, 0b00000000  // row8
]);

max.setup();
max.write(data);
