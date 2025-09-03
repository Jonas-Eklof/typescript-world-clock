import { useState } from "react";
import AnalogClock from "./components/Clock/AnalogClock";
import Header from "./components/Header/Header";
import StartScreen from "./components/Main/StartScreen";
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="wrapper">
      <Header onAddCity={() => setIsModalOpen(true)} />
      <main>
        <StartScreen onAddCity={() => setIsModalOpen(true)} />
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add a City</h2>
        <p>Add one or more cities</p>
      </Modal>
    </div>
  );
}

export default App;
