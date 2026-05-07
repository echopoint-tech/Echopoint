"use client";

import { useEffect, useRef } from "react";
import styles from "./NeuralCanvas.module.css";

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const colorTech = "6, 182, 212"; // Cyan
    const colorBlue = "59, 130, 246"; // Blue

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      z: number;
      color: string;
      baseColor: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; 
        this.vx = (Math.random() - 0.5) * 0.5 * (1 / this.z); 
        this.vy = (Math.random() - 0.5) * 0.5 * (1 / this.z);
        this.size = (Math.random() * 3 + 1.5) * this.z; 
        const isTech = Math.random() > 0.4;
        this.baseColor = isTech ? colorTech : colorBlue;
        this.color = `rgba(${this.baseColor}, `;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
    }

    function initParticles() {
      particles = [];
      const isMobile = width < 768;
      const particleCount = isMobile ? Math.min(width * 0.035, 40) : Math.min(width * 0.06, 75); 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate(time: number = 0) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      const pulse = Math.sin(time * 0.0015) * 0.5 + 0.5; 

      particles.forEach((p, index) => {
        p.update();
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + pulse * 0.15), 0, Math.PI * 2);
        const pAlpha = (0.35 + pulse * 0.2) * p.z;
        ctx.fillStyle = p.color + pAlpha + ")";
        
        if (p.z > 1.4) {
            ctx.shadowBlur = 8 + pulse * 12;
            ctx.shadowColor = `rgba(${p.baseColor}, 0.6)`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        // High-Impact Mouse connection
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 380) {
            ctx.beginPath();
            const mouseOpacity = (0.4 + pulse * 0.1) * (1 - mDist / 380);
            ctx.strokeStyle = `rgba(${p.baseColor}, ${mouseOpacity})`;
            ctx.lineWidth = 1.2;
            
            if (mDist < 100) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${p.baseColor}, 0.7)`;
            }
            
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 190) {
            ctx.beginPath();
            const opacity = (1 - distance / 190) * (0.3 + pulse * 0.15) * Math.min(p.z, p2.z);
            
            if (distance < 60) {
                ctx.lineWidth = 1.8;
                ctx.strokeStyle = `rgba(${p.baseColor}, ${opacity * 1.5})`;
            } else {
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = `rgba(${p.baseColor}, ${opacity})`;
            }

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      resize();
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          resize();
          if (particles.length === 0) {
            initParticles();
            animate();
          }
        }
      }
    });

    observer.observe(canvas);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas className={styles.neuralCanvas} ref={canvasRef} aria-hidden="true"></canvas>;
}
