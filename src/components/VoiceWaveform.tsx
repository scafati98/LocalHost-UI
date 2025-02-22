
import { useEffect, useRef } from 'react';

const VoiceWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bars = 50;
    const barWidth = canvas.width / bars;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#9b87f5';

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * 50 + 10;
        const x = i * (barWidth + 2);
        const y = (canvas.height - height) / 2;
        
        ctx.fillRect(x, y, barWidth, height);
      }

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
