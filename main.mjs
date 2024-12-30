import * as fs from 'fs'

const wordsFileContent = fs.readFileSync('sgb-words.txt').toString()

const words = wordsFileContent.split('\n')

const lettersContained = 'amo'
const lettersExcluded = 'ertyuisgjklcn'

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

console.log(`There are ${filteredWords.length} filterd words`)
// console.log(`The words are ${filteredWords}`)