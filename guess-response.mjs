
export const getMask = (answer, guess) =>
{
    // console.log(answer)
    // console.log(guess)

    const matches = [...answer].map((c, i) => guess[i] === c ? 2 : 0)

    // console.log(matches)

    const unmatchedAnswerLetters = [...answer].filter((_, i) => matches[i] !== 2)

    // console.log(unmatchedAnswerLetters)

    for(let i = 0; i < guess.length; i++)
    {
        // console.log(guess[i])

        if(matches[i] === 2) continue

        if(unmatchedAnswerLetters.includes(guess[i]))
        {
            matches[i] = 1

            // console.log(`The index of ${guess[i]} in ${unmatchedAnswerLetters} is ${unmatchedAnswerLetters.indexOf(guess[i])}`)
            
            const includedLetterIndex = unmatchedAnswerLetters.indexOf(guess[i])
            unmatchedAnswerLetters.splice(includedLetterIndex, 1)
        }
    }
    return matches.join('')
}
