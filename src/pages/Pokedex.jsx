import { useState } from "react";
import EvolutionChain from "../components/EvolutionChain";

export default function Pokedex() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

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
    setEvolutionChain(evolutionData.chain);
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
      <h1>Pokédex</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del Pokémon"
      />

      <button onClick={() => searchPokemon()}>Buscar</button>

      {pokemon && (
        <div className="pokemon-container">
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
          {evolutionChain && (
            <>
              <h3>Evolución</h3>
              <EvolutionChain
                chain={evolutionChain}
                onSelect={searchPokemon}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
