import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getReports() {
  const file = readFileSync(path.join(__dirname, 'input.txt'), {
    encoding: 'utf-8',
  });

  const reports = file
    .split('\n')
    .map((report) => report.split(' ').map((entry) => Number(entry)));

  return reports;
}

function analyzeReport(list: number[], asc = false) {
  for (let i = 0; i < list.length - 1; i++) {
    const difference = Math.abs(list[i] - list[i + 1]);
    if (asc && (list[i] < list[i + 1] || difference === 0)) {
      return false;
    } else if (!asc && (list[i] > list[i + 1] || difference === 0)) {
      return false;
    } else if (difference > 3) {
      return false;
    }
  }

  return true;
}

function analyzeReportWithDampener(list: number[], asc = false) {
	let problemCount = 0;
  for (let i = 0; i < list.length - 1; i++) {
    const difference = Math.abs(list[i] - list[i + 1]);
    if (asc && (list[i] < list[i + 1] || difference === 0)) {
      problemCount++;
    } else if (!asc && (list[i] > list[i + 1] || difference === 0)) {
      problemCount++;
    } else if (difference > 3) {
      problemCount++;
    }
  }

	
  return problemCount <= 1;
}

function part_one() {
  const reports = getReports();

  const safeCount = reports.reduce(
    (prev, curr) =>
      prev + Number(analyzeReport(curr, false) || analyzeReport(curr, true)),
    0
  );

  return safeCount;
}

function part_two() {
	const reports = getReports();

	const safeCount = reports.reduce(
		(prev, curr) =>
			prev + Number(analyzeReportWithDampener(curr, false) || analyzeReportWithDampener(curr, true)),
		0
	);

	return safeCount;
}

function main() {
  console.log(part_one());
	console.log(part_two());
}

main();
