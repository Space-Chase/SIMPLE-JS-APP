let pokemonRepository = (function () {
    let pokemonList = [
        { name: "BULBASAUR", weight: 6.9, height: 0.7, type: ["GRASS", "POISON"] },
        { name: "IVYSAUR", weight: 10, height: 1.0, type: ["GRASS", "POISON"] },
        { name: "VENUSAUR", weight: 100.0, height: 2.0, type: ["GRASS", "POISON"] },
        { name: "CHARMANDER", weight: 8.5, height: 0.6, type: ["FIRE"] },
        { name: "CHARMELEON", weight: 19.0, height: 1.1, type: ["FIRE"] },
        { name: "CHARIZARD", weight: 90.5, height: 1.7, type: ["FIRE", "FLYING"] },
        { name: "SQUIRTLE", weight: 9.0, height: 0.5, type: ["WATER"] },
        { name: "WARTURTLE", weight: 22.5, height: 1.0, type: ["WATER"] },
        { name: "BLASTOISE", weight: 85.5, height: 1.6, type: ["WATER"] }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon) {

        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button")
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
pokemonRepository.add({ name: "Pikachu", weight: 6.0, height: 0.4, type: ["ELECTRIC"] });

function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function () {
        showDetails(pokemon);
    });
}
function showDetails(pokemon) {
    console.log(pokemon)
};