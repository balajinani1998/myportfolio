import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

function createTechTexture(name: string, color: string, subText: string = "CLOUD") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = "#120e18";
  ctx.fillRect(0, 0, 512, 512);

  const grad = ctx.createRadialGradient(256, 256, 80, 256, 256, 240);
  grad.addColorStop(0, color + "66");
  grad.addColorStop(0.7, color + "22");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 240, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 200, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#1b1424";
  ctx.beginPath();
  ctx.arc(256, 256, 186, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name, 256, 235);

  ctx.fillStyle = color;
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(subText, 256, 305);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const { width, height } = viewport;
    ref.current?.setNextKinematicTranslation(
      vec.set((pointer.x * width) / 2, (pointer.y * height) / 2, 0)
    );
  });
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const element = document.querySelector(".techstack") as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;

        if (
          scrollY > elementTop - windowHeight &&
          scrollY < elementTop + elementHeight
        ) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    const techItems = [
      { name: "AWS", color: "#FF9900", sub: "CLOUD" },
      { name: "DOCKER", color: "#2496ED", sub: "CONTAINER" },
      { name: "K8S", color: "#326CE5", sub: "ORCHESTRATION" },
      { name: "LINUX", color: "#FCC624", sub: "SYSTEMS" },
      { name: "PYTHON", color: "#4B8BBE", sub: "AUTOMATION" },
      { name: "CI / CD", color: "#D24939", sub: "PIPELINE" },
      { name: "IAM", color: "#10B981", sub: "SECURITY" },
      { name: "NGINX", color: "#009639", sub: "WEB SERVER" },
    ];

    const textures = techItems.map((item) =>
      createTechTexture(item.name, item.color, item.sub)
    );

    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
