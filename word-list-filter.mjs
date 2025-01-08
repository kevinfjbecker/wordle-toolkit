
export const getFilteredWords = (words, information) =>
{

    let filteredWords = words.slice()
    const includedLetters = []
    for(const { guess, response } of information)
    {

        /**
         * Need to check for included letters first
         */
        const orderedIndices = Object
            .entries(response)
            .toSorted((a, b) => +b[1] - +a[1])
            .map(a => +a[0])

        for(const i of orderedIndices)
        {
            if(response[i] === '0')
            {
                if(includedLetters.includes(guess[i]))
                {
                    filteredWords =
                        filteredWords.filter(noCharacterAt(guess[i]))
                }
                else
                {
                    filteredWords =
                        filteredWords.filter(excluded(guess[i]))
                }
            }
            if(response[i] === '1')
            {
                if( ! includedLetters.includes(guess[i]))
                {
                    includedLetters.push(guess[i])
                }

                filteredWords =
                    filteredWords.filter(noCharacterAt(guess[i], i))

                filteredWords =
                    filteredWords.filter(contains(guess[i]))
            }
            if(response[i] === '2')
            {
                if(!includedLetters.includes(guess[i]))
                {
                    includedLetters.push(guess[i])
                }

                filteredWords =
                    filteredWords.filter(characterAt(guess[i], i))

                filteredWords =
                    filteredWords.filter(contains(guess[i]))
            }
        }
    }

    return filteredWords
}

const contains = (c) => (s) => s.includes(c)
const excluded = (c) => (s) => ! s.includes(c)
const characterAt = (c, i) => (s) => s[i] === c
const noCharacterAt = (c, i) => (s) => s[i] !== c
