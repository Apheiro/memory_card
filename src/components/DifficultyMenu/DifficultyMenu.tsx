import './DifficultyMenu.css'
import React from 'react'
// import { React } from 'react'


interface Props {
    setDifficulty: React.Dispatch<React.SetStateAction<number>>;
}

export default function DifficultyMenu({ setDifficulty }: Props) {

    function difficulty(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setDifficulty(e.currentTarget.dataset.difficulty != undefined ? parseInt(e.currentTarget.dataset.difficulty) : 0)
    }

    return (
        <section className='difficultyMenu'>
            <div>
                <h1>CHOOSE YOUR DIFICULTY</h1>
            </div>
            <div className='btnsContainer'>
                <button className='btnDefault easy' data-difficulty='10' onClick={difficulty}>EASY</button>
                <button className='btnDefault normal' data-difficulty='20' onClick={difficulty}>NORMAL</button>
                <button className='btnDefault hard' data-difficulty='30' onClick={difficulty}>HARD</button>
            </div>

        </section>
    )
}