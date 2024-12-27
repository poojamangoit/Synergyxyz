/**
 * A custom cursor component that follows the user's mouse movements and is hidden during page transitions.
 *
 * This component is used to provide a custom cursor experience for the application. It listens for mouse move events and updates the position of a fixed div element to follow the cursor. It also listens for page transition events and hides the cursor during the transition, then shows it again when the transition is complete.
 *
 * The custom cursor is only visible on larger screens (md and above) and is positioned using absolute positioning with a mix-blend-mode to create a unique visual effect.
 */
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current ) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  useEffect(() => {
    // Hide the custom cursor during page transitions
    const handleRouteChangeStart = () => {
      if (cursorRef.current ) {
        cursorRef.current.style.display = 'none';
      }
    };

    const handleRouteChangeComplete = () => {
      if (cursorRef.current ) {
        cursorRef.current.style.display = 'block';
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
    {isMobile ? <></>:
    <div
      ref={cursorRef}
      className="fixed w-8 h-8 bg-primary-blue rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-multiply hidden md:block"
    ></div>}
    </>
  );
};

export default CustomCursor;
