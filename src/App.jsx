import { useState } from "react";
import { calculateEffectiveness, groupEffectiveness } from "./assets/utils/effectiveness";
import TypeSelector from "./components/TypeSelector";
import ResultsTable from "./components/ResultsTable";
import { typeChart } from "./data/typeChart";

function App() {
  const [type1, setType1] = useState(null);
  const [type2, setType2] = useState(null);

  const types = Object.keys(typeChart);

 const handleTypeClick = (type) => {
  if (type === type1) {
    setType1(null);
    return;
  }

  if (type === type2) {
    setType2(null);
    return;
  }

  if (!type1) {
    setType1(type);
  } else if (!type2) {
    setType2(type);
  } else {
    setType1(type);
    setType2(null);
  }
};

  const defensiveTypes = [type1, type2].filter(Boolean);
  const effectiveness = calculateEffectiveness(defensiveTypes);
  const grouped = groupEffectiveness(effectiveness);
  


  return (
    <>
 
      <h1>Calculadora de resistencias Pokémon</h1>
      <h2>Elige tipos defensivos:</h2>

       <div className="total-container">
      <TypeSelector
        types={types}
        type1={type1}
        type2={type2}
        onTypeClick={handleTypeClick}
        onClearType1={() => setType1(null)}
        onClearType2={() => setType2(null)}
      />  
   <ResultsTable grouped={grouped} type1={type1}
        type2={type2}
        onTypeClick={handleTypeClick}
        onClearType1={() => setType1(null)}
        onClearType2={() => setType2(null)} />
          </div>

    </>
  );
}

export default App;
