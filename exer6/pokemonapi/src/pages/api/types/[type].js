export default async function handler(req, res) {
    const type = req.query.type;
    console.log(type);
    try { 
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if (response.ok) {
            const data = await response.json();
            const returnArray = [];
            for (let currentPokemonObject of data.pokemon) {
                const currentPokemonName = currentPokemonObject.pokemon.name;
                const currentPokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`);
                if (currentPokemonData.ok) {
                    const pokemonDetails = await currentPokemonData.json();
                    const types = pokemonDetails.types.map(typeObject => typeObject.type.name);
                    const returnObject = {
                        "name": currentPokemonName,
                        "sprite": pokemonDetails.sprites.front_default,
                        "type": types,
                    };
                    returnArray.push(returnObject);
                } else {
                    console.error(`Error fetching details for ${currentPokemonName}: ${currentPokemonData.statusText}`);
                }
            }
            res.status(200).json(returnArray);
        } else {
            res.status(response.status).send();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}