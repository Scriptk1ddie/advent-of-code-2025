import { readFile } from 'node:fs/promises';
const data = await readFile('day-5-input.txt', { encoding: 'utf8' });

// Split into lines
const lines = data.split(/\r?\n/);

// Find the blank line that separates the two sections
const blankLineIndex = lines.findIndex(line => line.trim() === "");

// Everything before is ranges
const freshRangeLines = lines.slice(0, blankLineIndex);

// Everything after is ingredient IDs (skip empty lines just in case)
const ingredientIdLines = lines.slice(blankLineIndex + 1).filter(l => l.trim() !== "");
const partOne = () => {
var count = 0;

for (let i = 0; i < ingredientIdLines.length; i++) {
    const id = Number(ingredientIdLines[i]);

    for (let r = 0; r < freshRangeLines.length; r++) {
        let [start, end] = freshRangeLines[r].split("-").map(Number);

        if (id >= start && id <= end) {
            count++;
            break;
        }
    }
}

console.log("Count:", count);
}

const partTwo = () => {
    // Parse the ranges
  const ranges = [];
  for (let r = 0; r < freshRangeLines.length; r++) {
    const [start, end] = freshRangeLines[r].split("-").map(Number);
    ranges.push([start, end]);
  }

  // Sort ranges by start value
  ranges.sort((a, b) => a[0] - b[0]);

  // Merge overlapping ranges
  const merged = [];
  let [curStart, curEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    if (start <= curEnd + 1) {
      // Overlap → extend the current range
      curEnd = Math.max(curEnd, end);
    } else {
      // No overlap → push current and reset
      merged.push([curStart, curEnd]);
      [curStart, curEnd] = ranges[i];
    }
  }

  // Push the final merged range
  merged.push([curStart, curEnd]);

  // Count all IDs in merged ranges
  let total = 0;
  for (const [start, end] of merged) {
    total += end - start + 1;
  }

  return total;
}

console.log(partTwo());  // → 14