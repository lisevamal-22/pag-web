import React, { useEffect, useRef, useState } from 'react';

/**
 * Vídeos de cada servicio. Los actuales son RECURSOS PROVISIONALES generados a partir de las
 * imágenes ilustrativas del proyecto (movimiento de cámara + capas gráficas en colores de marca).
 * No son grabaciones reales de SENSIA LABs: para sustituirlos basta con reemplazar los archivos
 * de /public/media/servicios/ manteniendo el nombre, y poner `provisional: false`.
 */
export const SERVICE_VIDEOS: Record<string, { src: string; poster: string; provisional: boolean }> = {
  'investigacion-consumidor': {
    src: '/media/servicios/investigacion-consumidor.mp4',
    poster: '/media/servicios/investigacion-consumidor-poster.jpg',
    provisional: true,
  },
  neuromarketing: {
    src: '/media/servicios/neuromarketing.mp4',
    poster: '/media/servicios/neuromarketing-poster.jpg',
    provisional: true,
  },
  percepcion: {
    src: '/media/servicios/percepcion.mp4',
    poster: '/media/servicios/percepcion-poster.jpg',
    provisional: true,
  },
  comportamiento: {
    src: '/media/servicios/comportamiento.mp4',
    poster: '/media/servicios/comportamiento-poster.jpg',
    provisional: true,
  },
  'marketing-sensorial': {
    src: '/media/servicios/marketing-sensorial.mp4',
    poster: '/media/servicios/marketing-sensorial-poster.jpg',
    provisional: true,
  },
  'experiencia-marca': {
    src: '/media/servicios/experiencia-marca.mp4',
    poster: '/media/servicios/experiencia-marca-poster.jpg',
    provisional: true,
  },
};

interface ServiceVideoProps {
  serviceId: string;
  /** Descripción accesible del contenido del vídeo */
  label: string;
  className?: string;
  /** Muestra la etiqueta «Vídeo provisional» (por defecto, si el recurso es provisional) */
  showProvisionalTag?: boolean;
}

/**
 * Vídeo silencioso en bucle, sin controles, que:
 * - solo descarga el archivo cuando el contenedor se acerca al viewport,
 * - se reproduce cuando es visible y se pausa cuando deja de serlo (o la pestaña se oculta),
 * - aparece con un fundido suave sobre su póster,
 * - respeta `prefers-reduced-motion` (muestra solo el póster estático).
 */
export const ServiceVideo: React.FC<ServiceVideoProps> = ({
  serviceId,
  label,
  className = '',
  showProvisionalTag,
}) => {
  const media = SERVICE_VIDEOS[serviceId];
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Carga diferida: solo se asigna `src` cuando el recurso está cerca de verse
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || shouldLoad || reducedMotion) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad, reducedMotion]);

  // Reproducción / pausa según visibilidad real
  useEffect(() => {
    const el = wrapperRef.current;
    const video = videoRef.current;
    if (!el || !video || !shouldLoad || reducedMotion) return;

    let visible = false;
    const sync = () => {
      if (visible && document.visibilityState === 'visible') {
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => undefined);
      } else if (!video.paused) {
        video.pause();
      }
    };

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              visible = entries.some((e) => e.isIntersecting);
              sync();
            },
            { threshold: 0.2 }
          )
        : null;
    if (io) io.observe(el);
    else {
      visible = true;
      sync();
    }
    document.addEventListener('visibilitychange', sync);
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [shouldLoad, reducedMotion]);

  if (!media) return null;
  const tagVisible = showProvisionalTag ?? media.provisional;

  return (
    <div ref={wrapperRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={media.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {!reducedMotion && (
        <video
          ref={videoRef}
          src={shouldLoad ? media.src : undefined}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay={false}
          preload={shouldLoad ? 'auto' : 'none'}
          disablePictureInPicture
          controls={false}
          aria-label={label}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {reducedMotion && <span className="sr-only">{label}</span>}
      {tagVisible && (
        <span className="absolute top-3 right-3 z-20 px-2 py-0.5 bg-black/70 text-white/85 text-[9px] font-semibold uppercase tracking-widest pointer-events-none">
          Vídeo provisional
        </span>
      )}
    </div>
  );
};
