
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
      
      // Update amplitudes with smooth transitions
      amplitudes.forEach((amp, i) => {
        const targetAmp = Math.random() * 30 + 10; // Random target amplitude
        amplitudes[i] = amp + (targetAmp - amp) * 0.1; // Smooth transition
      });

      // Create dynamic wave path
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Draw first half of the wave
      for (let i = 0; i < points; i++) {
        const x = (i / points) * canvas.width;
        const y = canvas.height - amplitudes[i];
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Use quadratic curves for smoother lines
          const xc = (x + (((i - 1) / points) * canvas.width)) / 2;
          const yc = (y + (canvas.height - amplitudes[i - 1])) / 2;
          ctx.quadraticCurveTo(xc, yc, x, y);
        }
      }

      // Complete the wave shape
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Update phase for continuous animation
      phase += 0.05;
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
