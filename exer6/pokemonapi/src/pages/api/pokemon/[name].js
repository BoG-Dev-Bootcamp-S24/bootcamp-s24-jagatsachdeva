export default async function handler(req, res) {
    const pokemonName = req.query.name;
    try { 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (response.ok) {
            const data = await response.json();
            let types = data.types.map(typeObject => typeObject.type.name);
            const returnObject = {
                "name": data.name,
                "sprite": data.sprites.front_default,
                "type": types,
            }
            res.status(200).json(returnObject);
        } else {
            res.status(response.status).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}