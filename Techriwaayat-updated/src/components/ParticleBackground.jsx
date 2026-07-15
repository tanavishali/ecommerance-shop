import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    // Mouse state
    let mouse = { x: null, y: null, radius: 150 };
    
    // Use only the theme's green color
    const color = '#00d97e';
    
    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = [];
      const numParticles = Math.min(800, Math.floor((width * height) / 1500));
      const goldenAngle = 137.5 * (Math.PI / 180);
      
      for (let i = 0; i < numParticles; i++) {
        const radius = 10 + 15 * Math.sqrt(i);
        const angle = i * goldenAngle;
        const size = Math.random() * 1.5 + 1;
        
        particles.push({
          radius: radius,
          baseAngle: angle,
          size: size,
          radialOffset: (Math.random() - 0.5) * 10,
          originalRadius: radius,
          originalRadialOffset: (Math.random() - 0.5) * 10,
          vx: 0,
          vy: 0,
        });
      }
    };
    
    init();
    window.addEventListener('resize', init);
    
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    let animationFrameId;
    let rotation = 0;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 0.005;
      
      // Calculate a smooth floating path for the entire group
      // max offset can be 25% of the screen dimensions
      const maxOffsetX = width * 0.25;
      const maxOffsetY = height * 0.25;
      
      // Use combination of sine waves for natural, unpredictable floating movement
      const centerX = width / 2 + Math.sin(time * 0.8) * Math.cos(time * 0.3) * maxOffsetX;
      const centerY = height / 2 + Math.sin(time * 0.5) * Math.cos(time * 0.9) * maxOffsetY;
      
      rotation += 0.002;
      ctx.fillStyle = color;
      
      particles.forEach((p, i) => {
        const currentAngle = p.baseAngle + rotation * (1 + 50 / (p.originalRadius + 50));
        const r = p.originalRadius + p.originalRadialOffset;
        
        // Calculate base position
        let x = centerX + Math.cos(currentAngle) * r * 1.2;
        let y = centerY + Math.sin(currentAngle) * r * 0.7;
        
        // Mouse interaction logic
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Push particles away
            const pushX = forceDirectionX * force * 30; // Max displacement
            const pushY = forceDirectionY * force * 30;
            
            x -= pushX;
            y -= pushY;
          }
        }
        
        const maxRadius = Math.max(width, height) / 1.5;
        const opacity = Math.max(0, 1 - (r / maxRadius));
        
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = opacity * 0.8; 
        ctx.fill();
      });
      
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export default ParticleBackground;
