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
        className="w-full h-full object-cover opacity-35 filter contrast-110 brightness-85 transition-opacity duration-1000"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Escudo de Contraste Profundo: Blindagem escura sólida na coluna de leitura à esquerda */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(7,8,11,0.98) 0%, rgba(7,8,11,0.94) 48%, rgba(7,8,11,0.65) 75%, rgba(7,8,11,0.4) 100%)',
        }}
      />
      {/* Vinheta vertical suave para bordas superior e inferior */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(7,8,11,0.85) 0%, transparent 18%, transparent 80%, rgba(7,8,11,0.95) 100%)',
        }}
      />
    </div>
  );
};
