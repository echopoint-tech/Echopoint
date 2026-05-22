"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionStaggerItemProps {
  children: React.ReactNode;
  yOffset?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MotionStaggerItem({
  children,
  yOffset = 20,
  className = "",
  style,
}: MotionStaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
