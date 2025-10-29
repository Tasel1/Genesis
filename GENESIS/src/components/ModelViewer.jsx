import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

// Helper function to check if the URL is an image file
const isImageFile = (url) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

function Model({ url }) {
  const { scene } = useGLTF(url);

  scene.traverse((child) => {
    if (child.isMesh) {
      // If the material is unlit (often MeshBasicMaterial due to KHR_materials_unlit), replace it with MeshStandardMaterial
      if (child.material && child.material.isMeshBasicMaterial) {
        const oldMaterial = child.material;
        const newMaterial = new THREE.MeshStandardMaterial({
          map: oldMaterial.map, // Preserve the texture map if it exists
          color: oldMaterial.color, // Preserve the color if it exists
        });
        child.material = newMaterial;
        child.material.needsUpdate = true;
      }
    }
  });

  return <primitive object={scene} />;
}

function ModelViewer({ modelUrl, description, isFullscreen, onToggleFullscreen }) {
  if (!modelUrl) {
    return null;
  }

  return (
    <div
      className={`model-viewer ${isFullscreen ? "fullscreen" : ""}`}
    >
      {isImageFile(modelUrl) ? (
        <img src={modelUrl} alt="Selected content" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : (
        <Canvas>
          <ambientLight intensity={5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model url={modelUrl} />
          <OrbitControls />
        </Canvas>
      )}
      {isFullscreen && (
        <div className="fullscreen-close-button" onClick={onToggleFullscreen}>
          X
        </div>
      )}
      {!isFullscreen && (
        <div className="fullscreen-toggle-button" onClick={onToggleFullscreen}>
          Full Screen
        </div>
      )}
      {!isFullscreen && description && (
        <div className="model-description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
