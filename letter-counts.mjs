import { count } from 'console'
import * as fs from 'fs'

const wordsFileContent = fs.readFileSync('sgb-words.txt').toString()

const words = wordsFileContent.split('\n')

const counts = {}

for(const w of words)
{
    for(const c of w)
    {
        counts[c] = counts[c] ? counts[c] + 1 : 1
    }
}


console.table(Object.entries(counts).sort((a, b) => a[0] > b[0] ? 1 : -1))

console.table(Object.entries(counts).sort((a, b) => b[1] - a[1]))