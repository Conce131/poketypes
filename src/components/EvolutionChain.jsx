import { useEffect, useState } from "react";

export default function EvolutionChain({ evolutions, onSelect }) {
  return (
    <div className="evolution-container">
      {evolutions.map((name) => (
        <EvolutionItem
          key={name}
          name={name}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function EvolutionItem({ name, onSelect }) {
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    const fetchSprite = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const data = await res.json();
      setSprite(data.sprites.other["official-artwork"].front_default);
    };

    fetchSprite();
  }, [name]);

  return (
    <div className="evolution-item">
      {sprite && <img src={sprite} alt={name} onClick={() => onSelect(name)} />}

      <p
        className="evolution-button"
        onClick={() => onSelect(name)}
      >
        {name}
      </p>
    </div>
  );
}
