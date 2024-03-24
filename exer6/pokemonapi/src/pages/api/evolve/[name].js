export default async function handler(req, res) {
    const pokemonName = req.query.name;
    try { 
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        if (speciesResponse.ok) {
            const speciesData = await speciesResponse.json();
            const evolutionChainUrl = speciesData.evolution_chain.url;
            const evolutionChainJson = await fetch(evolutionChainUrl);
            if (evolutionChainJson.ok) {
                const evolutionChainData = await evolutionChainJson.json();
                let currentObject = evolutionChainData.chain;
                let currentName = currentObject.species.name;
                while (true) {
                    if (pokemonName === currentName) {
                        break;
                    }
                    if (currentObject.evolves_to.length === 0) {
                        break;
                    }
                    currentObject = currentObject.evolves_to[0];
                    currentName = currentObject.species.name;
                }
                if (currentObject.evolves_to.length !== 0) {
                    const nextPokemonName = currentObject.evolves_to[0].species.name;
                    res.status(200).send(nextPokemonName);
                } else {
                    res.status(200).send(pokemonName);
                }
            } else {
                console.error(`Error fetching evolution chain data for ${pokemonName}.`);
                res.status(500).send();
            }
        } else {
            console.error(`Error fetching species details for ${pokemonName}.`);
            res.status(500).send();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}