
import { useEffect, useRef } from 'react';

const VoiceWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const points = 100;
    let phase = 0;
    const amplitudes = new Array(points).fill(0);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#9b87f5';
      
      // Update amplitudes with smoother transitions
      amplitudes.forEach((amp, i) => {
        // Use sine wave as base for smoother movement
        const baseAmp = Math.sin(i * 0.1 + phase) * 10;
        const randomFactor = Math.random() * 10; // Reduced random factor
        const targetAmp = 20 + baseAmp + randomFactor; // More consistent baseline
        
        // Slower transition for smoother movement
        amplitudes[i] = amp + (targetAmp - amp) * 0.05;
      });

      // Create dynamic wave path
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Draw wave with enhanced smoothing
      const points = amplitudes.length;
      const step = canvas.width / (points - 1);

      // Use bezier curves for smoother lines
      for (let i = 0; i < points - 1; i++) {
        const x0 = i * step;
        const x1 = (i + 1) * step;
        const y0 = canvas.height - amplitudes[i];
        const y1 = canvas.height - amplitudes[i + 1];
        
        // Calculate control points for bezier curve
        const cp1x = x0 + (x1 - x0) / 3;
        const cp2x = x0 + (x1 - x0) * 2 / 3;
        const cp1y = y0;
        const cp2y = y1;
        
        if (i === 0) {
          ctx.moveTo(x0, y0);
        }
        // Use bezier curve instead of quadratic curve
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, y1);
      }

      // Complete the wave shape
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Slower phase update for smoother animation
      phase += 0.02;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={80} 
      className="w-full max-w-[300px] h-20 glass-card rounded-lg p-2"
    />
  );
};

export default VoiceWaveform;
