import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Object = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
        if (!canvasRef.current) return;

        // Get the canvas element from the ref
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.7;
    
        // Initialize the renderer
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.width, canvas.height);
        
        // Initialize the camera
        const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
        camera.position.set(0, 0, 50);
    
        // Create the scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
        
        // Add lights
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0x666666;  // black
        const intensity = 0.8;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.target.position.set(-5, 0, 0);
        scene.add(directionalLight);
        scene.add(directionalLight.target);
    
        // Load the OBJ model
        const objLoader = new OBJLoader();
        objLoader.load('/models/compressed.obj', (root) => {

            console.log("Model Loaded:", root);
            //const ref = new THREE.Box3().setFromObject(root);
            //console.log("Bounding Box:", ref);
    
            // Compute bounding box and scale object
            const box = new THREE.Box3().setFromObject(root);
            const size = box.getSize(new THREE.Vector3()).length();
            const scaleFactor = 20 / size; // Scale to approximately size 10
            
            root.scale.set(scaleFactor, scaleFactor, scaleFactor);
            root.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X-axis

            root.position.set(0, 0, 0);
            scene.add(root);
        }, 
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        });

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth * 0.7;
            canvas.height = window.innerHeight * 0.7;

            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(canvas.width, canvas.height);
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);
  
        // Animation/render loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
  
        animate();
    
        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            scene.clear();
        };
    }, []);
  
    return <canvas ref={canvasRef} style={{ width: '70vw', height: '70vh' }} />;
  };
  

export default Object;
