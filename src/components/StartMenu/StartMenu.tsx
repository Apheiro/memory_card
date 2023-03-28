import './StartMenu.css'

interface Props {
    setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StartMenu({ setStartGame }: Props) {

    return (
        <section className='startMenu'>
            <div>
                <h1><span className='superH'>SUPER HEROES</span> AND <span className='superV'>VILLAINS</span></h1>
                <h2>MEMORY CARD GAME</h2>
            </div>

            <button className='btnDefault' onClick={() => { setStartGame(true) }}>START GAME</button>
        </section>
    )
}