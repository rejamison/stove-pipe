process = require('process');
chalk = require('chalk');

function hsvToRgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return new RGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

function RGB(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

function Canvas() {
    this.buffer = [
        [new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255)],
        [new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255)],
        [new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255)],
        [new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255)],
        [new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255)],
        [new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255),new RGB(255,255,255)]
    ];

    this.drawToConsole = function() {
        var out = process.stdout;
        var rowCount = this.buffer.length;

        out.moveCursor(0,-rowCount);
        for(var x = 0; x < rowCount; x++) {
            out.clearLine();
            for(var y = 0; y < this.buffer[x].length; y++) {
                out.write(chalk.bgRgb(this.buffer[x][y].r, this.buffer[x][y].g, this.buffer[x][y].b)(' '));
            }
            out.write('\n');
        }
    };

    var counter = 0;
    this.rotatingRainbow = function() {
        for(var x = 0; x < this.buffer.length; x++) {
            for(var y = 0; y < this.buffer[x].length; y++) {
                var hue = (y / 16) + (counter / 80);
                buffer[x][y] = hsvToRgb(hue, 1, 1);
            }
        }
        counter++;
    };

    this.oneFrame = function() {
        this.rotatingRainbow();
        this.drawToConsole();
    };

    // fire it up
    for(var x = 0; x < this.buffer.length; x++) {
        process.stdout.write('\n');
    }
    setInterval(this.oneFrame.bind(this), 100);
}

var canvas = Canvas();
