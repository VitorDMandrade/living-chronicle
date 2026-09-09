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
        className="w-full h-full object-cover opacity-45 mix-blend-screen filter contrast-125 brightness-95 transition-opacity duration-1000"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Overlay radial concêntrico para blindar o contraste dos textos dos atos */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(9,10,12,0.25) 0%, rgba(9,10,12,0.88) 100%)'
        }}
      />
    </div>
  );
};
