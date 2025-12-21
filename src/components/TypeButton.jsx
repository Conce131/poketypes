import { typeIcons } from "../assets/typesIcons";


export default function TypeButton({ label, value, onClick, }) {
    return (
    <button onClick={onClick} className={`icon ${value} selector`}>
      {value ? (
        <img src={typeIcons[value]} alt={value} />
      ) : (
        label
      )}
    </button>
  );
}
