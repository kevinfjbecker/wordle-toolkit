
import * as fs from 'fs'
import { getFilteredWords } from './word-list-filter.mjs'

///////////////////////////////////////////////////////////////////////////////

const wordsFileContent = fs.readFileSync('possible_words.txt').toString()
const words = wordsFileContent
    .split('\n')
    .map(w => w.trim())
    .filter(w => !! w)

///////////////////////////////////////////////////////////////////////////////

const information = JSON.parse(fs.readFileSync('info.json'))

const filteredWords = getFilteredWords(words, information)

///////////////////////////////////////////////////////////////////////////////

if(filteredWords.length > 1)
{
    console.log(`There are ${filteredWords.length} possible words`)
    console.log('The possible words are', filteredWords)
}
if(filteredWords.length === 1)
{
    console.log(`There is ${filteredWords.length} possible word`)
    console.log(`The word is ${filteredWords}`)
}
if(filteredWords.length === 0)
{
    console.log('There are no possible words')
}
