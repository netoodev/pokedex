const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 386;
const limit = 10;
let offset = 0;

function loadPokemonItems (offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${(pokemon.number).toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
        `).join('');
        pokemonList.innerHTML += newHTML; 
    })
    .catch((error) => console.log(error))
}

loadPokemonItems (offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }

})