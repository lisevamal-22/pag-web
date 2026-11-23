import React from 'react';

interface IsotipoProps {
  className?: string;
  size?: number;
}

/**
 * Isotipo oficial original extraído directamente del manual de marca (gdd.png).
 * Estático, sin modificaciones de proporciones, forma ni colores.
 */
export const SensiaIsotipo: React.FC<IsotipoProps> = ({ className = '', size = 64 }) => {
  return (
    <img
      src="/assets/brand/isotipo.png"
      alt="Isotipo oficial de SENSIA LABs"
      width={size}
      height={Math.round(size * (188 / 218))}
      className={`shrink-0 select-none object-contain ${className}`}
      draggable={false}
    />
  );
};

interface SubmarkProps {
  size?: number;
  className?: string;
}

/**
 * Submarca oficial original extraída directamente del manual de marca (gdd.png).
 * Estática, sin modificaciones.
 */
export const SensiaSubmark: React.FC<SubmarkProps> = ({ size = 48, className = '' }) => {
  return (
    <img
      src="/assets/brand/submarca.png"
      alt="Submarca SENSIA LABs"
      width={Math.round(size * (202 / 152))}
      height={size}
      className={`shrink-0 select-none object-contain ${className}`}
      draggable={false}
    />
  );
};

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Logotipo principal oficial extraído directamente del manual de marca (gdd.png).
 * En fondos oscuros se presenta sobre una base blanca limpia para respetar
 * estrictamente los colores, tipografía y proporciones originales sin alterar el archivo.
 * Completamente estático.
 */
export const SensiaLogo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  const height = size === 'sm' ? 34 : size === 'lg' ? 54 : 42;
  const width = Math.round(height * (259 / 172));

  const img = (
    <img
      src="/assets/brand/logo-principal.png"
      alt="SENSIA LABs"
      width={width}
      height={height}
      className={`shrink-0 select-none object-contain block ${className}`}
      draggable={false}
    />
  );

  if (variant === 'light') {
    return <span className="inline-flex items-center bg-white px-4 py-2.5 shrink-0">{img}</span>;
  }

  return img;
};
