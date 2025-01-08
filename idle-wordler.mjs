import * as fs from 'fs'

import { getHighLetterFrequencyWords } from './letter-counts.mjs'
import { getMask } from './guess-response.mjs'
import { getFilteredWords } from './word-list-filter.mjs'

///////////////////////////////////////////////////////////////////////////////

const wordsFileContent = fs.readFileSync('allowed_words.txt').toString()
const words = wordsFileContent.split('\n').filter(w => !! w)

///////////////////////////////////////////////////////////////////////////////

const answer = words[Math.floor(Math.random() * words.length)]

console.log(answer)

const information = []

let filteredWords = words

for(let i = 1; i <= 6; i++)
{
    filteredWords = getFilteredWords(words, information)
    
    const guess = getHighLetterFrequencyWords(filteredWords)
        .toSorted((a,b) => b.cumulativeLetterCount - a.cumulativeLetterCount)
        [0].word
    
    const response = getMask(answer, guess)
    
    information.push({guess, response})

    console.log(`(${i}) ${guess} - ${response} [${filteredWords.length} possible guesses]`)
    
    if(response === '22222')
    {
        console.log('\nWinner-winner, chicken dinner!')
        break
    }
    
}

if(information[information.length - 1].response !== '22222')
{
    console.log('\nDoh!')
}
