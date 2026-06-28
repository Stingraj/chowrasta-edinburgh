import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Video,
} from "lucide-react";
import { Ornament } from "@/components/Ornament";

interface Reel {
  id: string;
  videoUrl: string;
}

const REELS_DATA: Reel[] = [
  {
    id: "reel-1",
    videoUrl: "/videos/video1.mp4",
  },
  {
    id: "reel-2",
    videoUrl: "/videos/video2.mp4",
  },
  {
    id: "reel-3",
    videoUrl: "/videos/video3.mp4",
  },
  {
    id: "reel-4",
    videoUrl: "/videos/video4.mp4",
  },
  {
    id: "reel-5",
    videoUrl: "/videos/video5.mp4",
  },
];

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
  onVideoEnded: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  cardWidth: number;
}

function ReelCard({
  reel,
  isActive,
  isMuted,
  onMuteToggle,
  onVideoEnded,
  onPrevClick,
  onNextClick,
  cardWidth,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayStateOverlay, setShowPlayStateOverlay] = useState<"play" | "pause" | null>(null);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.log("Autoplay blocked or interrupted:", err);
          setIsPlaying(false);
        });
      }
    } else {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) return;

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowPlayStateOverlay("pause");
      } else {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
        setShowPlayStateOverlay("play");
      }
      setTimeout(() => setShowPlayStateOverlay(null), 700);
    }
  };

  return (
    <div
      style={{ width: cardWidth }}
      className={`relative h-[85vh] overflow-hidden border transition-all duration-500 shadow-2xl bg-black shrink-0 ${
        isActive
          ? "border-gold scale-[1.03] opacity-100 shadow-gold/15 z-10 relative rounded-2xl"
          : "border-none scale-100 opacity-50 z-0"
      }`}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop={false}
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onEnded={onVideoEnded}
      />

      {/* Transient Action Feedback Overlay */}
      <AnimatePresence>
        {showPlayStateOverlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center bg-black/15 z-20 pointer-events-none"
          >
            <div className="p-3 rounded-full bg-black/75 text-gold shadow-lg backdrop-blur-sm">
              {showPlayStateOverlay === "play" ? (
                <Play className="w-6 h-6 fill-gold" />
              ) : (
                <Pause className="w-6 h-6 fill-gold" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation and Play Click overlays (No tooltips) */}
      {isActive && (
        <div className="absolute inset-0 z-20 flex">
          <div
            className="w-[35%] h-full cursor-w-resize"
            onClick={(e) => {
              e.stopPropagation();
              onPrevClick();
            }}
          />
          <div
            className="w-[30%] h-full cursor-pointer"
            onClick={togglePlay}
          />
          <div
            className="w-[35%] h-full cursor-e-resize"
            onClick={(e) => {
              e.stopPropagation();
              onNextClick();
            }}
          />
        </div>
      )}

      {/* Mute toggle overlay (No tooltips) */}
      {isActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMuteToggle();
          }}
          className="absolute top-6 right-6 z-35 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-cream border border-gold/30 backdrop-blur-sm cursor-pointer transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-gold" /> : <Volume2 className="w-4 h-4 text-gold" />}
        </button>
      )}
    </div>
  );
}

export function Reels() {
  const [reels, setReels] = useState<Reel[]>(REELS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setVisibleCount(1);
      } else if (w < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }

      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = containerWidth > 0 ? containerWidth / visibleCount : 360;
  const activeRenderIndex = visibleCount === 3 ? 1 : 0;

  const handleNext = async () => {
    if (isAnimating || REELS_DATA.length === 0) return;
    setIsAnimating(true);

    // 1. Slide left by exactly 1 card width
    await controls.start({
      x: -cardWidth,
      transition: { type: "spring", stiffness: 220, damping: 26 },
    });

    // 2. Rotate array forward (move first element to the end)
    setReels((prev) => [...prev.slice(1), prev[0]]);

    // 3. Reset translation to 0 instantly
    await controls.set({ x: 0 });

    // 4. Update track index
    setCurrentIndex((prev) => (prev + 1) % REELS_DATA.length);
    setIsAnimating(false);
  };

  const handlePrev = async () => {
    if (isAnimating || REELS_DATA.length === 0) return;
    setIsAnimating(true);

    // 1. Rotate array backward instantly (move last element to the front)
    setReels((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);

    // 2. Set translation offset to -cardWidth instantly
    await controls.set({ x: -cardWidth });

    // 3. Slide right back to 0
    await controls.start({
      x: 0,
      transition: { type: "spring", stiffness: 220, damping: 26 },
    });

    // 4. Update track index
    setCurrentIndex((prev) => (prev - 1 + REELS_DATA.length) % REELS_DATA.length);
    setIsAnimating(false);
  };

  return (
    <section
      id="reels"
      data-section-anchor
      className="py-24 bg-cream relative overflow-hidden border-t border-gold/25"
    >
      {/* Background patterns and spotlight matching rest of the site */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Heading & Instagram button */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-spice uppercase font-sans mb-3 flex items-center justify-center gap-2">
            <Video className="w-3.5 h-3.5" /> Instagram Stories
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-heritage-deep mb-6">
            Follow Us on Instagram
          </h2>
          <Ornament className="mb-6 justify-center" />
          <a
            href="https://www.instagram.com/chowrasta_edi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-heritage inline-flex items-center gap-2 px-6 py-2.5 bg-heritage text-cream text-xs font-semibold tracking-widest uppercase font-sans hover:bg-spice transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-gold"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>@chowrasta_edi</span>
          </a>
        </div>
      </div>

      {/* Reels Slider Container (Edge to Edge width horizontally, height pulled back by 15%) */}
      <div className="relative w-full overflow-visible py-8">
        {/* Desktop Navigation Arrows (Floating above edge cards) */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 bg-cream/80 hover:bg-cream hover:border-gold text-heritage-deep cursor-pointer transition-all duration-300 z-35 shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 bg-cream/80 hover:bg-cream hover:border-gold text-heritage-deep cursor-pointer transition-all duration-300 z-35 shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider window (Edge to Edge width) */}
        <div ref={containerRef} className="w-full overflow-hidden">
          <motion.div
            className="flex gap-0 items-center"
            animate={controls}
            initial={{ x: 0 }}
            style={{ width: "max-content" }}
          >
            {reels.map((reel, index) => {
              const isActive = index === activeRenderIndex;

              return (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  isActive={isActive}
                  isMuted={isMuted}
                  onMuteToggle={() => setIsMuted((m) => !m)}
                  onVideoEnded={handleNext}
                  onPrevClick={handlePrev}
                  onNextClick={handleNext}
                  cardWidth={cardWidth}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
