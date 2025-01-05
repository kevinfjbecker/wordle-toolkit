import * as fs from 'fs'

///////////////////////////////////////////////////////////////////////////////

const wordsFileContent = fs.readFileSync('possible_words.txt').toString()
const words = wordsFileContent.split('\n')

///////////////////////////////////////////////////////////////////////////////

const information = JSON.parse(fs.readFileSync('info.json'))

///////////////////////////////////////////////////////////////////////////////

const contains = (c) => (s) => s.includes(c)
const excluded = (c) => (s) => ! s.includes(c)
const characterAt = (c, i) => (s) => s[i] === c
const noCharacterAt = (c, i) => (s) => s[i] !== c

///////////////////////////////////////////////////////////////////////////////

let filteredWords = words.slice()
const includedLetters = []
for(const { guess, response } of information)
{
    /*
     * Need to check for included letters first
     */
    const orderedIndices = Object.entries(response)
        .toSorted((a, b) => +b[1] - +a[1])
        .map(a => +a[0])
    for(const i of orderedIndices)
    {
        if(response[i] === '0')
        {
            if(includedLetters.includes(guess[i]))
            {
                filteredWords = filteredWords.filter(noCharacterAt(guess[i]))
            }
            else
            {
                filteredWords = filteredWords.filter(excluded(guess[i]))
            }
        }
        if(response[i] === '1')
        {
            if(!includedLetters.includes(guess[i]))
            {
                includedLetters.push(guess[i])
            }
            filteredWords = filteredWords.filter(noCharacterAt(guess[i], i))
            filteredWords = filteredWords.filter(contains(guess[i]))
            
        }
        if(response[i] === '2')
        {
            if(!includedLetters.includes(guess[i]))
            {
                includedLetters.push(guess[i])
            }
            filteredWords = filteredWords.filter(characterAt(guess[i], i))
            filteredWords = filteredWords.filter(contains(guess[i]))
        }
    }
}

///////////////////////////////////////////////////////////////////////////////

if(filteredWords.length > 1)
{
    console.log(`There are ${filteredWords.length} possible words`)
    console.log(`The possible words are ${filteredWords}`)
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
