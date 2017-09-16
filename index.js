var process = require('process');
var chalk = require('chalk');
var OPC = require('./opc');

var FRAME_RATE = 15;
var font = [
    "  X   XXXX   XXXX XXX   XXXXX XXXXX  XXX  X   X  XXX      X X  X  X     X   X X   X  XXX  XXXX   XXX  XXXX   XXX  XXXXX X   X X   X X   X X   X X   X XXXXX ",
    " X X  X   X X     X  X  X     X     X   X X   X   X       X X X   X     XX XX XX  X X   X X   X X   X X   X XX      X   X   X X   X X   X  X X   X X     X  ",
    "XXXXX XXXX  X     X   X XXX   XXX   X     XXXXX   X       X XX    X     X X X X X X X   X XXXX  X   X XXXX   XX     X   X   X  X X  X X X   X     X     X   ",
    "X   X X   X X     X  X  X     X     X  XX X   X   X   X   X X X   X     X   X X  XX X   X X     X  XX X  X     XX   X   X   X   X   XX XX  X X    X    X    ",
    "X   X XXXX   XXXX XXX   XXXXX X      XXX  X   X  XXX   XXX  X  X  XXXXX X   X X   X  XXX  X      XXXX X   X  XXX    X    XXX    X    X X  X   X   X   XXXXX "
];

var client = new OPC('stove-pipe.local', 7890);

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
    ];

    this.animation = new Rain();
    this.frameCounter = 0;
    this.height = this.buffer.length;
    this.width = this.buffer[0].length;

    this.initialize = function() {
        // spit out some newlines for rendering to the console
        for(var x = 0; x < this.height; x++) {
            process.stdout.write('\n');
        }
        this.animation.initialize(this);
    }

    this.run = function() {
        this.oneFrame();
    }

    this.pushToConsole = function() {
        var out = process.stdout;
        var rowCount = this.buffer.length;

        out.moveCursor(0,-rowCount);
        for(var y = 0; y < rowCount; y++) {
            out.clearLine();
            for(var x = 0; x < this.buffer[y].length; x++) {
                out.write(chalk.bgRgb(this.buffer[y][x].r, this.buffer[y][x].g, this.buffer[y][x].b)('  '));
            }
            out.write('\n');
        }
    };

    this.pushToFadeCandy = function() {
        for(var y = 0; y < this.buffer.length; y++) {
            for(var x = 0; x < this.buffer[y].length; x++) {
                client.setPixel((y * this.buffer[y].length) + x, this.buffer[y][x].g, this.buffer[y][x].r, this.buffer[y][x].b);
            }
        }
        client.writePixels();
    }

    this.fillBuffer = function(color) {
        for(var x = 0; x < this.buffer.length; x++) {
            for(var y = 0; y < this.buffer[x].length; y++) {
                this.buffer[x][y] = color;
            }
        }
    };

    this.drawPixel = function(x, y, color) {
        if(y >= 0 && y < this.height && x >= 0 && x < this.width) {
            this.buffer[y][x] = color;
        }
    }

    this.drawString = function(text, xOffset, yOffset, color) {
        for(var i = 0; i < text.length; i++) {
            var charCode = text.charCodeAt(i);
            if(charCode >= 65 && charCode <= 90) {
                charCode -= 65;
            } else if(charCode >= 97 && charCode <= 122) {
                charCode -= 97;
            } else {
                continue;
            }

            for(var x = 0; x < 6; x++) {
                for(var y = 0; y < this.height; y++) {
                    if(font[y][x + (charCode * 6)] != ' ') {
                        this.drawPixel(x + (i * 6) + xOffset, y + yOffset, color);
                    }
                }
            }
        }
    };

    this.oneFrame = function() {
        if((this.frameCounter % 200) === 0) {
            //var dice = Math.floor(Math.random() * 8);
            var dice = 8;
            switch(dice) {
                case 0:
                    this.animation = new Collider();
                    break;
                case 1:
                    this.animation = new PulsingPixels();
                    break;
                case 2:
                    this.animation = new RotatingRainbow();
                    break;
                case 3:
                    this.animation = new Equalizer();
                    break;
                case 4:
                    this.animation = new GrowingLine();
                    break;
                case 5:
                    this.animation = new RacingDot();
                    break;
                case 6:
                    this.animation = new ScrollingText('MAKING');
                    break;
                case 7:
                    this.animation = new Rain();
                    break;
                case 8:
                    this.animation = new Fireworks();
                    break;
            }
            this.animation.initialize(this);
        }

        this.animation.update(this);
        // this.pushToFadeCandy();
        this.pushToConsole();

        var millisToNextFrame = (1000 / FRAME_RATE) - (Date.now() % (1000 / FRAME_RATE));
        setTimeout(this.oneFrame.bind(this), millisToNextFrame);
        this.frameCounter += 1;
    };
}

