let pokemonRepository = (function () {
  let e = [];
  function t() {
    return e;
  }
  function n(t) {
    e.push(t);
  }
  function o(e) {
    i(e).then(function () {
      console.log(e),
        (document.getElementById("modalHeader").innerHTML = e.name),
        (document.querySelector(".pokePic").src = e.imageUrl),
        (document.getElementById("stats").innerHTML =
          "Height: " + e.height / 10 + "m"),
        (document.getElementById("stats2").innerHTML =
          "Type: " + e.types.map((e) => e.type.name).join(", "));
    });
  }
  async function i(e) {
    let t = e.detailsUrl;
    try {
      let n = await (await fetch(t)).json();
      (e.imageUrl = n.sprites.front_default),
        (e.height = n.height),
        (e.types = n.types);
    } catch (o) {
      console.error(o);
    }
  }
  function r(e) {
    pokemonRepository.loadDetails(e).then(function () {
      document.querySelector(".modal-number").innerHTML = "#" + e.id;
      document.querySelector(".modal-title").innerText = ". " + e.name;
      document.querySelector(".pokemon-height").innerHTML =
        "Height: " + e.height / 10 + " m";
      let t = "";
      e.types.forEach(function (e) {
        t += [e.type.name + "<br>"];
      });
      document.querySelector(".pokemon-types").innerHTML = "Types: <br>" + t;
      document.querySelector(".pokemon-img").src = e.imageUrl;
      let n = document.querySelector(".modal-body"),
        o = document.createElement("p");
      (o.innerHTML = "Height: " + e.height / 10 + " m"), n.appendChild(o);
    });
  }
  return {
    getAll: t,
    add: n,
    addListItem: function e(t) {
      let n = document.querySelector(".list-group"),
        i = document.createElement("li"),
        r = document.createElement("button");
      i.classList.add("list-group-item"),
        (r.innerText = t.name),
        r.classList.add("btn"),
        r.classList.add("button-class"),
        r.setAttribute("data-toggle", "modal"),
        r.setAttribute("data-target", "#myModal"),
        i.appendChild(r),
        n.appendChild(i),
        r.addEventListener("click", function () {
          o(t);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: i,
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
