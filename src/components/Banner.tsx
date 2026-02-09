import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface BannerProps {
  profile: {
    name: string;
    title: string;
    quote: string;
    photo: string;
  };
  onScrollToNext: () => void;
}

const Banner: React.FC<BannerProps> = ({ profile, onScrollToNext }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>();
  const [imageUrl, setImageUrl] = useState<string>(profile.photo);

  useEffect(() => {
    const primary = '/yash-main-Image.png';
    const secondary = '/yash-main-Image2.png';
    const check = async (url: string) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
      } catch {
        return false;
      }
    };
    (async () => {
      if (await check(primary)) {
        setImageUrl(primary);
        return;
      }
      if (await check(secondary)) {
        setImageUrl(secondary);
        return;
      }
      setImageUrl(profile.photo);
    })();
  }, [profile.photo]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.y += 0.002;

      // Move camera slightly for dynamic effect
      camera.position.x = Math.sin(Date.now() * 0.001) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.001) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [profile.photo]);

  return (
    <section className="relative min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full px-6 flex items-center pt-20 md:pt-0 pb-8 md:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
            <div className="text-center md:text-left text-white flex flex-col justify-center">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto md:mx-0 mb-3 md:mb-4" />
              <p className="text-lg md:text-2xl mb-3 md:mb-4 text-gray-300">
                {profile.title}
              </p>
              <blockquote className="text-sm md:text-lg italic text-gray-300 max-w-xl mx-auto md:mx-0">
                "{profile.quote}"
              </blockquote>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <span className="px-3 py-1 text-xs md:text-sm border border-white/30 rounded-full text-white/90">
                  Open to Opportunities
                </span>
                <span className="px-3 py-1 text-xs md:text-sm border border-white/30 rounded-full text-white/90">
                  Available for Freelance
                </span>
              </div>
              <button
                onClick={onScrollToNext}
                className="mt-6 md:mt-8 w-fit px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Explore My Work
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-2xl p-0">
                <img
                  src={imageUrl}
                  alt="Yash Main"
                  className="w-full max-w-[80%] sm:max-w-[60%] md:max-w-full h-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-[70vh] rounded-xl object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
