import { useState } from "react";
import { calculateEffectiveness, groupEffectiveness } from "./assets/utils/effectiveness";
import TypeButton from "./components/TypeButton";
import TypeModal from "./components/TypeModal";
import TypeGrid from "./components/TypeGrid";
import { typeIcons } from "./assets/typesIcons";

function App() {
  const [type1, setType1] = useState(null);
  const [type2, setType2] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);

  const openModal = slot => setActiveSlot(slot);
  const closeModal = () => setActiveSlot(null);

  const handleSelect = type => {
    if (activeSlot === 1) setType1(type);
    if (activeSlot === 2) setType2(type);
    closeModal();
  };

  const defensiveTypes = [type1, type2].filter(Boolean);
  const effectiveness = calculateEffectiveness(defensiveTypes);
  const grouped = groupEffectiveness(effectiveness);
  


  return (
    <>
    <div>
      <h1>Calculadora de resistencias Pokémon</h1>

       <div>
      <h1>Elige tipos defensivos:</h1>

      <TypeButton label="Tipo 1" value={type1} onClick={() => openModal(1)} />
      <TypeButton label="Tipo 2" value={type2} onClick={() => openModal(2)} />

      <TypeModal isOpen={activeSlot !== null} onClose={closeModal}>
        <TypeGrid onSelect={handleSelect} />
      </TypeModal>
    </div>
    <div className="table-results-container">

  <div className="result-column">
    <h2>Inmunidades (x0)</h2>
    <div className="icons-container">
      {grouped.immune.length > 0 ? (
        grouped.immune.map(type => (
          <div key={type} className="type-item">
            <div className={`icon-table ${type}`}><img src={typeIcons[type]} alt={type}  /></div>
            <span>{type}</span>
            <span>(x0)</span>
          </div>
        ))
      ) : (
        ''
      )}
    </div>
  </div>

  <div className="result-column">
    <h2>Resistencias</h2>
    <div className="icons-container">
      {grouped.x025.map(type => (
        <div key={type} className="type-item">
          <div className={`icon-table ${type}`}><img src={typeIcons[type]} alt={type}  /></div>
          <span>{type} </span>
           <span>(x0.25)</span>
        </div>
      ))}
      {grouped.x05.map(type => (
        <div key={type} className="type-item">
          <div className={`icon-table ${type}`}><img src={typeIcons[type]} alt={type}  /></div>
          <span>{type}</span>
          <span>(x0.5)</span>
        </div>
      ))}
    </div>
  </div>

  <div className="result-column">
    <h2>Debilidades</h2>
    <div className="icons-container">
      {grouped.x2.map(type => (
        <div key={type} className="type-item">
          <div className={`icon-table ${type}`}><img src={typeIcons[type]} alt={type}  /></div>
          <span>{type}</span>
           <span>(x2)</span>
        </div>
      ))}
      {grouped.x4.map(type => (
        <div key={type} className="type-item">
          <div className={`icon-table ${type}`}><img src={typeIcons[type]} alt={type}  /></div>
          <span>{type}</span>
           <span> (x4)</span>
        </div>
      ))}
    </div>
  </div>

</div>
    </div>
    </>
  );
}

export default App;
