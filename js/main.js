"use strict"

// iterating 1-150 of the pokemon and pushing each one to empty array named promises
const getPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const apiUrl = `https://pokeapi.co/api/v2/${i}`;
        promises.push(fetch(apiUrl).then(res => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
}

const displayPokemon = (pokemon) => {

}





