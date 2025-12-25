import { typeIcons } from "../assets/typesIcons";

function ResultColumn({ title, groups }) {

  const hasContent = groups.some(group => group.types.length > 0);
  if (!hasContent) return null;
  return (
    <div className="result-column">
      <h2>{title}</h2>

      <div className="icons-container">
        {groups.map(({ multiplier, types }) =>
          types.map(type => (
            <div key={`${type}-${multiplier}`} className="type-item">
              <div className={`icon-table ${type}`}>
                <img src={typeIcons[type]} alt={type} />
              </div>
              <span>{type}</span>
              <span>({multiplier})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ResultColumn;
