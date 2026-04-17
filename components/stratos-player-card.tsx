"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Instagram, Copy, Check, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { toPng } from "html-to-image"

interface StratosPlayerCardProps {
  waitlistNumber: number
  selectedRole: string | null
  name: string
  roles?: Record<string, any>
}

const footballSVGs = {
  boot: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 55 Q20 35 35 30 L55 28 Q65 27 68 35 L70 45 Q71 52 60 54 L40 57 Q30 60 25 65 L15 68 Q8 67 10 55Z" fill="currentColor" opacity="0.9"/>
      <path d="M55 28 L68 32 L70 45 L55 44Z" fill="white" opacity="0.2"/>
      <path d="M35 30 L55 28 L55 44 L35 46Z" fill="white" opacity="0.1"/>
      <ellipse cx="22" cy="62" rx="8" ry="4" fill="white" opacity="0.15"/>
      <path d="M12 50 L30 47" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M15 55 L33 53" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  ball: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="28" fill="currentColor" opacity="0.85"/>
      <path d="M40 12 L50 22 L46 35 L34 35 L30 22Z" fill="white" opacity="0.3"/>
      <path d="M68 40 L56 46 L46 35 L50 22 L62 28Z" fill="white" opacity="0.2"/>
      <path d="M58 62 L46 56 L46 35 L56 46Z" fill="white" opacity="0.15"/>
      <path d="M22 62 L34 56 L34 35 L24 46Z" fill="white" opacity="0.15"/>
      <path d="M12 40 L24 46 L34 35 L30 22 L18 28Z" fill="white" opacity="0.2"/>
      <circle cx="40" cy="40" r="28" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M25 15 L55 15 L52 42 Q50 52 40 55 Q30 52 28 42Z" fill="currentColor" opacity="0.9"/>
      <path d="M55 15 L65 18 Q70 30 62 38 L52 42Z" fill="currentColor" opacity="0.6"/>
      <path d="M25 15 L15 18 Q10 30 18 38 L28 42Z" fill="currentColor" opacity="0.6"/>
      <rect x="35" y="55" width="10" height="12" fill="currentColor" opacity="0.7"/>
      <rect x="28" y="67" width="24" height="5" rx="2" fill="currentColor" opacity="0.8"/>
      <path d="M30 22 L50 22" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <path d="M29 30 L51 30" stroke="white" strokeWidth="1.5" opacity="0.3"/>
    </svg>
  ),
  lightning: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M48 8 L28 42 L40 42 L32 72 L58 34 L44 34Z" fill="currentColor" opacity="0.9"/>
      <path d="M48 8 L52 8 L46 34 L58 34 L36 68 L40 42 L28 42Z" fill="white" opacity="0.15"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M40 10 L46 28 L65 28 L50 40 L56 58 L40 47 L24 58 L30 40 L15 28 L34 28Z" fill="currentColor" opacity="0.9"/>
      <path d="M40 10 L46 28 L65 28 L50 40 L56 58 L40 47 L24 58 L30 40 L15 28 L34 28Z" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
    </svg>
  ),
};

const HexPattern = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
        <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="rgba(163,230,53,0.07)" strokeWidth="0.8"/>
      </pattern>
      <radialGradient id="glow1" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#a3e635" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="80%" cy="70%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12"/>
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="glow3" cx="20%" cy="80%" r="40%">
        <stop offset="0%" stopColor="#a3e635" stopOpacity="0.08"/>
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="560" fill="url(#hex)"/>
    <rect width="400" height="560" fill="url(#glow1)"/>
    <rect width="400" height="560" fill="url(#glow2)"/>
    <rect width="400" height="560" fill="url(#glow3)"/>
  </svg>
);

const ScanLine = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
    <div
      className="absolute left-0 right-0 h-px opacity-20"
      style={{
        background: "linear-gradient(90deg, transparent, #a3e635, transparent)",
        animation: "scanline 3s linear infinite",
      }}
    />
  </div>
);

const FloatingIcon = ({ icon, color, size, top, left, delay, rotate }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      top, left,
      width: size, height: size,
      color,
      transform: `rotate(${rotate}deg)`,
      animation: `float ${3 + delay}s ease-in-out ${delay}s infinite`,
      opacity: 0.18,
    }}
  >
    {footballSVGs[icon]}
  </div>
);

const GlowOrb = ({ color, size, top, left, opacity }) => (
  <div
    className="absolute rounded-full blur-3xl pointer-events-none"
    style={{
      width: size, height: size,
      background: color,
      top, left,
      opacity,
      transform: "translate(-50%, -50%)",
    }}
  />
);

