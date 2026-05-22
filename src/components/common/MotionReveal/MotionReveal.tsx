"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MotionReveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  xOffset = 0,
  className = "",
  style,
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
    >
      {children}
    </motion.div>
  );
}
