'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHero = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Objects
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Core
        const coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
        const coreMat = new THREE.MeshPhongMaterial({
            color: 0xec4899,
            wireframe: false,
            transparent: true,
            opacity: 0.1,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x6366f1, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Mouse
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animate
        const animate = () => {
            requestAnimationFrame(animate);

            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.005;

            core.rotation.x -= 0.003;
            core.rotation.y -= 0.003;

            // Smooth parallax
            sphere.position.x += (mouseX * 0.5 - sphere.position.x) * 0.05;
            sphere.position.y += (-mouseY * 0.5 - sphere.position.y) * 0.05;

            particlesMesh.rotation.y += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

export default ThreeHero;
