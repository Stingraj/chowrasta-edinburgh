import { type ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
};

export const Reveal = forwardRef<HTMLElement, Props>(
  ({ children, className = "", delay = 0, y = 24, as = "div", once = true }, ref) => {
    const MotionComponent =
      (motion as unknown as Record<string, React.ComponentType>)[as] || motion.div;

    return (
      <MotionComponent
        ref={ref}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount: 0.15, margin: "0px 0px -60px 0px" }}
        transition={{
          duration: 0.9,
          delay: delay / 1000,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </MotionComponent>
    );
  },
);

Reveal.displayName = "Reveal";
