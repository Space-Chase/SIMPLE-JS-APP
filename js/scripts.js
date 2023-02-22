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
            const modal = createModal(pokemon);
            document.body.appendChild(modal.backdrop);
            document.body.appendChild(modal.modal);
        });
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
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
            const response = await fetch(url);
            const details = await response.json();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        } catch (e) {
            console.error(e);
        }
    }

    function createModal(pokemon) {
        const backdrop = document.createElement("div");
        backdrop.classList.add("modal-backdrop");

        const modal = document.createElement("div");
        modal.classList.add("modal");

        const name = document.createElement("h2");
        name.textContent = pokemon.name;

        const height = document.createElement("p");
        height.textContent = `Height: ${pokemon.height}`;

        const img = document.createElement("img");
        img.src = pokemon.imageUrl;
        img.alt = pokemon.name;
        img.classList.add("modal-image");

        modal.appendChild(name);
        modal.appendChild(height);
        modal.appendChild(img);

        backdrop.addEventListener("click", closeModal);
        document.addEventListener("keydown", closeModal);

        function closeModal(event) {
            if (event.type === "click" || event.key === "Escape") {
                backdrop.remove();
                modal.remove();
                document.removeEventListener("keydown", closeModal);
            }
        }

        return { backdrop, modal };
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