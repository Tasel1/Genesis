import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Helper function to check if the URL is an image file
const isImageFile = (url) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function ModelCard({ modelUrl, onSelect, name }) {
  return (
    <div className="model-card">
      <div className="model-card-content" onClick={() => onSelect(modelUrl)}>
        {isImageFile(modelUrl) ? (
          <img
            src={modelUrl}
            alt="Static content"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Canvas>
            <ambientLight intensity={5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Model url={modelUrl} />
            <OrbitControls />
          </Canvas>
        )}
      </div>
      {name && <p className="model-card-name">{name}</p>}
    </div>
  );
}

export default ModelCard;
