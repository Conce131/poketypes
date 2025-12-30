import { useEffect, useState } from "react";
import {
  calculateEffectiveness,
  groupEffectiveness,
} from "../assets/utils/effectiveness";
import ResultsTable from "../components/ResultsTable";
import EvolutionChain from "../components/EvolutionChain";

export default function Pokedex() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [type1, setType1] = useState(null);
  const [type2, setType2] = useState(null);

  const [evolutions, setEvolutions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await res.json();
      setAllPokemon(data.results.map((p) => p.name));
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

    // ✅ EXTRAER TIPOS
    const types = data.types.map((t) => t.type.name);
    setType1(types[0] ?? null);
    setType2(types[1] ?? null);

    // EVOLUCIONES
    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();
    setEvolutions(flattenEvolutionChain(evolutionData.chain));
  };

  const [grouped, setGrouped] = useState(null);

  useEffect(() => {
    if (!type1 && !type2) return;

    const defensiveTypes = [type1, type2].filter(Boolean);
    const effectiveness = calculateEffectiveness(defensiveTypes);
    const groupedResult = groupEffectiveness(effectiveness);

    setGrouped(groupedResult);
  }, [type1, type2]);

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
            e.preventDefault(); // evita recarga de página
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
                .filter((p) => p.startsWith(value))
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
            <EvolutionChain evolutions={evolutions} onSelect={searchPokemon} />
          )}
          {grouped && (
            <ResultsTable
              className="pokedex"
              grouped={grouped}
              type1={type1}
              type2={type2}
              onClearType1={() => setType1(null)}
              onClearType2={() => setType2(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
