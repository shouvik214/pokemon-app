const btn = document.getElementById("search-btn");
const text = document.getElementById("pokemon-input");
const output = document.getElementById("not-found");
const image = document.getElementById("pokemon-image");
const typeBox = document.getElementById("pokemon-type");
async function getData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error("Pokemon not found");
    }
    return await response.json();
}

btn.addEventListener("click", async () => {
    output.innerText = ``;
    image.src = ``;

    const pokemon = text.value.trim().toLowerCase();
    if (!pokemon) {
        output.innerText = "Please enter a Pokémon name!";
        return;
    }

    try {
        const result = await getData(pokemon);
        console.log(result);

        if (result.sprites && result.sprites.front_default) {
            image.src = result.sprites.front_default;
            image.classList.add("show");
        } else {
            throw new Error("Image not found");
        }

        if (result.types.length > 0) {
            const types = result.types.map(t => t.type.name).join(", ");
            typeBox.innerText = `Type: ${types}`;
            typeBox.style.display = "block";
        }
    } catch (error) {
        output.innerText = error;
        image.src = ``;
        image.classList.remove("show");
        typeBox.style.display = "none";
    }
});


