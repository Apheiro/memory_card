import './StartMenu.css'

interface Props {
    startGameFn: () => void;
}

export default function StartMenu({ startGameFn }: Props) {

    return (
        <section className='startMenu'>
            <div>
                <h1><span className='superH'>SUPER HEROES</span> AND <span className='superV'>VILLAINS</span></h1>
                <h2>MEMORY CARD GAME</h2>
            </div>

            <button className='btnDefault' onClick={startGameFn}>START GAME</button>
        </section>
    )
}