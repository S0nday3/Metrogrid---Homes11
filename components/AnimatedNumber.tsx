import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface AnimatedNumberProps {
  to: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ to }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);

  // This hook tracks whether the component is in the viewport.
  // 'once: false' ensures it re-animates every time it scrolls into view.
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    // When the component is in view, start the animation.
    if (isInView) {
      const animation = animate(count, to, {
        duration: 1.5,
        ease: 'easeOut',
      });
      // Return a cleanup function to stop the animation if the component unmounts or view changes.
      return () => animation.stop();
    } else {
      // When the component is not in view, reset the count to 0.
      // This ensures that the animation restarts from 0 every time it scrolls into view.
      count.set(0);
    }
  }, [isInView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default AnimatedNumber;