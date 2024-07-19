import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function RotatingImage() {
    const mountRef = useRef(null);

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // Set background to transparent
        renderer.shadowMap.enabled = true; // Enable shadow maps
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadow map
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Strong directional light
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024; // High resolution shadow map
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        scene.add(directionalLight);

        // Plane to receive shadow
        const planeGeometry = new THREE.PlaneGeometry(500, 500);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI * 1.5;
        plane.position.y = -5;
        plane.receiveShadow = true;
        scene.add(plane);

        // Texture loading
        const textureLoader = new THREE.TextureLoader();
        const pictureTexture = textureLoader.load('/assets/IMG_2077.jpg', texture => {
            texture.flipY = false; // Flip the texture vertically
            texture.rotation = Math.PI * 1.5; // Rotate the texture by 90 degrees
            texture.center.set(0.5, 0.5); // Set the rotation center to the middle of the texture
        });

        // Coin geometry and material
        const geometry = new THREE.CylinderGeometry(5, 5, 0.5, 100);
        const material = new THREE.MeshPhongMaterial({ 
            map: pictureTexture,
            side: THREE.DoubleSide // Render both sides of the coin
        });
        const coin = new THREE.Mesh(geometry, material);
        coin.rotation.x = Math.PI / 2;
        coin.castShadow = true;

        // Border geometry and material
        const borderGeometry = new THREE.CylinderGeometry(5.1, 5.1, 0.1, 100); // Reduce the depth of the border
        const borderMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.rotation.x = Math.PI / 2;
        border.position.z = 0.19; // Adjust position to ensure it is slightly above the coin

        scene.add(border);
        scene.add(coin);
        camera.position.set(0, 0, 12);

        // Animation
        const animate = function () {
            requestAnimationFrame(animate);
            coin.rotation.z += 0.005; // Rotating around the Z-axis
            border.rotation.z += 0.005; // Keep the border rotation in sync
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '300px', height: '300px' }} />;
}

export default RotatingImage;
