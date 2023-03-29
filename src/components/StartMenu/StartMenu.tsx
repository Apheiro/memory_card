import './StartMenu.css'
import { motion } from 'framer-motion'
import { ButtonAnimation, InOut } from '../Animations/AnimationLayout';
import { useEffect } from 'react';

interface Props {
    setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StartMenu({ setStartGame }: Props) {
    return (
        <motion.section
            className='startMenu'>
            <motion.div {...InOut}>
                <h1><span className='superH'>SUPER HEROES</span> AND <span className='superV'>VILLAINS</span></h1>
                <h2>MEMORY CARD GAME</h2>
            </motion.div>
            <motion.button {...ButtonAnimation} className='btnDefault' onClick={() => { setStartGame(true) }}>
                START GAME
            </motion.button>
        </motion.section>

    )
}