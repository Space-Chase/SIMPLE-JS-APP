let pokemonList = [
    { name: "BULBASAUR", weight: 6.9, height: 0.7, type: ['GRASS', 'POISON'] },
    { name: "IVYSAUR", weight: 10, height: 1.0, type: ['GRASS', 'POISON'] },
    { name: "VENUSAUR", weight: 100.0, height: 2.0, type: ['GRASS','POISON'] },
    { name: "CHARMANDER", weight: 8.5, height: 0.6, trpe:['FIRE'] },
    { name: "CHARMELEON", weight: 19.0, height: 1.1, type:['FIRE'] },
    { name: "CHARIZARD", weight: 90.5, height: 1.7, type:['FIRE', 'FLYING'] },
    { name: "SQUIRTLE", weight: 9.0, height: 0.5, type: ['WATER']},
    { name: "WARTURTLE", weight: 22.5, height: 1.0, type: ['WATER']},
    { name: "BLASTOISE", weight: 85.5, height: 1.6, type: ['WATER']}
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name );
    }