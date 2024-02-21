export const PokemonIdentifiers = ( {dexNumber, data, setDexNumber} ) => {
    
    const colorOfType = (type) => {
        let color = null;
        const types = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
        const hexColors = ["A8A77A", "EE8130", "6390F0", "F7D02C", "7AC74C", "96D9D6", "C22E28", "A33EA1", "E2BF65", "A98FF3", "F95587", "A6B91A", "B6A136", "735797", "6F35FC", "705746", "B7B7CE", "D685AD"];
        for (let i = 0; i < types.length; i++) {
            if (type === types[i]) {
                color = hexColors[i];
                break;
            }
        }
        return (color);
    }
    
    const renderTypes = () => {
        if (data && data.types) {
            return (data.types.map((currentType, index) => (
                <p key={index} id="singleType" style={{ backgroundColor: `#${colorOfType(currentType.type.name)}` }}>{ currentType.type.name }</p>

            )))
        } else {
            return null;
        }
    }

    return ( 
        <div id="firstHalf">
            <div id="PokemonIdentifiersContainer">
                    <img id="pokemonImage" src={ data && data.sprites && data.sprites["front_default"] }></img>
                    <p id="pokemonName">{ data && data.species && data.species.name }</p>
                    <p id="typesText">Types:</p>
                    <div id="typesList">{ renderTypes() }</div>
                    <div id="nextPokemonButtons">
                        <button onClick={ () => {if (dexNumber !== 1) {setDexNumber(dexNumber - 1)}}}
                            >{ '<' }</button>
                        <button onClick={ () => {setDexNumber(dexNumber + 1)}}>{ '>' }</button>
                    </div>
            </div>
        </div>
    );
}