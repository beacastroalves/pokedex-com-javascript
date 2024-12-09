const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 251
const limit = 20
let offset = 0

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}" ${pokemon.number === 1 ? `onclick="location.href='pokemon.html?id=1'"` : ``}>
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.photo}"
            alt="${pokemon.name}">

        </div>
      </li>
    `).join('')

    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNextPage = offset + limit

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimite = maxRecords - offset
    loadPokemonItens(offset, newLimite)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})
