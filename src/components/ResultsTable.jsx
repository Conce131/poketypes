import ResultColumn from "./ResultColumn";
import TypeButton from "./TypeButton";

function ResultsTable({
  grouped,
  type1,
  type2,
  onClearType1,
  onClearType2,
  className = "",
}) {
  return (
    <div className={`table-results-container ${className}`}>
      <div className="showed-types">
        <TypeButton label="Tipo 1" value={type1} onClick={onClearType1} />
        <TypeButton label="Tipo 2" value={type2} onClick={onClearType2} />
      </div>

      <ResultColumn
        title="Inmunidades"
        groups={[{ multiplier: "x0", types: grouped.immune }]}
      />

      <ResultColumn
        title="Resistencias"
        groups={[
          { multiplier: "x0.25", types: grouped.x025 },
          { multiplier: "x0.5", types: grouped.x05 },
        ]}
      />

      <ResultColumn
        title="Debilidades"
        groups={[
          { multiplier: "x2", types: grouped.x2 },
          { multiplier: "x4", types: grouped.x4 },
        ]}
      />
    </div>
  );
}

export default ResultsTable;
