function Card(props) { 
  let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon}.png`

  return( 
    <div onClick={props.click} className="pokemonCard"> 
      <img src={url} />
    </div>
  )
}
export default Card