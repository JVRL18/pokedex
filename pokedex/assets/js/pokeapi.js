const pokeApi = {}

let poke_object = (pokemon) => {
    const poke = new Pokemon
    poke.number = pokemon.order
    poke.name = pokemon.name

    const types = pokemon.types.map(p => p.type.name)
    const [type] = types

    poke.types = types
    poke.type = type

    poke.photo = pokemon.sprites.other.dream_world.front_default

    return poke
}

pokeApi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
            .then(r => r.json())
            .then(poke_object)
}

pokeApi.getPokemons = (offset=0, limit=20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then(async res => await res.json())
    .then(res => res.results)
    .then(res => res.map(pokeApi.getDetails))
    .then(res => Promise.all(res))
    .then(res => res)
}
