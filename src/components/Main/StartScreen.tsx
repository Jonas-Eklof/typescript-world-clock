import ClockIcon from "../../assets/GrayClockIcon.svg";

export default function StartScreen({ onAddCity }: { onAddCity: () => void }) {
  return (
    <div className="empty-screen">
      <img src={ClockIcon} alt="Clock icon" />
      <h3>No Cities Added Yet</h3>
      <p>Add your first city to track time around the world</p>
      <p>Choose from popular cities or enter your own</p>
      <button className="btn" onClick={onAddCity}>
        + Add Your First City
      </button>
    </div>
  );
}
