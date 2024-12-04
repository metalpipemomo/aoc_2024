import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function day_one() {
  const file = readFileSync(path.join(__dirname, 'input.txt'), {
    encoding: 'utf-8',
  });

  const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/gs;
  let res: RegExpExecArray | null;
  let count = 0;
  while ((res = regex.exec(file)) !== null) {
    const [match, leftNumber, rightNumber] = res;
    count += Number(leftNumber) * Number(rightNumber);
  }

  return count;
}

function day_two() {
  const file = readFileSync(path.join(__dirname, 'input.txt'), {
    encoding: 'utf-8',
  });

  const regex = /(?:mul\(([0-9]{1,3}),([0-9]{1,3})\)|do(?:n't)?\(\))/gs;
  let res: RegExpExecArray | null;
  let count = 0;
  let shouldAdd = true;
  while ((res = regex.exec(file)) !== null) {
    const [match, leftNumber, rightNumber] = res;
    if (match === 'do()') {
      shouldAdd = true;
    } else if (match === "don't()") {
      shouldAdd = false;
    } else {
      count += shouldAdd ? Number(leftNumber) * Number(rightNumber) : 0;
    }
  }

  return count;
}

(() => {
  console.log(day_one());
  console.log(day_two());
})();
