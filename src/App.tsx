import { useState } from "react";
import Header from "./components/Header/Header";
import StartScreen from "./components/Main/StartScreen";
import Modal from "./components/Modal/Modal";
import CityPicker from "./components/CityPicker/CityPicker";
import TimeCard from "./components/TimeCard/TimeCard";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleSelectCity = (timezone: string) => {
    // Lägg bara till om den inte redan finns
    if (!selectedCities.includes(timezone)) {
      setSelectedCities([...selectedCities, timezone]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="wrapper">
      <Header onAddCity={() => setIsModalOpen(true)} />
      <main style={{ padding: "20px" }}>
        {selectedCities.length === 0 && (
          <StartScreen onAddCity={() => setIsModalOpen(true)} />
        )}

        <div className="timeGrid">
          {selectedCities.map((city) => (
            <TimeCard key={city} city={city} />
          ))}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CityPicker onSelect={handleSelectCity} />
      </Modal>
    </div>
  );
}

export default App;
