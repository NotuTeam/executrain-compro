/**
 * @format
 */

"use client";

import {
  motion,
  useInView,
  Variants,
  MotionProps,
  AnimatePresence,
} from "motion/react";
import { useRef, ReactNode } from "react";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

type AnimationDirection = "up" | "down" | "left" | "right" | "scale";

interface AnimatedProps extends Omit<MotionProps, "variants" | "initial" | "animate"> {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const getVariants = (direction: AnimationDirection): Variants => {
  switch (direction) {
    case "up":
      return fadeInUp;
    case "down":
      return fadeInDown;
    case "left":
      return fadeInLeft;
    case "right":
      return fadeInRight;
    case "scale":
      return scaleIn;
    default:
      return fadeInUp;
  }
};

// Generic animated wrapper component
export function Animated({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  ...props
}: AnimatedProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: `-${Math.round(threshold * 100)}px` });

  const baseVariants = getVariants(direction);

  const customVariants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(typeof baseVariants.visible === "object" ? baseVariants.visible.transition : {}),
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Fade In Up
export function FadeInUp({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: Omit<AnimatedProps, "direction">) {
  return (
    <Animated
      className={className}
      direction="up"
      delay={delay}
      duration={duration}
      once={once}
      threshold={threshold}
    >
      {children}
    </Animated>
  );
}

// Fade In Down
export function FadeInDown({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: Omit<AnimatedProps, "direction">) {
  return (
    <Animated
      className={className}
      direction="down"
      delay={delay}
      duration={duration}
      once={once}
    >
      {children}
    </Animated>
  );
}

// Fade In Left
export function FadeInLeft({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: Omit<AnimatedProps, "direction">) {
  return (
    <Animated
      className={className}
      direction="left"
      delay={delay}
      duration={duration}
      once={once}
    >
      {children}
    </Animated>
  );
}

// Fade In Right
export function FadeInRight({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
}: Omit<AnimatedProps, "direction">) {
  return (
    <Animated
      className={className}
      direction="right"
      delay={delay}
      duration={duration}
      once={once}
    >
      {children}
    </Animated>
  );
}

// Scale In
export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.4,
  once = true,
}: Omit<AnimatedProps, "direction">) {
  return (
    <Animated
      className={className}
      direction="scale"
      delay={delay}
      duration={duration}
      once={once}
    >
      {children}
    </Animated>
  );
}

// Stagger Container - for animating children in sequence
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: `-${Math.round(threshold * 100)}px` });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// Stagger Item - to be used inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: StaggerItemProps) {
  const itemVariants = getVariants(direction);

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// Text reveal animation - character by character
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Count up with animation (enhanced version)
interface AnimatedCounterProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  className = "",
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const counterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={counterVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {prefix}
      {isInView ? value : 0}
      {suffix}
    </motion.span>
  );
}

// Hover scale effect wrapper
interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverScale({
  children,
  className = "",
  scale = 1.05,
}: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence };
