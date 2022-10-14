import './App.css';
import React, {useState, useEffect, useRef} from "react"; 
import Card from './Components/Card.js';

function App() {
  const POKEMON = 905;
  const CARD_COUNT = 16;
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 
  const [pokemons, setPokemons] = useState([]);
  const [alreadyClicked, setAlreadyClicked] = useState(new Set());

  // on mount 
  useEffect(() => { 
    let random;
    let startingCards = []; 

    for (let i = 0; i < CARD_COUNT; i++) 
    { 
      random = Math.floor(Math.random() * POKEMON) + 1;
      while (startingCards.includes(random))
        random = Math.floor(Math.random() * POKEMON) + 1;

      startingCards.push(random);
    }
    setPokemons(startingCards);
  }, [])

  function handleScore(pokemon) { 
    if (alreadyClicked.has(pokemon)) {
      setCurrentScore(0); 
      setAlreadyClicked(new Set()); 
      return false;
    } else { 
      setCurrentScore(currentScore + 1); 
      setHighScore(Math.max(highScore, currentScore + 1));
      return true
    }
  }

  function deleteFromPokemonCards(pokemon) { 
    let copy = [];
    for (let p of pokemons)  { 
      if (p != pokemon) copy.push(p)
    }
    return copy;
  }
  
  function addToAlreadyClicked(pokemon) { 
    let copy = new Set(alreadyClicked); 
    copy.add(pokemon); 
    setAlreadyClicked(copy);
  }

  function addNewPokemon(pokemonArray) { 
    let newPokemon = Math.floor(Math.random() * POKEMON) + 1; 
    while (pokemonArray.includes(newPokemon))
      newPokemon = Math.floor(Math.random() * POKEMON) + 1;
    pokemonArray.push(newPokemon);
  }

  function clickCard(pokemon) { 
    let clickedNewPokemon = handleScore(pokemon); 

    let copy = deleteFromPokemonCards(pokemon);
    addNewPokemon(copy);
    setPokemons(copy);

    if (clickedNewPokemon) 
      addToAlreadyClicked(pokemon);
  }

  return (
    <div className="App">
      <h1>High score: {highScore}</h1>
      <h3>Score: {currentScore}</h3>
      <div className="columns"> 
        <div className="column">
        {
          pokemons.slice(0, 4).map((pokemon) => (
            <Card click={() => clickCard(pokemon)} pokemon={pokemon}> </Card>
          ))
        }    
        </div>

        <div className="column"> 
        {
          pokemons.slice(4, 8).map((pokemon) => (
            <Card key={pokemon} click={() => clickCard(pokemon)} pokemon={pokemon}> </Card>
          ))
        }  
        </div> 

        <div className="column"> 
        {
          pokemons.slice(8, 12).map((pokemon) => (
            <Card key={pokemon} click={() => clickCard(pokemon)} pokemon={pokemon}> </Card>
          ))
        }  
        </div>

        <div className="column"> 
        {
          pokemons.slice(12, 16).map((pokemon) => (
            <Card key={pokemon} click={() => clickCard(pokemon)} pokemon={pokemon}> </Card>
          ))
        }  
        </div>   
      </div>

    </div>
  );
}

export default App;
