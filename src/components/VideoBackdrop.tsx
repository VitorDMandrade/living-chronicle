import React, { useRef, useState } from 'react';

interface VideoBackdropProps {
  videoSrc: string;
}

export const VideoBackdrop: React.FC<VideoBackdropProps> = ({ videoSrc }) => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (hasError) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setHasError(true)}
        className="w-full h-full object-cover opacity-30 mix-blend-screen filter contrast-125 brightness-90 transition-opacity duration-1000"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Vinheta escura de contraste para garantir leitura perfeita dos cartões */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080b] via-[#06080b]/60 to-[#06080b]/90" />
    </div>
  );
};
