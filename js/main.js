"use strict"

const pokedex = document.getElementById("pokedex");

// iterating 1-150 of the pokemon and pushing each one to empty array named promises
const getPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
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
    const html = pokemon
        .map((pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join("");
    pokedex.innerHTML = html;
};

getPokemon();





