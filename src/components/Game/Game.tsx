import './Game.css'
import React from 'react'
import { useEffect } from 'react'
import { GrRefresh } from 'react-icons/gr'
import { ButtonAnimation, Cards, InOut } from '../Animations/AnimationLayout';
import { motion } from 'framer-motion'
import useStateCC from '../../hooks/useStateCC';

interface Character {
    id: number,
    image: string,
    name: string,
    publisher: string,
    picked: boolean
}

interface Props {
    characters: Character[],
    setShowGame: (show: boolean) => void
}

export default function Game({ characters, setShowGame }: Props) {
    const [charactersRound, setCharactersRound] = useStateCC<Character[]>([]);
    const [round, setRound] = useStateCC<number>(0);
    const [gameOver, setGameOver] = useStateCC<boolean>(false);

    function getRandomIndex(charLenght: number): number {
        return Math.floor(Math.random() * charLenght);
    }

    function pickRandomCharactersIndex(maxIndex: number, charactersSaved: Character[] = []): void {
        if (maxIndex === 0) {
            charactersSaved.every(char => char.picked === true) ?
                pickRandomCharactersIndex(4) :
                setCharactersRound(charactersSaved);
        } else {
            let randomIndex: number;
            do { randomIndex = getRandomIndex(characters.length); }
            while (charactersSaved.includes(characters[randomIndex]))
            charactersSaved.push(characters[randomIndex]);
            pickRandomCharactersIndex(maxIndex - 1, charactersSaved);
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

        if (characterPicked?.picked === true) {
            setGameOver(true)
        } else {
            if (characterPicked) characterPicked.picked = true
            characters.every(char => char.picked === true) ?
                setGameOver(true) :
                selectCharactersInRound(4)
        }
    }

    function restartGame(): void {
        setGameOver(false)
        setRound(1, () => {
            characters.forEach(char => char.picked = false)
            pickRandomCharactersIndex(4)
        })
    }

    useEffect(() => {
        selectCharactersInRound(4)
        // eslint-disable-next-line
    }, [])


    return (
        <section className='game'>
            {gameOver ?
                <>
                    {characters.every(char => char.picked === true) ?
                        <motion.h1 {...InOut}>YOU <span style={{ color: '#D7FFB8' }}>WON</span></motion.h1> :
                        <motion.h1 {...InOut}>YOU <span style={{ color: '#FFA6A6' }}>LOST</span></motion.h1>
                    }
                    <div className='OptionsBtns'>
                        <motion.button {...ButtonAnimation} className='btnDefault refreshBtn' onClick={restartGame}><GrRefresh /></motion.button>
                        <motion.button {...ButtonAnimation} className='btnDefault' onClick={() => setShowGame(false)}>CHOOSE DIFFICULTY</motion.button>
                    </div>
                </ >
                :
                <>
                    <motion.div {...InOut} className='counter'>
                        <h1>{round}/{characters.length}</h1>
                    </motion.div>
                    <div className='cards'>
                        {
                            charactersRound.map((char) => {
                                return (
                                    <motion.div {...Cards} className='card' onClick={pickCard} id={`${char.id}`} key={char.id}>
                                        <div className='boxShadow'></div>
                                        <div className='hoverInfo'>
                                            <p className='characterName'>{char.name}</p>
                                            <span className='line'></span>
                                            <p className='publisher'>{char.publisher}</p>
                                        </div>
                                        <img className='imgCard' src={char.image} alt={char.name} />
                                    </motion.div>
                                )
                            })
                        }
                    </div>
                    <div className='OptionsBtns btnsInGame'>
                        <motion.button {...ButtonAnimation} className='btnDefault refreshBtn' onClick={restartGame}><GrRefresh /></motion.button>
                        <motion.button {...ButtonAnimation} className='btnDefault' onClick={() => setShowGame(false)}>CHOOSE DIFFICULTY</motion.button>
                    </div>
                </>
            }
        </section>
    )
}