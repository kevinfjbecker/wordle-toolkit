# Wordle Toolkit

A lightweight tool that reads a JSON file with guesses and responses and returns possible solutions for a Wordle.wo

## How to run it

prerequisite: [node.js](https://nodejs.org/)

1. Copy and rename sample_info.json to info.json
2. From the terminal run ```node main.js```

## info.json

This is an array of objects. The objects have two fields ```guess``` and ```response```

``` JSON
{
    "guess": "funny",
    "response": "01102"
}
```

The ```respons``` corresponds to the colors marking in the letters guessed in a Wordle game.

* 0: black -- not contained in the word
* 1: yellow -- contained but misplaced
* 2: green -- in its correct position

## Wordlists

The current wordlist is from 3Blue1Brown's [repo](https://github.com/3b1b/videos/tree/master/_2022/wordle) for this YouTube [video](https://youtu.be/v68zYyaEmEA?si=wYEDLIBAhUynWeQz)

The the initial [word list](https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt) came from Donald Knuth's [GraphBase](https://www-cs-faculty.stanford.edu/~knuth/sgb.html) page, but it didn't have "cyber".
