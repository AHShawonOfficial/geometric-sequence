const readline = require('readline/promises');
const {stdin:input, stdout:output} = require('process');

async function main(
  base = 0,
  multiplyBy = 0,
  printInterval = 0,
  exponent = 0n,
) {
  if (!base) {
		const rl = readline.createInterface({input, output});
    
    base = Number(
      await rl.question('Enter the starting value(must be a number)\nDefault: 1\nKeep empty for default.\n')
    ) || 1;

		rl.close();
  }

  if (!multiplyBy) {
    const rl = readline.createInterface({input, output});
    
		multiplyBy = Number(
      await rl.question('Enter the multiplication value(must be a number)\nDefault: 2\nKeep empty for default.\n')
    ) || 2;

		rl.close();
	}

  if (!printInterval) {
    const rl = readline.createInterface({input, output});
    
    printInterval = Number(
      await rl.question('Enter the interval between prints in milliseconds(must be a number)\nDefault: 500\n Keep empty for default.\n')
    ) || 500;

		rl.close();
  }
  
  if(base >= 999999999999999999999 || (exponent >0n && base >= 10) ){
    const [b,e] = convertBaseToExp(base, exponent);

    base = b;
    exponent = e;
  }
  
  console.log(base + (exponent > 0n ? "e+" + exponent.toString():""));
  
  const nxtVal = base * multiplyBy;
  
  setTimeout(()=>{
    main(nxtVal, multiplyBy, printInterval, exponent);
  }, printInterval);
}

function convertBaseToExp(base, exponent){
  if(base >= 10){
    base /= 10;
    exponent += 1n;
  }

  if(base >= 10) {
    return convertBaseToExp(base, exponent);
  } else {
    return [base, exponent];
  }
}

main();
