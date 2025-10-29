import { useState } from "react";
import ModelCard from "./components/ModelCard";
import ModelViewer from "./components/ModelViewer";
import "./App.css";

const models = [
  {
    id: 1,
    url: "/cosmo.glb",
    name: "Space station",
    description:
      "This is a detailed 3D model of a space station designed for a future colony. It includes various modules and external devices that support life support and space exploration.",
  },
  {
    id: 2,
    url: "/image.jpg",
    name: "Space station rooms",
    description:
      "This image depicts the interior of the space station. It features living quarters, a biodome, laboratories, an industrial area, and a power core designed for comfortable and efficient crew accommodation.",
  },
];

function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setIsFullscreen(false); // Exit fullscreen when selecting a new model
  };

  const handleToggleFullscreen = () => {
    if (selectedModel) {
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Genesis</h1>
      </header>
      <main className="main-content">
        <div className="models-grid">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              modelUrl={model.url}
              onSelect={() => handleModelSelect(model)}
              name={model.name}
            />
          ))}
        </div>
        <ModelViewer
          modelUrl={selectedModel ? selectedModel.url : null}
          description={selectedModel ? selectedModel.description : null}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />{" "}
      </main>
      <footer>
        <div>
          <p className="team-members">Team members:</p>
          <p className="team-members-names">
            Nurgazinov Nurali Askhatuly, Umudov Makhmud Togrulogly, Batyrbek
            Aibarys, Mirzhanov Aldiyar Serikzhanovich, Erik Rasul Sayatuly.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
