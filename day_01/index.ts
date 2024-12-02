import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getOccurences<T>(list: T[], target: T) {
  let count = 0;
  list.forEach((element) => (element === target ? count++ : null));

  return count;
}

function getLists(): [number[], number[]] {
  const file = readFileSync(path.join(__dirname, 'input.txt'), {
    encoding: 'utf-8',
  });

  const leftList: number[] = [];
  const rightList: number[] = [];

  file.split('\n').forEach((entry) => {
    const [left, right] = entry.split('   ');
    leftList.push(Number(left));
    rightList.push(Number(right));
  });

  return [leftList, rightList];
}

function part_one() {
  const [leftList, rightList] = getLists();

  leftList.sort();
  rightList.sort();

  // assuming left and right are equal length
  const totalDistance = leftList.reduce(
    (prev, curr, idx) => prev + Math.abs(curr - rightList[idx]),
    0
  );

  return totalDistance;
}

function part_two() {
  const [leftList, rightList] = getLists();

  const similarityScore = leftList.reduce(
    (prev, curr) => prev + curr * getOccurences(rightList, curr),
    0
  );

  return similarityScore;
}

function main() {
  console.log(part_one()); // 1941353
  console.log(part_two()); // 22539317
}

main();
