const [x1, y1] = [6, 6]

const [x2, y2] = [5, 5]

const [x3, y3] = [4, 4]

const [x4, y4] = [2, 2]

const MAX = 10

const DOT = ' \x1b[34m*\x1b[0m '
const VOID = ' - '

let print = ''
let row = ''
let col = ''
let firstRow = ' \x1b[32m0\x1b[0m '

for (let i = 0; i <= MAX; i++) {
    for (let j = 0; j <= MAX; j++) {

        if (x1 == j && y1 == i) {
            print = DOT
        } else if (x2 == j && y2 == i) {
            print = DOT
        } else if (x3 == j && y3 == i) {
            print = DOT
        } else if (x4 == j && y4 == i) {
            print = DOT
        } else {
            print = VOID
        }

        if (j === 0) {
            row = ' \x1b[32m' + ((i < 10) ? ' ' + i + '  ' : ' ' + i + ' ') + '\x1b[0m';
        }

        if (i === 0) {
            firstRow = firstRow + '\x1b[32m' + ((j === 0) ? '  ' + j + ' ' : ' ' + j + ' ') + '\x1b[0m';
        }

        row = row + print
    }

    col = row + '\r\n' + col
    row = ''
}


console.log(col + ' ' + firstRow)