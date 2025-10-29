import { useState } from "react";
import ModelCard from "./components/ModelCard";
import ModelViewer from "./components/ModelViewer";
import "./App.css";

const models = [
  { id: 1, url: "/hackaton.glb", name: 'Космическая станция', description: 'Это детальная 3D-модель космической станции, предназначенная для будущей колонии. Она включает в себя различные модули, стыковочные узлы и внешние конструкции, обеспечивающие жизнедеятельность и исследовательскую деятельность в космосе.' },
  { id: 2, url: "/u105ro5rg8o31.jpg", name: 'Комнаты космической станции', description: 'На этой статичной картинке изображены внутренние помещения космической станции. Здесь представлены жилые отсеки, лаборатории, зоны отдыха и рабочие пространства, спроектированные для комфортного и эффективного пребывания экипажа.' },
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
                    />      </main>
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
