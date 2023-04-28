let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      document.getElementById("modalHeader").innerHTML = pokemon.name;
      document.querySelector(".pokePic").src = pokemon.imageUrl;
      document.getElementById("stats").innerHTML =
        "Height: " + pokemon.height / 10 + "m";
      document.getElementById("stats2").innerHTML =
        "Type: " + pokemon.types.map((t) => t.type.name).join(", ");
    });
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add("list-group-item");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("button-class");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#myModal");
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  async function loadDetails(item) {
    let url = item.detailsUrl;
    try {
      let response = await fetch(url);
      let details = await response.json();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      console.error(e);
    }
  }

  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalNumber = document.querySelector(".modal-number");
      modalNumber.innerHTML = "#" + item.id;

      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerText = ". " + item.name;

      let pokemonHeight = document.querySelector(".pokemon-height");
      pokemonHeight.innerHTML = "Height: " + item.height / 10 + " m";

      let itemTypes = "";
      item.types.forEach(function (types) {
        itemTypes += [types.type.name + "<br>"];
      });

      let pokemonTypes = document.querySelector(".pokemon-types");
      pokemonTypes.innerHTML = "Types: " + "<br>" + itemTypes;

      let pokemonImg = document.querySelector(".pokemon-img");
      pokemonImg.src = item.imageUrl;

      let modalBody = document.querySelector(".modal-body");
      let heightElement = document.createElement("p");
      heightElement.innerHTML = "Height: " + item.height / 10 + " m";
      modalBody.appendChild(heightElement);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
