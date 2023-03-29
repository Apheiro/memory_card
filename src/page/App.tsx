import './App.css';
import StartMenu from '../components/StartMenu/StartMenu';
import DifficultyMenu from '../components/DifficultyMenu/DifficultyMenu';
import Game from '../components/Game/Game';
import { useState, useEffect } from 'react'
import useStateCC from '../hooks/useStateCC';
import { FaGithubAlt } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { ButtonAnimation } from '../components/Animations/AnimationLayout';
import { Rings } from 'react-loader-spinner'

interface Character {
  id: number,
  image: string,
  name: string,
  publisher: string,
  picked: boolean
}

function App() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [showGame, setShowGame] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [characters, setCharacters] = useStateCC<Character[]>([]);

  function getUrls(max?: number, excludeID: number[] = []): string[] {
    const maxNum: number = max !== undefined ? max : 0;
    let charactersUrl: string[] = [];
    for (let i: number = 0; i < maxNum; i++) {
      let randomID: number;
      do { randomID = Math.round(Math.random() * 731); }
      while (charactersUrl.includes(`https://www.superheroapi.com/api.php/1614328315682782/${randomID}`) || excludeID.includes(randomID))
      charactersUrl.push(`https://www.superheroapi.com/api.php/1614328315682782/${randomID}`);
    }
    return charactersUrl
  }

  function fillCharacters(max: number, excludedID: number[] = [], allCharactersSaved: Character[] = []): void {
    const Urls: string[] = getUrls(max, excludedID);
    const allCharacters = Promise.all(Urls.map(async (url: string) => {
      const characterInfoRequest: Response = await fetch(url);
      const characterInfoJson: any = await characterInfoRequest.json();
      return {
        id: parseInt(characterInfoJson.id),
        image: characterInfoJson.image.url,
        name: characterInfoJson.name,
        publisher: characterInfoJson.biography.publisher,
        picked: false
      } as Character;
    }));

    allCharacters.then(characters => {
      const promises = characters.map((char: Character) => {
        return new Promise<Character>((resolve, reject) => {
          const img = new Image();
          img.src = char.image;
          img.onload = () => resolve(char)
          img.onerror = () => reject(char)
        })
      })
      const allImgLoadPromise = Promise.allSettled(promises)

      allImgLoadPromise.then(charPromResults => {
        let allCharNoImg = charPromResults
          .filter((char): char is PromiseRejectedResult => char.status === 'rejected')
          .map((chars) => chars.reason as Character)
        if (allCharNoImg.length !== 0) {
          const maxNumberOfNewCharacters: number = allCharNoImg.length;
          const excludedID: number[] = allCharNoImg.map(char => char.id);
          allCharNoImg.forEach((char) => {
            const charIndex: number = characters.findIndex(c => c === char);
            characters.splice(charIndex, 1);
          })
          const allCharacters = [...allCharactersSaved, ...characters]
          fillCharacters(maxNumberOfNewCharacters, excludedID, allCharacters);
        } else {
          const allCharacters = [...allCharactersSaved, ...characters];
          setCharacters(allCharacters, () => {
            setDifficulty(0);
            setShowGame(true);
            setLoad(false);
          });
        }
      })

    });

  }

  useEffect(() => {
    if (difficulty !== 0) {
      setLoad(true);
      fillCharacters(difficulty)
    }
  }, [difficulty])


  return (
    <div className="App">
      <AnimatePresence mode={'wait'}>
        {showGame && <Game characters={characters} setShowGame={setShowGame} />}
        {load && <Rings
          height="80"
          width="80"
          color="#ECCCFF"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />}
        {startGame && !showGame && !load && <DifficultyMenu setDifficulty={setDifficulty} startGame={startGame} key='difficultyMenu' />}
        {!startGame && <StartMenu setStartGame={setStartGame} key='startGameMenu' />}
      </AnimatePresence>
      <motion.a {...ButtonAnimation} href='https://github.com/Apheiro/memory_card' className='githubBtn'><FaGithubAlt /></motion.a>
    </div>
  );
}

export default App;