export function StratosPlayerCard({ waitlistNumber, selectedRole, name, roles = {} }: StratosPlayerCardProps) {
  const [hovered, setHovered] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 800);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const shareText = `Just claimed my STRATOS Football GENESIS Member spot! ✨ #${waitlistNumber.toString().padStart(4, '0')} 🏆⚽`;
  const shareDescription = `The platform built for the ones the world hasn't discovered yet. Join the movement!`;
  const shareUrl = window.location.href;

  const shareToTwitter = () => {
    const hashtags = 'StratosFootball,Football,Genesis,Soccer,GlobalSouth,PlayerDevelopment';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + '\n\n' + shareDescription)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText + '\n\n' + shareDescription)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Stratos Football — Member Spot',
          text: shareText + '\n\n' + shareDescription,
          url: shareUrl,
        });
      } else {
        alert('Native sharing not available. Use the other share buttons!');
      }
    } catch (error) {
      console.log('Share cancelled', error);
    }
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const saveAsImage = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { 
          quality: 1.0,
          pixelRatio: 3,
          cacheBust: true,
        });
        const link = document.createElement('a');
        link.download = `stratos-genesis-card-${waitlistNumber.toString().padStart(4, '0')}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Oops! There was an error downloading your card. Please try taking a screenshot instead.');
      }
    }
  };

  const shareToInstagram = () => {
    alert('💡 SAVE this card as an image first, then share it to Instagram! 📸\n\nMake sure to tag @stratosfootball and use #StratosFootball #StratosGenesis');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Bebas+Neue&family=Orbitron:wght@400;700;900&display=swap');

        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 102%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }
        @keyframes pulse-border {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes shimmer-sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes number-glow {
          0%, 100% { text-shadow: 0 0 20px #a3e63580, 0 0 40px #a3e63540, 0 0 80px #a3e63520; }
          50% { text-shadow: 0 0 30px #a3e635cc, 0 0 60px #a3e63580, 0 0 120px #a3e63540; }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        @keyframes corner-spin {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
        .card-shine {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .card-shine:hover {
          transform: perspective(1000px) rotateX(4deg) rotateY(-4deg) scale(1.02);
        }
        .number-glow {
          animation: number-glow 2.5s ease-in-out infinite;
        }
        .badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }
        .shimmer-active::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 60%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          animation: shimmer-sweep 0.8s ease-in-out;
        }
      `}</style>

      <div className="flex flex-col items-center gap-6">
        <div
          ref={cardRef}
          className={`relative card-shine cursor-pointer ${shimmer ? "shimmer-active" : ""}`}
          style={{ maxWidth: 360, width: '100%', perspective: "1000px" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Outer border glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #a3e635, #3b82f6, #a3e635, #0f172a)",
              backgroundSize: "300% 300%",
              padding: 2,
              animation: "pulse-border 3s ease-in-out infinite",
              borderRadius: 18,
            }}
          />

          {/* Card body */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #0d1f2d 0%, #0a1520 40%, #071018 100%)",
              border: "1.5px solid rgba(163,230,53,0.3)",
              boxShadow: hovered
                ? "0 0 60px rgba(163,230,53,0.25), 0 0 120px rgba(59,130,246,0.15), 0 40px 80px rgba(0,0,0,0.8)"
                : "0 0 30px rgba(163,230,53,0.12), 0 20px 60px rgba(0,0,0,0.7)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Background texture */}
            <HexPattern />

            {/* Glow orbs */}
            <GlowOrb color="#a3e635" size="200px" top="10%" left="70%" opacity={0.3} />
            <GlowOrb color="#3b82f6" size="250px" top="70%" left="30%" opacity={0.2} />
            <GlowOrb color="#a3e635" size="150px" top="85%" left="80%" opacity={0.15} />

            {/* Scan line effect */}
            <ScanLine />

            {/* Floating football icons */}
            <FloatingIcon icon="ball" color="#a3e635" size="48px" top="8%" left="5%" delay={0} rotate={15} />
            <FloatingIcon icon="boot" color="#3b82f6" size="42px" top="12%" left="72%" delay={0.8} rotate={-20} />
            <FloatingIcon icon="star" color="#a3e635" size="32px" top="55%" left="4%" delay={1.4} rotate={10} />
            <FloatingIcon icon="trophy" color="#60a5fa" size="40px" top="65%" left="75%" delay={0.4} rotate={5} />
            <FloatingIcon icon="lightning" color="#a3e635" size="36px" top="38%" left="80%" delay={1.8} rotate={-8} />
            <FloatingIcon icon="ball" color="#93c5fd" size="28px" top="80%" left="10%" delay={2.2} rotate={30} />

            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-lime-400 opacity-60 rounded-tl" style={{ animation: "corner-spin 2s ease-in-out infinite" }} />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-blue-400 opacity-60 rounded-tr" style={{ animation: "corner-spin 2s ease-in-out 0.5s infinite" }} />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-blue-400 opacity-60 rounded-bl" style={{ animation: "corner-spin 2s ease-in-out 1s infinite" }} />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-lime-400 opacity-60 rounded-br" style={{ animation: "corner-spin 2s ease-in-out 1.5s infinite" }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-8 pt-10 pb-8 gap-0">

              {/* Top label row */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.5))" }} />
                <span
                  className="text-xs tracking-widest font-semibold uppercase"
                  style={{ color: "rgba(163,230,53,0.7)", fontFamily: "'Orbitron', monospace", fontSize: 9, letterSpacing: "0.3em" }}
                >
                  Stratos Member
                </span>
                <div className="h-px flex-1 w-8" style={{ background: "linear-gradient(90deg, rgba(163,230,53,0.5), transparent)" }} />
              </div>

              {/* Rarity badge */}
              <div
                className="flex items-center gap-1.5 px-3 py-0.5 rounded-full mb-5 badge-pulse"
                style={{
                  background: "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(163,230,53,0.15))",
                  border: "1px solid rgba(59,130,246,0.4)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ boxShadow: "0 0 6px #60a5fa" }} />
                <span className="text-blue-300 uppercase tracking-widest" style={{ fontFamily: "'Orbitron', monospace", fontSize: 8 }}>
                  Stratos Edition · Ultra Rare
                </span>
              </div>

              {/* Main number — hero element */}
              <div className="relative flex items-center justify-center mb-1">
                {/* Number halo */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 180, height: 80,
                    background: "radial-gradient(ellipse, rgba(163,230,53,0.12) 0%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                />
                <span
                  className="number-glow relative z-10 font-black tracking-tight select-none"
                  style={{
                    fontFamily: "'Bebas Neue', 'Orbitron', monospace",
                    fontSize: 96,
                    lineHeight: 1,
                    color: "#a3e635",
                    letterSpacing: "-2px",
                  }}
                >
                  #{waitlistNumber.toString().padStart(4, '0')}
                </span>
              </div>

              {/* Sub-label */}
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.3))" }} />
                <span className="text-xs tracking-widest" style={{ color: "rgba(163,230,53,0.4)", fontFamily: "'Orbitron', monospace", fontSize: 8 }}>
                  STRATOS BLOCK
                </span>
                <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(163,230,53,0.3), transparent)" }} />
              </div>

              {/* Date row */}
              <div className="flex gap-5 mb-8 w-full justify-center">
                {[
                  { label: "Date", value: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                  { label: "Status", value: "Active" },
                  { label: "Spot", value: `#${waitlistNumber.toString().padStart(4, '0')}` },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-0.5">
                    <span
                      className="font-bold"
                      style={{ fontFamily: "'Orbitron', monospace", fontSize: 15, color: "#e2e8f0" }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="uppercase tracking-widest"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 9, color: "rgba(148,163,184,0.6)", letterSpacing: "0.2em" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="w-full h-px mb-6"
                style={{ background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.2), rgba(59,130,246,0.2), transparent)" }}
              />

              {/* Role badge */}
              <div className="relative">
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #a3e635)",
                    padding: 2,
                    borderRadius: 9999,
                  }}
                />
                <button
                  className="relative px-10 py-3 rounded-full font-black uppercase tracking-widest text-sm"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a5f 50%, #1a2e4a 100%)",
                    fontFamily: "'Orbitron', monospace",
                    fontSize: 13,
                    color: "#ffffff",
                    letterSpacing: "0.25em",
                    border: "1.5px solid rgba(59,130,246,0.6)",
                    boxShadow: "0 0 20px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {selectedRole && roles[selectedRole] ? roles[selectedRole].label.toUpperCase() : "MEMBER"}
                </button>
              </div>

              {/* Bottom micro details */}
              <div className="flex items-center gap-3 mt-6">
                <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 7, color: "rgba(100,116,139,0.5)", letterSpacing: "0.15em" }}>
                  STRATOS FOOTBALL · GLOBAL SOUTH
                </span>
              </div>

              {/* Token ID line */}
              <div className="flex items-center gap-2 mt-1">
                <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 7, color: "rgba(100,116,139,0.35)", letterSpacing: "0.1em" }}>
                  TOKEN ID: SF-STR-{waitlistNumber.toString().padStart(4, '0')}-2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="w-full max-w-xs">
          <div className="text-center mb-3">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
              Your Stratos Member Card
            </p>
            <p className="text-white text-sm font-medium">
              Share this exclusive digital collectible!
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {/* Save Image */}
            <button
              onClick={saveAsImage}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#b8ff56] hover:bg-[#a3e635] rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#001220]" />
            </button>

            {/* Twitter */}
            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-lg transition-colors"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* Telegram */}
            <button
              onClick={shareToTelegram}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0088cc] hover:bg-[#0077b5] rounded-lg transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareToLinkedIn}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0077b5] hover:bg-[#006698] rounded-lg transition-colors"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* Instagram */}
            <button
              onClick={shareToInstagram}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 rounded-lg transition-opacity"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#1a2332] hover:bg-[#232f42] rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8ff56]" />
              ) : (
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          </div>

          {/* Back home button */}
          <div className="text-center">
            <Link href="/">
              <Button variant="secondary" className="bg-transparent border border-[#1a2332] text-white hover:bg-[#0a0f14] text-sm w-full">
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
