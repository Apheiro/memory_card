import './Game.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { DefaultDeserializer } from 'v8'

interface Character {
    id: number,
    image: string,
    name: string
}

interface Props {
    characters: Character[]
}

export default function Game({ characters }: Props) {

    const [charactersIndexRound, setCharactersIndexRound] = useState<number[]>([]);
    const [characterPicked, setCharacterPicked] = useState<number[]>([]);

    function getRandomIndex(char: Character[]): number {
        return Math.floor(Math.random() * char.length);
    }

    function pickRandomCharacters(maxIndex: number, charactersSaved: number[] = []): void {
        if (maxIndex == 0) {
            setCharactersIndexRound(charactersSaved)
        } else {
            let randomIndex: number = getRandomIndex(characters)
            if (charactersSaved.includes(randomIndex)) {
                console.log(charactersSaved)
                console.log('hay uno repetido')
                pickRandomCharacters(maxIndex, charactersSaved)
            } else {
                pickRandomCharacters(maxIndex - 1, charactersSaved.concat(randomIndex))
            }

        }
    }

    function pickImage(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        console.log(parseInt(e.currentTarget.id))
    }

    useEffect(() => {
        pickRandomCharacters(4)
    }, [])

    return (
        <section className='game'>
            <div className='counter'>
                <h1>0/10</h1>
            </div>
            <button onClick={() => console.log(charactersIndexRound)}>Test</button>
            <div className='cards'>

                {
                    charactersIndexRound.map((charIndex, index) => {
                        return (
                            <div className='card' onClick={pickImage} id={`${characters[charIndex].id}`} key={index}>
                                <img src={characters[charIndex].image} alt={characters[charIndex].name} />
                            </div>
                        )
                    })
                }

            </div>

        </section>
    )
}