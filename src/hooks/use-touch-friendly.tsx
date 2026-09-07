
import { useIsMobile } from "./use-mobile";

export interface TouchFriendlyProps {
  /** Minimum touch target size in pixels */
  minTouchSize?: number;
  /** Additional padding for touch targets */
  touchPadding?: number;
  /** Enable haptic feedback if supported */
  enableHaptics?: boolean;
}

export const useTouchFriendly = (props: TouchFriendlyProps = {}) => {
  const isMobile = useIsMobile();
  const {
    minTouchSize = 44,
    touchPadding = 8,
    enableHaptics = true
  } = props;

  const getTouchFriendlyClasses = (baseClasses: string = "") => {
    if (!isMobile) return baseClasses;
    
    return `${baseClasses} ${
      // Ensure minimum touch target size
      `min-h-[${minTouchSize}px] min-w-[${minTouchSize}px]`
    } ${
      // Add touch padding
      `p-${Math.ceil(touchPadding / 4)}`
    } ${
      // Better touch feedback
      'active:scale-95 transition-transform duration-150'
    }`;
  };

  const handleTouchFeedback = () => {
    if (!isMobile || !enableHaptics) return;
    
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Very short vibration
    }
  };

  const getTouchFriendlyButtonProps = () => ({
    className: getTouchFriendlyClasses(),
    onTouchStart: handleTouchFeedback,
    style: isMobile ? {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    } : {}
  });

  return {
    isMobile,
    minTouchSize,
    touchPadding,
    getTouchFriendlyClasses,
    handleTouchFeedback,
    getTouchFriendlyButtonProps
  };
};
