declare module 'lucide-react' {
    import * as React from 'react';
    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: number | string;
      color?: string;
      strokeWidth?: number | string;
      absoluteStrokeWidth?: boolean;
    }
  
    export const Phone: React.FC<IconProps>;
    export const Menu: React.FC<IconProps>;
    export const X: React.FC<IconProps>;
  }
  