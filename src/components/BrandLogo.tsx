import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'full' | 'icon';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  showSubtitle = true,
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mayer_heshel_logo_img');
      if (saved) {
        setCustomLogoUrl(saved);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const logoSrc = customLogoUrl || '/logo.svg';

  // Variant: Icon only
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-xl ${className}`}>
        <img
          src={logoSrc}
          alt="মায়ের হেসেল - হোমমেড খাবার"
          className="w-full h-full object-contain p-0.5"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to svg directly
            (e.target as HTMLImageElement).src = '/logo.svg';
          }}
        />
      </div>
    );
  }

  // Variant: Full square crest
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl p-1.5 shadow-md border border-stone-200/80 transition-transform hover:scale-105">
          <img
            src={logoSrc}
            alt="মায়ের হেসেল - হোমমেড খাবার"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // Variant: Footer (High contrast for dark background)
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md shrink-0 border border-emerald-500/40">
          <img
            src={logoSrc}
            alt="মায়ের হেসেল - হোমমেড খাবার"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-white tracking-tight">মায়ের হেসেল</span>
          </div>
          {showSubtitle && (
            <span className="text-xs font-semibold text-amber-300/90 tracking-wide">
              হোমমেড খাবার
            </span>
          )}
        </div>
      </div>
    );
  }

  // Variant: Header (Default)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white p-0.5 shadow-xs border border-emerald-700/20 group-hover:border-[#1B5E20] group-hover:scale-105 transition-all shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={logoSrc}
          alt="মায়ের হেসেল - হোমমেড খাবার"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1B5E20] leading-none">
            মায়ের হেসেল
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-emerald-100 text-[#1B5E20] font-bold px-1.5 py-0.5 rounded border border-emerald-300">
            হোমমেড
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] sm:text-xs text-stone-600 font-bold tracking-wider mt-0.5">
            হোমমেড খাবার
          </span>
        )}
      </div>
    </div>
  );
};
