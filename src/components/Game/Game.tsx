import './Game.css'
import React from 'react'
import { useState, useEffect } from 'react'
import useStateCC from '../../hooks/useStateCC';

interface Character {
    id: number,
    image: string,
    name: string,
    picked: boolean
}

interface Props {
    characters: Character[]
}

export default function Game({ characters }: Props) {

    const [charactersRound, setCharactersRound] = useStateCC<Character[]>([]);
    // const [characterPicked, setCharacterPicked] = useStateCC<number[]>([]);
    const [round, setRound] = useStateCC<number>(0);

    function getRandomIndex(char: Character[]): number {
        return Math.floor(Math.random() * char.length);
    }

    function pickRandomCharactersIndex(maxIndex: number, charactersSaved: Character[] = []): void {
        if (maxIndex == 0) {
            setCharactersRound(charactersSaved);
        } else {
            let randomIndex = getRandomIndex(characters)
            const charactersSavedArray: Character[] = charactersSaved;
            while (charactersSaved.includes(characters[randomIndex])) { randomIndex = getRandomIndex(characters); }
            charactersSavedArray.push(characters[randomIndex]);
            charactersSavedArray.every(char => char.picked == true) ?
                setCharactersRound([], () => { pickRandomCharactersIndex(4) }) :
                pickRandomCharactersIndex(maxIndex - 1, charactersSavedArray);
        }
    }


    function selectCharactersInRound(maxIndex: number): void {
        setCharactersRound([], () => {
            setRound(round + 1, () => { pickRandomCharactersIndex(maxIndex) })
        })
    }

    function pickCard(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        const id: number = parseInt(e.currentTarget.id)
        const characterPicked: Character | undefined = characters.find(char => char.id === id)

        if (characterPicked?.picked == true) {
            alert('You already picked this character')
        } else {
            if (characterPicked) characterPicked.picked = true
            characters.every(char => char.picked == true) ?
                alert('you win!') :
                selectCharactersInRound(4)
        }
    }

    useEffect(() => {
        selectCharactersInRound(4)
    }, [])

    return (
        <section className='game'>
            <div className='counter'>
                <h1>{round}/{characters.length}</h1>
            </div>
            <button onClick={() => {

                console.log('characters Index Round : ' + charactersRound)
                console.log(characters)
                console.log(charactersRound)


            }}>Test</button>
            <div className='cards'>

                {
                    charactersRound.map((char) => {
                        return (
                            <div className='card' onClick={pickCard} id={`${char.id}`} key={char.id}>
                                <img src={char.image} alt={char.name} />
                            </div>
                        )
                    })
                }

            </div>
        </section>
    )
}






// old function
// function pickRandomCharactersIndex(maxIndex: number, charactersSaved: number[] = []): void {
//     // if (maxIndex == 0) {
//     //     setCharactersIndexRound(charactersSaved)
//     // } else {
//     //     let randomIndex: number = getRandomIndex(characters)
//     //     while (charactersSaved.includes(randomIndex) || maxIndex === 1 && characterPicked.includes(characters[randomIndex].id)) { randomIndex = getRandomIndex(characters) }

//     //     // charactersSaved.includes(randomIndex) ?
//     //     //     pickRandomCharactersIndex(maxIndex, charactersSaved) :
//     //     // maxIndex === 1 && characterPicked.includes(characters[randomIndex].id) ?
//     //     //      pickRandomCharactersIndex(maxIndex, charactersSaved) :
//     //     // round === characters.length ? alert('you win!') : pickRandomCharactersIndex(maxIndex, charactersSaved) :
//     //     pickRandomCharactersIndex(maxIndex - 1, charactersSaved.concat(randomIndex))
//     // }
// }


// function pickRandomCharactersIndex(maxIndex: number, charactersSaved: number[] = []): void {
//     if (maxIndex == 0) {
//         setCharactersIndexRound(charactersSaved)
//     } else {
//         let randomIndex;
//         do {
//             randomIndex = getRandomIndex(characters)
//         }
//         while (
//             maxIndex === 1 && // que sea el ultimo por buscar
//             characterPicked.includes(characters[randomIndex].id) && // que no se repita en los pickeados
//             charactersSaved.includes(randomIndex) // que no este guardado entre los que se mostraran
//             ||
//             charactersSaved.includes(randomIndex) // que no se repita entre los que se muestran
//         )
//         pickRandomCharactersIndex(maxIndex - 1, charactersSaved.concat(randomIndex))
//     }
// }