const MAX7219_TEST = 0x0f;
const MAX7219_BRIGHTNESS = 0x0a;
const MAX7219_SCANLIMIT = 0x0b;
const MAX7219_DECODEMODE = 0x09;
const MAX7219_SHUTDOWN = 0x0c;

class MAX7219 {
  constructor(din, clk, cs, devices) {
    this.din = din;
    this.clk = clk;
    this.cs = cs;
    this.devices = devices || 1;
  }

  setup() {
    pinMode(this.cs, OUTPUT);
    pinMode(this.clk, OUTPUT);
    pinMode(this.din, OUTPUT);
    digitalWrite(this.cs, HIGH);
    this.cmd(MAX7219_DECODEMODE, 0x00);
    this.cmd(MAX7219_BRIGHTNESS, 0x0f);
    this.cmd(MAX7219_SCANLIMIT, 0x07);
    this.cmd(MAX7219_SHUTDOWN, 0x01);
    this.cmd(MAX7219_TEST, 0x00);
    this.clear();
  }

  transfer(addr, data) {
    for (var i = 0; i < 8; i++) {
      digitalWrite(this.clk, LOW);
      digitalWrite(this.din, addr & 0x80);
      addr = addr << 1;
      digitalWrite(this.clk, HIGH);
    }
    for (var j = 0; j < 8; j++) {
      digitalWrite(this.clk, LOW);
      digitalWrite(this.din, data & 0x80);
      data = data << 1;
      digitalWrite(this.clk, HIGH);
    }
  }

  cmd(op, data) {
    digitalWrite(this.cs, LOW);
    for (var d = 0; d < this.devices; d++) {
      this.transfer(op, data);
    }
    digitalWrite(this.cs, HIGH);
  }

  write(data) {
    for (var r = 0; r < 8; r++) {
      digitalWrite(this.cs, LOW);
      for (var d = 0; d < this.devices; d++) {
        this.transfer(r + 1, data[r * this.devices + d]);
      }
      digitalWrite(this.cs, HIGH);
    }
  }

  clear() {
    var buf = new Uint8Array(this.devices * 8);
    buf.fill(0);
    this.write(buf);
  }

  on() {
    this.cmd(MAX7219_SHUTDOWN, 1);
  }

  off() {
    this.cmd(MAX7219_SHUTDOWN, 0);
  }

  setScanLimit(limit) {
    this.cmd(MAX7219_SCANLIMIT, limit);
  }

  setIntensity(intensity) {
    this.cmd(MAX7219_BRIGHTNESS, intensity);
  }

  setTestMode(mode) {
    this.cmd(MAX7219_TEST, mode ? HIGH : LOW);
  }
}

exports.MAX7219 = MAX7219;
