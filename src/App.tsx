import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import StartScreen from "./components/Main/StartScreen";
import Modal from "./components/Modal/Modal";
import CityPicker from "./components/CityPicker/CityPicker";
import TimeCard from "./components/TimeCard/TimeCard";
import CityDetail from "./pages/CityDetail";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { City } from "./types";

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCities, setSelectedCities] = useLocalStorage<City[]>(
    "wc.selectedCities",
    []
  );

  const handleSelectCity = (city: City) => {
    if (!selectedCities.some((c) => c.id === city.id)) {
      setSelectedCities([...selectedCities, { ...city, mode: "analog" }]);
    }
    setIsModalOpen(false);
  };

  const removeCity = (id: string) => {
    setSelectedCities(selectedCities.filter((c) => c.id !== id));
  };

  const toggleMode = (id: string) => {
    setSelectedCities((prev) =>
      prev.map((city) =>
        city.id === id
          ? { ...city, mode: city.mode === "analog" ? "digital" : "analog" }
          : city
      )
    );
  };

  const hasCities = selectedCities.length > 0;

  return (
    <Router>
      <div className="wrapper">
        <Header onAddCity={() => setIsModalOpen(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                {!hasCities && (
                  <StartScreen onAddCity={() => setIsModalOpen(true)} />
                )}

                <div className="timeGrid">
                  {selectedCities.map((city) => (
                    <TimeCard
                      key={city.id}
                      city={city}
                      mode={city.mode ?? "analog"}
                      onRemove={removeCity}
                      onToggleMode={toggleMode}
                    />
                  ))}
                </div>
              </main>
            }
          />
          <Route path="/city/:id" element={<CityDetail />} />
        </Routes>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CityPicker onSelect={handleSelectCity} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
