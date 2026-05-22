"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionStaggerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  style?: React.CSSProperties;
}

export default function MotionStagger({
  children,
  className = "",
  delayChildren = 0,
  staggerChildren = 0.08,
  style,
}: MotionStaggerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