var canvas = new Canvas();
canvas.initialize();
canvas.run();

function PulsingPixels() {
    this.TTL = 5;
    this.pixels = [];

    this.initialize = function(canvas) {

    }

    this.update = function(canvas) {
        if(this.pixels.length < 20) {
            this.pixels.push({
                ttl: this.TTL,
                h: Math.random(),
                s: 1,
                v: 0,
                x: Math.floor(Math.random() * 16),
                y: Math.floor(Math.random() * 6)
            });
            this.pixels.push({
                ttl: this.TTL,
                h: Math.random(),
                s: 1,
                v: 0,
                x: Math.floor(Math.random() * 16),
                y: Math.floor(Math.random() * 6)
            });
        }

        canvas.fillBuffer(new RGB(0,0,0));

        for(var i = 0; i < this.pixels.length; i++) {
            var p = this.pixels[i];
            canvas.drawPixel(p.x, p.y, hsvToRgb(p.h, p.s, p.v));
            p.ttl--;
            p.v += 1.0 / this.TTL;
            if(p.ttl <= 0) {
                this.pixels.splice(i, 1);
                i--;
            }
        }
    }
}

function RotatingRainbow() {
    this.counter = 0;

    this.initialize = function(canvas) {

    }

    this.update = function(canvas) {
        for(var y = 0; y < canvas.height; y++) {
            for(var x = 0; x < canvas.width; x++) {
                var hue = ((y + x) / 16) + (this.counter / 16);
                canvas.drawPixel(x, y, hsvToRgb(hue, 1, 1));
            }
        }
        this.counter++;
    }
}

function ScrollingText(text) {
    this.counter = 16;  // to put the text off screen initially
    this.text = text;

    this.initialize = function(canvas) {
        canvas.fillBuffer(new RGB(0,0,0));
    }

    this.update = function(canvas) {
        canvas.fillBuffer(new RGB(0,0,0));
        canvas.drawString(this.text, this.counter, 0, new RGB(255, 0, 0));
        this.counter--;
        if(this.counter < (this.text.length * -6)) {
            this.counter = 16;
        }
    }
}

function GrowingLine() {
    this.counter = 0;

    this.initialize = function(canvas) {
        canvas.fillBuffer(new RGB(0,0,0));
    }

    this.update = function(canvas) {
        if(this.counter >= (canvas.height * canvas.width)) {
            canvas.fillBuffer(new RGB(0,0,0));
            this.counter = 0;
        }
        canvas.drawPixel(this.counter % 16, Math.floor(this.counter / 16), new RGB(0,0,255));
        this.counter++;
    }
}

function RacingDot() {
    this.counter = 0;

    this.initialize = function(canvas) {
        canvas.fillBuffer(new RGB(0,0,0));
    }

    this.update = function(canvas) {
        canvas.fillBuffer(new RGB(0,0,0));
        canvas.drawPixel(this.counter % 16, Math.floor(this.counter / 16), new RGB(255,0,0));
        this.counter++;
    }
}

function Equalizer() {
    this.counter = 0;
    this.bars = [];
    this.hue = 240 / 360;

    this.initialize = function(canvas) {
        this.hue += 20 / 360;
        this.counter = 0;
        this.bars = [];
        for(var i = 0; i < canvas.width; i++) {
            this.bars.push({
                max: Math.floor((Math.random() * canvas.height) + 1),
                h: this.hue
            });
        }
        canvas.fillBuffer(new RGB(0,0,0));
    };

    this.update = function(canvas) {
        if(this.counter > 8) {
            this.initialize(canvas);
        }

        this.counter++;
        for(var x = 0; x < canvas.width; x++) {
            var bar = this.bars[x];
            var bar_height = Math.floor((this.counter / 8) * bar.max);
            for(var y = 0; y < bar_height; y++) {
                canvas.drawPixel(x, canvas.height - y, hsvToRgb(bar.h, 1, y / canvas.height));
            }
        }
    }
}

