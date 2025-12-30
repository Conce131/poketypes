import { useEffect, useState } from "react";
import EvolutionChain from "../components/EvolutionChain";


export default function Pokedex() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
const [suggestions, setSuggestions] = useState([]);

useEffect(() => {
  const fetchPokemonList = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    const data = await res.json();
    setAllPokemon(data.results.map(p => p.name));
  };

  fetchPokemonList();
}, []);

const flattenEvolutionChain = (chain) => {
    const result = [];

    const traverse = (node) => {
      result.push(node.species.name);
      node.evolves_to.forEach(traverse);
    };

    traverse(chain);
    return result;
  };
  const searchPokemon = async (pokemonName) => {
    const searchName = pokemonName ?? name;

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
    );
    const data = await res.json();
    setPokemon(data);

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
  const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();

    setEvolutions(flattenEvolutionChain(evolutionData.chain));
  };

  const getStatColor = (value) => {
    if (value < 50) return "red";
    if (value < 70) return "orange";
    if (value < 100) return "yellow";
    if (value < 130) return "green";
    return "purple";
  };

  const totalStats = pokemon
    ? pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)
    : 0;

  return (
    <>
     <div className="pokemon-finder">
     <h1>Pokédex</h1>
    <form
    onSubmit={(e) => {
        e.preventDefault();      // evita recarga de página
        if (name.trim()) {
        searchPokemon();
        }
    }}
    >
  <input
  value={name}
  onChange={(e) => {
    const value = e.target.value.toLowerCase();
    setName(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = allPokemon
      .filter(p => p.startsWith(value))
      .slice(0, 6); // máximo 6 sugerencias

    setSuggestions(filtered);
  }}
  placeholder="Nombre del Pokémon"
/>
{suggestions.length > 0 && (
  <ul className="suggestions">
    {suggestions.map((p) => (
      <li
        key={p}
        onClick={() => {
          setName(p);
          setSuggestions([]);
          searchPokemon(p);
        }}
      >
        {p}
      </li>
    ))}
  </ul>
)}

  <button type="submit" disabled={!name.trim()}>
    Buscar
  </button>
</form>
    </div>
      {pokemon && (
        <div className="pokemon-container">
            <div className="pokemon-info">
          <h2>{pokemon.name}</h2>

          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />

          {/* TIPOS */}
          <div className="pokemon-types-container">
            {pokemon.types.map((t) => (
              <div
                
                key={t.type.name}
                className={`pokemon-type ${t.type.name}`}
              >
                <p>{t.type.name}</p>
              </div>
            ))}
          </div>
            </div>
          {/* STATS */}
          <div className="pokemon-stats-container">
            <h3>Total de stats: {totalStats}</h3>

            {pokemon.stats.map((s) => {
              const value = s.base_stat;

              return (
                <div key={s.stat.name} className="stat-row">
                  <span className="stat-name">{s.stat.name}</span>

                  <div className="stat-bar">
                    <div
                      className="stat-bar-fill"
                      style={{
                        width: `${(value / 180) * 100}%`,
                        backgroundColor: getStatColor(value),
                      }}
                    />
                  </div>

                  <span className="stat-value">{value}</span>
                </div>
              );
            })}
          </div>

          {/* EVOLUCIÓN */}
          {evolutions.length > 0 && (
            <EvolutionChain
              evolutions={evolutions}
              onSelect={searchPokemon}
            />
          )}
        </div>
      )}
    </>
  );
}
