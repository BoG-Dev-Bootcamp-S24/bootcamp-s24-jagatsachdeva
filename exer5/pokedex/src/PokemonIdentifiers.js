export const PokemonIdentifiers = ( {dexNumber, data, setDexNumber} ) => {
    
    const renderTypes = () => {
        if (data && data.types) {
            return (data.types.map((currentType, index) => (
                <p key={index} id="singleType">{ currentType.type.name }</p>
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