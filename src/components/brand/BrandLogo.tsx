import React from 'react';
import brandCyanBlack from '../../assets/brand/brand_cyan_black.svg';
import brandCyanWhite from '../../assets/brand/brand_cyan_white.svg';

export interface BrandLogoProps {
  isDark?: boolean;
  className?: string;
  alt?: string;
}

/**
 * Reusable Elleva Brand Logo component.
 * Automatically renders:
 * - Light Theme -> brand_cyan_black.svg
 * - Dark Theme  -> brand_cyan_white.svg
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  isDark = false,
  className = 'h-5 sm:h-6 w-auto object-contain',
  alt = 'ELLEVA',
}) => {
  const logoSrc = isDark ? brandCyanWhite : brandCyanBlack;

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`block select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};
