import { readFile } from 'node:fs/promises';
const data = await readFile('day-2-input.txt', { encoding: 'utf8' });

function isEvenLength(n) {
    return n.toString().length % 2 === 0;
}

function isRepeated(n) {
    let s = n.toString();
    let L = s.length;

    for (let l = 1; l <= L/2; l++) { // try every possible sequence length
        if (L % l !== 0) continue; // must divide evenly
        let seq = s.substring(0, l);
        let repeated = seq.repeat(L / l); // repeat the sequence
        if (repeated === s) return true; // it's repeated
    }
    return false;
}

let total = 0;
const inputSplit = data.split(",");

for (let range of inputSplit) {
    const [start, end] = range.split("-").map(Number);
    for (let i = start; i <= end; i++) {

        /*if (isEvenLength(i)) {
            let s = i.toString();
            let j = s.substring(0, s.length / 2);
            let k = s.substring(s.length / 2);
            if (j === k) total += i;
        }*/
       if (isRepeated(i)) {
            total += i;
        }
    }
}

console.log(total);