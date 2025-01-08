
export const getBasicLetterFequency = (words) =>
{
    const counts = {}

    for(const w of words)
    {
        for(const c of w)
        {
            counts[c] = counts[c] ? counts[c] + 1 : 1
        }
    }

    return counts
}

export const getLetterFrequecyByPosition = (words) =>
{
    const positionLetterCount = []

    for(const word of words)
    {
        for(let i = 0; i < 5; i++)
        {
            const letter = word[i]
            if(positionLetterCount[i] === undefined)
            {
                positionLetterCount[i] = [{letter, count: 1}]
            }
            else if( ! positionLetterCount[i].find(plc =>
                plc.letter === letter
            ))
            {
                positionLetterCount[i].push({letter, count: 1})
            }
            else
            {
                const plc = positionLetterCount[i].find(plc =>
                    plc.letter === letter
                )
                plc.count++
            }
    
        }
    }

    return positionLetterCount
}

export const getHighLetterFrequencyWords = (words) =>
{
    const positionLetterCount = getLetterFrequecyByPosition(words)

    return words.map(word =>
    {
        let cumulativeLetterCount = 0
        for(let i = 0; i < 5; i++)
        {
            const letter = word[i]
        
            cumulativeLetterCount += positionLetterCount[i].find(plc =>
                plc.letter === letter
            ).count
        }
        return { word, cumulativeLetterCount }
    })
}