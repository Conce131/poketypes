import TypeButton from "./TypeButton";
import TypeGrid from "./TypeGrid";

function TypeSelector({ types, type1, type2, onTypeClick }) {
  return (
    <div className="buttons-selector-container">
      <TypeGrid
        types={types}
        type1={type1}
        type2={type2}
        onTypeClick={onTypeClick}
      />
    </div>
  );
}

export default TypeSelector;
