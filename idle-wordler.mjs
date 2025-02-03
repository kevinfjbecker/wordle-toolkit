import * as fs from 'fs'
import { argv } from 'process'

import { getHighLetterFrequencyWords } from './letter-counts.mjs'
import { getMask } from './guess-response.mjs'
import { getFilteredWords } from './word-list-filter.mjs'

///////////////////////////////////////////////////////////////////////////////

const wordsFileContent = fs.readFileSync('allowed_words.txt').toString()
const words = wordsFileContent
    .split('\n')
    .map(w => w.trim())
    .filter(w => !! w)

///////////////////////////////////////////////////////////////////////////////

let answer

if(argv.length > 2 && argv[2] === '-a' && argv[3]?.length === 5)
{
    answer = argv[3]

    // debug
    // argv.forEach((val, index) => {
    //     console.log(`${index}: ${val}`);
    // });
}
else
{
    answer = words[Math.floor(Math.random() * words.length)]
}

///////////////////////////////////////////////////////////////////////////////

console.log(answer)

const information = []

let filteredWords = words

for(let i = 1; i <= 6; i++)
{
    filteredWords = getFilteredWords(filteredWords, information)

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
