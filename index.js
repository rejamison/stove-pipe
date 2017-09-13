process = require('process');
chalk = require('chalk');

var count = 0;
function draw() {
	var out = process.stdout;
	out.moveCursor(0,-2);
	out.clearLine();
	out.write('' + Date.now() + '\n');
	out.clearLine();
	out.write(chalk.rgb(count, count, count)('' + count + '\n'));
	count += 1; 
}

process.stdout.write('\n\n');
setInterval(draw, 100);
