export default async function handler(req, res) {
    const pokemon = req.body;
    if (req.method === 'POST') {
        const jsonObject = req.body;
        const pokemonNames = [jsonObject.pokemon1, jsonObject.pokemon2];
        let baseStats = [0, 0];
        // fetching pokemon base stats.
        for (let i = 0; i < 2; i++) {
            try { 
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`);
                if (response.ok) {
                    const data = await response.json();
                    baseStats[i] = data.stats.reduce((sum, currentBaseStatObject) => sum + currentBaseStatObject.base_stat, 0);
                } else {
                    res.status(response.status).send();
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send();
                return;
            }
        }
        console.log(pokemonNames);
        console.log(baseStats);
        // checking which has a higher base stat
        if (baseStats[0] > baseStats[1]) {
            res.status(200).send(pokemonNames[0]);
        } else if (baseStats[1] > baseStats[0]) {
            res.status(200).send(pokemonNames[1]);
        } else {
            res.status(200).send("Tie!")
        }
    }
}