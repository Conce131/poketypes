import { typeIcons } from "../assets/typesIcons";

export default function TypeButton({ label, value, onClick }) {
  return (
    <div className="types-selected-container-buttons">
      <button onClick={onClick} className={`icon-showed ${value} selector`}>
        {value ? <img src={typeIcons[value]} alt={value} /> : label}
      </button>
    </div>
  );
}
