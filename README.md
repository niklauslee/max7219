# MAX7219

A library for MAX7219/MAX7221 (LED matrix).

# Wiring

Here is a wiring example with MAX7219 with 8x8 LED matrix.

| Raspberry Pi Pico | MAX7219 |
| ----------------- | ------- |
| 3V3               | VCC     |
| GND               | GND     |
| GP19              | DIN     |
| GP18              | CLK     |
| GP16              | CS      |

![wiring](https://github.com/niklauslee/max7219/blob/main/images/wiring.jpg?raw=true)

# Install

```sh
npm install https://github.com/niklauslee/max7219
```




# Usage

Here is an example:

```js
const din = 19;
const clk = 18;
const cs = 16;

const {MAX7219} = require('max7219');
const max = new MAX7219(din, clk, cs);
max.setup();

// heart icon
const data = new Uint8Array([
  0b00000000,
  0b01100110,
  0b11111111,
  0b11111111,
  0b01111110,
  0b00111100,
  0b00011000,
  0b00000000,
]);

// show heart
max.write(data);
```

If you have multiple devices connected by daisy chaining, please note that the last device of the chain is the first device as shown in the below diagram.

```
         device 0     device 1             device n
         +------+     +------+             +------+
         |      |     |      |             |      | 
DATA <-- |      | <-- |      | <-- ... <-- |      | <-- DATA 
         |      |     |      |             |      | 
         +------+     +------+             +------+
```

So you can control the multiple devices as below.

```js
const clk = 18;
const cs = 16;
const devices = 4;

const {MAX7219} = require('max7219');
const max = new MAX7219(din, clk, cs, devices);

const data = new Uint8Array([
//  device-0    device-1    device-2    device-3
//   (heart)     (smile)         (A)         (X)
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
```

# API

## Class: MAX7219

### new MAX7219(din, clk, cs[, devices])

- **`din`** `<number>` The pin number for DIN.
- **`clk`** `<number>` The pin number for CLK.
- **`cs`** `<number>` The pin number for CS.
- **`devices`** `<number>` The number of devices connected by chaining. Default: `1`.

### setup()

Initialize the device.

### write(data)

- **`data`** `<Uint8Array>` Data to be sent.

Send the data to the device. The length of data should be `8 * this.devices`. For example, if you have only one 8x8 LED matrix, the data length should be `8`. If you have 4 devices, data should have `32` elements. The elements should be ordered as below:

- `data[0]` : row 1 of device 0.
- `data[1]` : row 2 of device 0.
- ...
- `data[7]` : row 8 of device 0.
- `data[8]` : row 1 of device 1.
- `data[9]` : row 2 of device 1.
- ...
- `data[15]` : row 8 of device 1.
- `data[16]` : row 1 of device 2.
- `data[17]` : row 2 of device 2.
- ...

### clear()

Clear the device. Set all LEDs to off.

### on()

Turn on the device.

### off()

Turn off the device.

### setScanLimit(limit)

- **`limit`** `<number>`

Set the scan limit (`0` ~ `7`). Default is `7`.

### setIntensity(intensity)

- **`intensity`** `<number>`

Set the brightness of the LEDs (`0` ~ `15`).

### setTestMode(mode)

- **`mode`** `<boolean>`

Set the test mode. Turn on all LEDs if true, otherwise turn off all LEDs.
