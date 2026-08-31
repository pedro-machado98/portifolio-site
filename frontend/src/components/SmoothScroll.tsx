import { ReactNode } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
};
