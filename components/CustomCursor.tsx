"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);
  const orbRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;
    const glow = glowRef.current;
    const particles = particlesRef.current;
    const orb = orbRef.current;
    const ripple = rippleRef.current;
    
    gsap.set([cursor, spotlight, glow, particles, orb, ripple], { 
      xPercent: -50, 
      yPercent: -50 
    });
    
    // Rotating animations
    gsap.to(particles, {
      rotation: 360,
      repeat: -1,
      duration: 15,
      ease: "none"
    });

    gsap.to(orb, {
      rotation: -360,
      repeat: -1,
      duration: 20,
      ease: "none"
    });

    // Create a constant pulsing animation for the glow
    gsap.to(glow, {
      scale: 1.2,
      opacity: 0.4,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut"
    });

    // Ripple animation
    const rippleAnimation = () => {
      gsap.fromTo(ripple,
        {
          scale: 0.5,
          opacity: 0.5
        },
        {
          scale: 1.5,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: rippleAnimation
        }
      );
    };
    
    rippleAnimation();

    const moveElements = (e: MouseEvent) => {
      // Instant movement for main cursor
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });
      
      // Quick follow for spotlight and orb
      gsap.to([spotlight, orb], {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Smooth follow for other elements
      gsap.to([glow, particles, ripple], {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    // Enhanced hover effects
    const handleLinkHover = () => {
      gsap.to([cursor], {
        scale: 2,
        duration: 0.3
      });
      gsap.to([spotlight, glow], {
        scale: 1.5,
        opacity: 0.8,
        duration: 0.3
      });
      gsap.to(particles, {
        scale: 1.2,
        duration: 0.3
      });
      gsap.to(orb, {
        scale: 1.4,
        opacity: 0.9,
        duration: 0.3
      });
    };

    const handleLinkLeave = () => {
      gsap.to([cursor], {
        scale: 1,
        duration: 0.3
      });
      gsap.to([spotlight, glow], {
        scale: 1,
        opacity: 0.6,
        duration: 0.3
      });
      gsap.to([particles, orb], {
        scale: 1,
        opacity: 0.5,
        duration: 0.3
      });
    };

    // Click animation
    const handleMouseDown = () => {
      gsap.to([cursor, spotlight, glow, particles, orb], {
        scale: 0.85,
        duration: 0.2,
      });
    };

    const handleMouseUp = () => {
      gsap.to([cursor, spotlight, glow, particles, orb], {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mousemove', moveElements);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleLinkHover);
      element.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveElements);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkHover);
        element.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[60]"
        style={{
          background: 'linear-gradient(135deg, #fa71cd, #fa71cd, #d4c0d9)',
          borderRadius: '50%',
          filter: 'blur(2px) brightness(1.3)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
        }}
      />
      
      <div 
        ref={spotlightRef}
        className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-[51]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, rgba(0, 255, 135, 0.08) 30%, transparent 70%)',
          borderRadius: '50%',
          opacity: 0.6,
          filter: 'blur(5px)'
        }}
      />
      
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[50]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, rgba(0, 255, 135, 0.03) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />
      <div 
        ref={particlesRef}
        className="fixed top-0 left-0 w-80 h-80 pointer-events-none z-[52] opacity-30"
        style={{
          background: `
            repeating-conic-gradient(
              from 0deg,
              transparent 0deg 30deg,
              rgba(0, 255, 255, 0.1) 30deg 31deg,
              transparent 31deg 60deg,
              rgba(0, 255, 135, 0.1) 60deg 61deg,
              transparent 61deg 90deg
            )
          `,
          borderRadius: '50%',
          filter: 'blur(1px)',
        }}
      />

      {/* Orbiting effect */}
      <div 
        ref={orbRef}
        className="fixed top-0 left-0 w-72 h-72 pointer-events-none z-[53] opacity-40"
        style={{
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg 60deg,
              rgba(0, 255, 255, 0.1) 60deg 120deg,
              transparent 120deg 180deg,
              rgba(0, 255, 135, 0.1) 180deg 240deg,
              transparent 240deg 360deg
            )
          `,
          borderRadius: '50%',
        }}
      />

      {/* Ripple effect */}
      <div 
        ref={rippleRef}
        className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-[54] opacity-20"
        style={{
          border: '2px solid rgba(0, 255, 255, 0.5)',
          borderRadius: '50%',
        }}
      />
    </>
  );
};

export default CustomCursor;