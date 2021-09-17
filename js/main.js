"use strict"

const pokedex = $("#pokedex");
const userSearch = $("#user-search");
const searchBtn = $("#search-btn");
let pokemonCharacters = [];

$(document).ready(() => {
    $('#pokedex').html('loading...');
})

userSearch.keyup((e) => {
    const searchString = e.target.value;
    console.log(searchString)
    const filteredPokemon = pokemonCharacters.filter((character) => {
        console.log(character);
        return (character.name.includes(searchString) || character.type.includes(searchString));
    })
    console.log(filteredPokemon);
    // displayPokemon(filteredPokemon);
})

// iterating 1-150 of the pokemon and pushing each one to empty array named promises
const getPokemon = () => {
    for (let i = 1; i <= 150; i++) {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        pokemonCharacters.push(fetch(apiUrl).then(res => res.json()));
    }
    Promise.all(pokemonCharacters).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
}

// const fetchPokemon = async () => {
//     try {
//         const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
//         const res = await fetch(url);
//         pokemonCharacters = await res.json();
//         console.log(pokemonCharacters);
//         const pokemon = pokemonCharacters.results.map((data, index) => ({
//             name: data.name,
//             id: index + 1,
//             type: data.types.map((type) => type.type.name).join(", "),
//             image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
//
//         }))
//     } catch (err) {
//         console.log()
//     }
//     displayPokemon(pokemon);
// }
//
// const loadPokemon = async () => {
//     try {
//         for (let i = 1; i <= 150; i++) {
//             const apiUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
//             pokemonCharacters = await pokemonCharacters.push(fetch(apiUrl).then(res => res.json()));
//             displayPokemon(pokemonCharacters);
//         }
//     } catch(err) {
//         console.log(err);
//     }
// }

const displayPokemon = (pokemon) => {
    const html = pokemon
        .map((pokeman) => `
        <div class="card" style="width: 18rem;">
    <img src="${pokeman.image}" class="card-img-top" alt="pokemon-image">
        <div class="card-body">
            <h5 class="card-title">${pokeman.id}. ${pokeman.name}</h5>
            <p class="card-text">Type: ${pokeman.type}</p>
<!--            <a href="#" class="btn btn-primary" id="single-view">Go somewhere</a>-->
        </div>
</div>
    `
        )
        .join("");
    pokedex.html(html);
};

getPokemon();
// loadPokemon();
// fetchPokemon();
// console.log(pokemonCharacters)





