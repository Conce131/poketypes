import { typeIcons } from "../assets/typesIcons";
import { typeChart } from "../data/typeChart";

export default function TypeGrid({ onSelect }) {
  const types = Object.keys(typeChart);

  return (
    <div className="type-grid">
      {types.map(type => (
        <div className="type-grid-child">
        <button
          key={type}
          className={`icon ${type}`}
          onClick={() => onSelect(type)}
        >
          <img
            src={typeIcons[type]}
            alt={type}
            className="type-icon"
          />

        </button>
        <span className={`${type} span-child`}>{type}</span>
        </div>
      ))}
    </div>
  );
}
