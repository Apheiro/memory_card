import './DifficultyMenu.css'
import React from 'react'
// import { React } from 'react'


interface Props {
    getDifficultyFn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function DifficultyMenu({ getDifficultyFn }: Props) {

    return (
        <section className='difficultyMenu'>
            <div>
                <h1>CHOOSE YOUR DIFICULTY</h1>
            </div>
            <div className='btnsContainer'>
                <button className='btnDefault' id='d1' onClick={getDifficultyFn}>EASY</button>
                <button className='btnDefault' id='d2' onClick={getDifficultyFn}>NORMAL</button>
                <button className='btnDefault' id='d3' onClick={getDifficultyFn}>HARD</button>
            </div>

        </section>
    )
}