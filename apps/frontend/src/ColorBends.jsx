import React, { useEffect, useRef } from 'react';

const ColorBends = ({
  colors = ["#ff5c7a", "#8a5cff", "#00ffd1"],
  rotation = 90,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  noise = 0.15,
  parallax = 0.5,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6,
  transparent = true,
  autoRotate = 0,
  color = "#A855F7"
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive warping
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Parse hex colors to RGB
    const hexToRgb = (hex) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 168, g: 85, b: 247 };
    };

    const palette = [...colors, color].map(hexToRgb);
    let time = 0;

    const render = () => {
      time += 0.015 * speed;
      
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05 * mouseInfluence;
      mouse.y += (mouse.targetY - mouse.y) * 0.05 * mouseInfluence;

      // Clear canvas
      if (transparent) {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      // Apply rotation around center
      if (rotation !== 0 || autoRotate !== 0) {
        ctx.translate(width / 2, height / 2);
        ctx.rotate(((rotation + time * autoRotate * 10) * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
      }

      // Use screen composite for vibrant neon shader glow blending
      ctx.globalCompositeOperation = 'screen';

      const numRibbons = Math.max(4, Math.floor(bandWidth * 1.5));
      const baseSpacing = height / (numRibbons + 1);

      for (let i = 0; i < numRibbons * iterations; i++) {
        const c1 = palette[i % palette.length];
        const c2 = palette[(i + 1) % palette.length];
        
        ctx.beginPath();
        const yCenter = (i + 1) * baseSpacing - baseSpacing * 0.5;

        // Draw flowing bezier wave points
        for (let x = 0; x <= width + 50; x += 30) {
          const normX = x / width;
          
          // Calculate distance to mouse for fluid warp effect
          const distToMouse = Math.hypot(x - mouse.x, yCenter - mouse.y) / width;
          const mouseWarp = Math.exp(-distToMouse * 3.5) * 120 * warpStrength * mouseInfluence * Math.sin(time * 2 + normX * 5);

          // Multi-layered sine/cosine harmonics
          const waveA = Math.sin(normX * 3 * frequency * scale + time + i * 0.6) * 80 * intensity;
          const waveB = Math.cos(normX * 5 * frequency * scale - time * 0.8 + i * 0.4) * 60 * intensity;
          const noiseWave = Math.sin(normX * 12 + time * 2.5 + i) * (30 * noise);
          const parallaxOffset = (mouse.y / height - 0.5) * 60 * parallax * ((i % 3) - 1);

          const y = yCenter + waveA + waveB + noiseWave + parallaxOffset + mouseWarp;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Complete smooth ribbon loop
        ctx.lineTo(width + 50, height + 200);
        ctx.lineTo(0, height + 200);
        ctx.closePath();

        // Create glowing linear gradient for smooth shader appearance
        const grad = ctx.createLinearGradient(0, yCenter - 150, width, yCenter + 150);
        grad.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${0.18 * intensity})`);
        grad.addColorStop(0.5, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${0.28 * intensity})`);
        grad.addColorStop(1, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${0.05 * intensity})`);

        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Add soft ambient background glow blobs matching palette
      ctx.globalCompositeOperation = 'lighter';
      for (let j = 0; j < palette.length; j++) {
        const p = palette[j];
        const bx = width * (0.2 + 0.6 * Math.sin(time * 0.5 + j * 2));
        const by = height * (0.3 + 0.4 * Math.cos(time * 0.7 + j * 1.5));
        const radius = Math.min(width, height) * 0.45 * scale;

        const radial = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        radial.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${0.12 * intensity})`);
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, rotation, speed, scale, frequency, warpStrength, mouseInfluence, noise, parallax, iterations, intensity, bandWidth, transparent, autoRotate, color]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default ColorBends;