function Rain() {
    this.pixels = [];
    this.hue = 0;

    this.initialize = function(canvas) {

    }

    this.update = function(canvas) {
        if(this.pixels.length < 16) {
            var count = Math.floor(Math.random() * 3);
            for(var i = 0; i < count; i++) {
                this.pixels.push({
                    h: this.hue,
                    x: Math.floor(Math.random() * 16),
                    y: 0
                });
                this.hue += .02;
            }
        }

        canvas.fillBuffer(new RGB(0,0,0));

        for(var i = 0; i < this.pixels.length; i++) {
            var p = this.pixels[i];
            canvas.drawPixel(p.x, p.y, hsvToRgb(p.h, 1, (p.y + 1) / canvas.height));
            p.y++;
            if(p.y >= canvas.height) {
                this.pixels.splice(i, 1);
                i--;
            }
        }
    }
}

function Collider() {
    this.partA;
    this.partB;
    this.sparks = [];

    this.initialize = function(canvas) {
        this.partA = {
            x: 0,
            y: 0,
            h: Math.random()
        };
        this.partB = {
            x: canvas.width - 1,
            y: canvas.height - 1,
            h: Math.random()
        }
    }

    this.update = function(canvas) {
        canvas.fillBuffer(new RGB(0,0,0));
        canvas.drawPixel(this.partA.x, this.partA.y, hsvToRgb(this.partA.h, 0, 1));
        canvas.drawPixel(this.partB.x, this.partB.y, hsvToRgb(this.partB.h, 0, 1));

        for(var i = 0; i < this.sparks.length; i++) {
            var spark = this.sparks[i];
            canvas.drawPixel(Math.round(spark.x), Math.round(spark.y), hsvToRgb(spark.h, 1, spark.ttl / 7));
        }

        if((this.partA.y === this.partB.y) && (Math.abs(this.partA.x - this.partB.x) <= 1)) {
            this.initialize(canvas);

            var hue = Math.random();
            for(var i = 0; i < 10; i++) {
                var sparkHue = hue + (Math.random() * .05) - .025;
                this.sparks.push({
                    x: (canvas.width / 2) + Math.floor(Math.random() * 3) - 1,
                    y: (canvas.height / 2) + Math.floor(Math.random() * 3) - 1,
                    h: sparkHue,
                    deltaX: (Math.random() * 2) - 1,
                    deltaY: (Math.random() * 2) - 1,
                    ttl: 7
                });
            }
        } else {
            this.partA.x++;
            if(this.partA.x >= canvas.width) {
                this.partA.x = 0;
                this.partA.y++;
            }
            this.partB.x--;
            if(this.partB.x < 0) {
                this.partB.x = canvas.width - 1;
                this.partB.y--;
            }
            for(var i = 0; i < this.sparks.length; i++) {
                var spark = this.sparks[i];
                spark.x += spark.deltaX;
                spark.y += spark.deltaY;
                spark.ttl--;

                if(spark.ttl <= 0) {
                    this.sparks.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

function Fireworks() {
    this.sparks = [];

    this.initialize = function(canvas) {

    }

    this.update = function(canvas) {
        if(this.sparks.length < 5) {
            var hue = Math.random();
            var x = Math.floor(Math.random() * 14) + 1;
            for(var i = 0; i < 10; i++) {
                var life = 8 + Math.floor(Math.random() * 5) - 1;
                var sparkHue = hue + (Math.random() * .05) - .025;
                if(sparkHue >= 1) {
                    sparkHue -= 1;
                }
                this.sparks.push({
                    x: x,
                    y: (canvas.height / 2) - 1,
                    h: sparkHue,
                    deltaX: (Math.random() * 3) - 1,
                    deltaY: (Math.random() * 3) - 1,
                    life: life,
                    ttl: life
                });
            }
        }
        canvas.fillBuffer(new RGB(0,0,0));

        for(var i = 0; i < this.sparks.length; i++) {
            var spark = this.sparks[i];
            canvas.drawPixel(Math.round(spark.x), Math.round(spark.y), hsvToRgb(spark.h, 1, spark.ttl / spark.life));
        }

        var hue = Math.random();
        for(var i = 0; i < this.sparks.length; i++) {
            var spark = this.sparks[i];
            spark.x += spark.deltaX;
            spark.y += spark.deltaY;
            spark.deltaY += .25;
            spark.ttl--;

            if(spark.ttl <= 0) {
                this.sparks.splice(i, 1);
                i--;
            }
        }
    }
}

