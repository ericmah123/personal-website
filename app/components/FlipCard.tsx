"use client";

import {
  useState,
  useCallback,
  useMemo,
  startTransition,
  useRef,
} from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  flipDirection?: "horizontal" | "vertical";
  flipTrigger?: "hover" | "click";
  animationDuration?: number;
  easingFunction?: string;
  perspective?: number;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  ongoing?: boolean;
  style?: React.CSSProperties;
}

export default function FlipCard({
  frontContent,
  backContent,
  flipDirection = "horizontal",
  flipTrigger = "hover",
  animationDuration = 0.6,
  easingFunction = "easeInOut",
  perspective = 1000,
  backgroundColor = "rgba(255, 255, 255, 0.045)",
  borderRadius = 14,
  shadow = false,
  ongoing = false,
  style,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  const handleFlip = useCallback(() => {
    if (flipTrigger === "click") {
      startTransition(() => setIsFlipped((prev) => !prev));
    }
  }, [flipTrigger]);

  const handleMouseEnter = useCallback(() => {
    if (flipTrigger === "hover") {
      startTransition(() => setIsFlipped(true));
    }
  }, [flipTrigger]);

  const handleMouseLeave = useCallback(() => {
    if (flipTrigger === "hover") {
      startTransition(() => setIsFlipped(false));
    }
  }, [flipTrigger]);

  const isHorizontal = flipDirection === "horizontal";
  const rotateAxis = isHorizontal ? "rotateY" : "rotateX";

  const animations = useMemo(() => {
    const frontRotation = isFlipped ? -180 : 0;
    const backRotation = isFlipped ? 0 : 180;
    return {
      front: { [rotateAxis]: frontRotation },
      back: { [rotateAxis]: backRotation },
    };
  }, [isFlipped, rotateAxis]);

  const transition = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => ({ duration: animationDuration, ease: easingFunction as any }),
    [animationDuration, easingFunction]
  );

  const cardStyle = useMemo(
    () => ({
      ...style,
      width: "100%",
      height: style?.height ?? "200px",
      minWidth: "5px",
      minHeight: "5px",
      position: "relative" as const,
      perspective: `${perspective}px`,
      cursor: "pointer",
    }),
    [style, perspective]
  );

  const baseFaceStyle = useMemo(() => {
    const border = ongoing
      ? "1px solid rgba(232, 160, 69, 0.28)"
      : "1px solid rgba(255, 255, 255, 0.10)";
    const boxShadow = ongoing
      ? "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.02), inset 0 -14px 30px rgba(0,0,0,0.22), 0 18px 40px rgba(0,0,0,0.45), 0 0 28px rgba(232,160,69,0.10)"
      : "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.02), inset 0 -14px 30px rgba(0,0,0,0.22), 0 18px 40px rgba(0,0,0,0.45)";
    return {
      position: "absolute" as const,
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden" as const,
      backgroundColor,
      backdropFilter: "blur(22px) saturate(165%)",
      WebkitBackdropFilter: "blur(22px) saturate(165%)",
      isolation: "isolate" as const,
      borderRadius: `${borderRadius}px`,
      border,
      boxShadow,
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch",
      overflow: "hidden",
      willChange: "transform",
    };
  }, [backgroundColor, borderRadius, ongoing]);

  const backFaceInitialStyle = useMemo(
    () => ({
      ...baseFaceStyle,
      transform: isHorizontal ? "rotateY(180deg)" : "rotateX(180deg)",
    }),
    [baseFaceStyle, isHorizontal]
  );

  const contentStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 1 auto",
    minWidth: 0,
    minHeight: 0,
  };

  return (
    <div
      ref={containerRef}
      className="tl-flip-card"
      style={cardStyle}
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
    >
      <motion.div
        className="tl-flip-face"
        style={baseFaceStyle}
        animate={animations.front}
        transition={transition}
        initial={false}
      >
        <div className="tl-spotlight" />
        <div style={contentStyle}>{frontContent}</div>
      </motion.div>
      <motion.div
        className="tl-flip-face"
        style={backFaceInitialStyle}
        animate={animations.back}
        transition={transition}
        initial={false}
      >
        <div className="tl-spotlight" />
        <div style={contentStyle}>{backContent}</div>
      </motion.div>
    </div>
  );
}
