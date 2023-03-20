import './App.css';
import StartMenu from '../components/StartMenu/StartMenu';
import DifficultyMenu from '../components/DifficultyMenu/DifficultyMenu';
import Game from '../components/Game/Game';
import { useState, useEffect } from 'react'

interface Character {
  id: number,
  image: string,
  name: string
}

function App() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>('d0');
  const [showGame, setShowGame] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);

  function startGameFn(): void {
    setStartGame(true);
  }

  function getDifficultyFn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    setDifficulty(e.currentTarget.id);
  }

  async function fillCharacters(max: number): Promise<void> {
    try {
      for (let i: number = 0; i < max; i++) {
        const randomID: number = Math.round(Math.random() * 731);
        const characterInfoRequest: Response = await fetch(`https://www.superheroapi.com/api.php/1614328315682782/${randomID}`);
        const characterInfoJson: any = await characterInfoRequest.json()
        const character: Character = {
          id: parseInt(characterInfoJson.id),
          image: characterInfoJson.image.url,
          name: characterInfoJson.name
        }
        setCharacters((prevState) => [...prevState, character])
      }
    } catch (error) {
      console.log(error)
    }
  }

  function getCharacters(): void {
    if (difficulty === 'd1') {
      fillCharacters(10).then(() => setShowGame(true));
    } else if (difficulty === 'd2') {
      fillCharacters(20).then(() => setShowGame(true));
    } else if (difficulty === 'd3') {
      fillCharacters(30).then(() => setShowGame(true));
    }
  }

  useEffect(() => {
    console.log(difficulty);
    getCharacters();
  }, [difficulty])
  useEffect(() => {
    console.log(characters);
  }, [characters])

  return (
    <div className="App">
      {
        showGame ?
          <Game characters={characters} /> :
          startGame ?
            <DifficultyMenu getDifficultyFn={getDifficultyFn} /> :
            <StartMenu startGameFn={startGameFn} />
      }
    </div>
  );
}

export default App;
