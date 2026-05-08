"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), { ssr: false, loading: () => null });

export default function NeuralCanvasLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) setShow(true);
  }, []);

  if (!show) return null;
  return <NeuralCanvas />;
}
