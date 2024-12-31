import * as fs from 'fs'

const wordsFileContent = fs.readFileSync('sgb-words.txt').toString()

const words = wordsFileContent.split('\n')

const lettersContained = ''
const lettersExcluded = ''

const contains = (c) => (s) => s.includes(c)
const excluded = (c) => (s) => ! s.includes(c)

let filteredWords = words.slice()
for(const c of lettersContained)
{
    filteredWords = filteredWords.filter(contains(c))
}
for(const c of lettersExcluded)
{
    filteredWords = filteredWords.filter(excluded(c))
}
console.log(`There are ${filteredWords.length} possible words`)
console.log(`The possible words are ${filteredWords}`)

// let entropyWords = words.slice()
// for(const c of lettersContained.concat(lettersExcluded))
// {
//     entropyWords = entropyWords.filter(excluded(c))
// }
// console.log(`There are ${entropyWords.length} entropy words`)
// console.log(`The entropy words are ${entropyWords}`)