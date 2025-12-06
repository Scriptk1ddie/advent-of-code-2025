import { readFile } from 'node:fs/promises';
const data = await readFile('day-4-input.txt', { encoding: 'utf8' });

    const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];


const inputSplit = data.split(/\r?\n/).filter(line => line.length > 0);

const partOne = () => {
    let rows = inputSplit.length;
    let cols = inputSplit[0].length;

    let accessible = 0;
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            if(inputSplit[r][c] != '@') continue

            let count = 0;
            for(const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if(nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    if(inputSplit[nr][nc] === '@') {
                        count++;
                    }
                }
            }

            if (count < 4) {
                accessible++;
            }
        }
    }
    console.log(accessible)
}
const partTwo = () => {
  const grid = inputSplit.map(line => line.split(""));
  const rows = grid.length;
  const cols = grid[0].length;

  let totalRemoved = 0;
  let changed = true;

  while (changed) {
    changed = false;
    const toRemove = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] !== '@') continue;

        let count = 0;

        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;

          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (grid[nr][nc] === '@') count++;
          }
        }

        if (count < 4) {
          toRemove.push([r, c]);
        }
      }
    }

    if (toRemove.length > 0) {
      changed = true;
      for (const [r, c] of toRemove) {
        grid[r][c] = 'x';
      }
      totalRemoved += toRemove.length;
    }
  }

  console.log(totalRemoved);
};
partOne();
partTwo();