
import * as fs from 'fs'

import
{
    getBasicLetterFequency,
    getLetterFrequecyByPosition,
    getHighLetterFrequencyWords
}
from './letter-counts.mjs'

const wordsFileContent = fs.readFileSync('allowed_words.txt').toString()

const words = wordsFileContent.split('\n')

////////////////////////////////////////////////////// basic letter freqency //

const counts = getBasicLetterFequency(words)

console.table(Object.entries(counts).sort((a, b) => a[0] > b[0] ? 1 : -1))

console.table(Object.entries(counts).sort((a, b) => b[1] - a[1]))

//////////////////////////////////////////////// letter frequecy by position //

const positionLetterCount = getLetterFrequecyByPosition(words)

// console.log(positionLetterCount.map(a => a.sort((a, b) => a.letter < b.letter ? -1 : 1)))

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const freqencyTable = alphabet.map(letter => [
    letter,
    positionLetterCount[0].find(plc => plc.letter === letter)?.count ?? 0,
    positionLetterCount[1].find(plc => plc.letter === letter)?.count ?? 0,
    positionLetterCount[2].find(plc => plc.letter === letter)?.count ?? 0,
    positionLetterCount[3].find(plc => plc.letter === letter)?.count ?? 0,
    positionLetterCount[4].find(plc => plc.letter === letter)?.count ?? 0,
])

console.table(freqencyTable)

const pivotFreqencyTable = [ {}, {}, {}, {}, {} ]
for(let i = 0; i < 5; i++)
{
    for(let j = 0; j < freqencyTable.length; j++)
    {
        pivotFreqencyTable[i][freqencyTable[j][0]] = freqencyTable[j][i+1]
    }
}

console.table(pivotFreqencyTable)

//////////////////////////////////////////////// high letter frequency words //

const highLetterFrequencyWords = getHighLetterFrequencyWords(words)

highLetterFrequencyWords.sort((a,b) => b.cumulativeLetterCount - a.cumulativeLetterCount)
console.table(highLetterFrequencyWords.slice(0, 10))
