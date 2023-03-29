import './DifficultyMenu.css'
import React from 'react'
import { InOut } from '../Animations/InOut'
import { motion } from 'framer-motion'
import { ButtonAnimation } from '../Animations/AnimationLayout';



interface Props {
    setDifficulty: React.Dispatch<React.SetStateAction<number>>,
    startGame: boolean
}

export default function DifficultyMenu({ setDifficulty, startGame }: Props) {

    function difficulty(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setDifficulty(e.currentTarget.dataset.difficulty != undefined ? parseInt(e.currentTarget.dataset.difficulty) : 0)
    }

    return (
        <section className='difficultyMenu'>
            <motion.div {...InOut}>
                <h1>CHOOSE YOUR DIFICULTY</h1>
            </motion.div>
            <div className='btnsContainer'>
                <motion.button {...ButtonAnimation} className='btnDefault easy' data-difficulty='10' onClick={difficulty}>EASY</motion.button>
                <motion.button {...ButtonAnimation} className='btnDefault normal' data-difficulty='20' onClick={difficulty}>NORMAL</motion.button>
                <motion.button {...ButtonAnimation} className='btnDefault hard' data-difficulty='30' onClick={difficulty}>HARD</motion.button>
            </div>

        </section>

    )
}