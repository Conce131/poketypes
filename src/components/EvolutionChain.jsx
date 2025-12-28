import { useEffect, useState } from "react";

export default function EvolutionChain({ chain, onSelect }) {
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    const fetchSprite = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
      );
      const data = await res.json()
      setSprite(data.sprites.other["official-artwork"].front_default);
    };

    fetchSprite();
  }, [chain.species.name]);

  return (
    <div className="evolution-container">
      {sprite && (
        <img
          src={sprite}
          alt={chain.species.name}
        />
      )}

      <p
        className="evolution-button"
        onClick={() => onSelect(chain.species.name)}
      >
        {chain.species.name}
      </p>

      <div className="evolves-to">
        {chain.evolves_to.map((e) => (
          <EvolutionChain
            key={e.species.name}
            chain={e}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}