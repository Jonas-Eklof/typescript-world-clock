import ClockLogo from "../../assets/ClockLogo.svg";

export default function Header({ onAddCity }: { onAddCity: () => void }) {
  return (
    <header>
      <div className="logo">
        <img src={ClockLogo} alt="World Clock logo" />
        <h1 className="text-black">World Clock</h1>
      </div>
      <button className="btn" onClick={onAddCity}>
        + Add City
      </button>
    </header>
  );
}
