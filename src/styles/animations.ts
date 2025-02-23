export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  },
  slideUp: "animate-[slideUp_0.4s_ease-out]",
  pulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 2, repeat: Infinity }
  },
  float: "animate-[float_6s_ease-in-out_infinite]",
  ripple: "animate-[ripple_1s_ease-in-out_infinite]",
  glow: "animate-[glow_2s_ease-in-out_infinite]",
  scale: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
}; 