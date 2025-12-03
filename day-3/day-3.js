import { readFile } from 'node:fs/promises';
const data = await readFile('day-3-input.txt', { encoding: 'utf8' });



const inputSplit = data.split(/\r?\n/)
function partOne() {
    var totalJoules = 0;
    for (let i in inputSplit) {
        const digits = [...inputSplit[i]].map(Number);

        let best = -1;
        let maxLeft = -1;

        for (const d of digits) {
            if (maxLeft !== -1) {
                const joltage = maxLeft * 10 + d;
                if (joltage > best) best = joltage;
            }

            if (d > maxLeft) maxLeft = d;
        }
        totalJoules += best;
    }
    console.log("Part One: ", totalJoules)
}
partOne()

function partTwo() {
    var totalJoules = 0;
    for (let j in inputSplit) {
        const K = 12;
        const digits = [...inputSplit[j]].map(Number);
        const n = digits.length;

        const stack = [];
        let removals = n - K;

        for (const d of digits) {
            while (removals > 0 && stack.length > 0 && stack[stack.length - 1] < d) {
                stack.pop();
                removals--;
            }
            stack.push(d);
        }

        totalJoules += Number(stack.slice(0, K).join(''));
    }
    console.log("Part Two: ",totalJoules)
}
partTwo()