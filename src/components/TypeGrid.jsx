import { typeIcons } from "../assets/typesIcons";

function TypeGrid({ types, type1, type2, onTypeClick }) {
  return (
    <div className="type-grid">
      {types.map(type => (
        <div key={type} className="type-grid-child">
          <button
            className={`icon ${type} ${
    type === type1 || type === type2 ? "selected" : ""
  }`}
            onClick={() => onTypeClick(type)}
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

export default TypeGrid;