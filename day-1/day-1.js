import { readFile } from 'node:fs/promises';
const data = await readFile('day-1-input.txt', { encoding: 'utf8' });

function wrap(n) {
  return ((n % 100) + 100) % 100;
}

function countZeroHits(start, delta) {
    const end = start + delta;
    if (delta > 0) {
        // positive direction
        const from = start + 1;
        const to = end;

        const firstK = Math.ceil(from / 100);
        const lastK = Math.floor(to / 100);

        return Math.max(0, lastK - firstK + 1);
    } else {
        // negative direction
        const from = start - 1;
        const to = end;

        const firstK = Math.floor(from / 100);
        const lastK = Math.ceil(to / 100);

        return Math.max(0, firstK - lastK + 1);
    }
}

var dial = 50;
var pointAtNull = 0;

const inputSplit = data.split("\n").filter(x => x.trim() !== "");

for (let line of inputSplit) {
    const dir = line[0];
    const amount = parseInt(line.slice(1));
    const delta = dir === "R" ? amount : -amount;

    pointAtNull += countZeroHits(dial, delta);

    dial = wrap(dial + delta);
}

console.log(pointAtNull);