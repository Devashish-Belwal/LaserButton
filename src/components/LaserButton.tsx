import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./LaserButton.css";

export interface LaserButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  beamLength?: number;
  laserColor?: string;
  animationDuration?: string;
  children: React.ReactNode;
}

export const LaserButton = forwardRef<
  HTMLButtonElement,
  LaserButtonProps
>(
  (
    {
      children,
      className = "",
      beamLength = 60,
      laserColor = "#00f0ff",
      animationDuration = "2.5s",
      style,
      ...props
    },
    ref
  ) => {
    const rectRef = useRef<SVGRectElement>(null);
    const [perimeter, setPerimeter] = useState(0);

    useLayoutEffect(() => {
      if (!rectRef.current) return;

      const updatePerimeter = () => {
        if (rectRef.current) {
          setPerimeter(rectRef.current.getTotalLength());
        }
      };

      updatePerimeter();

      const observer = new ResizeObserver(updatePerimeter);
      observer.observe(rectRef.current);

      return () => observer.disconnect();
    }, []);

    const gapLength = Math.max(0, perimeter - beamLength);

    const customProperties = {
      "--laser-color": laserColor,
      "--laser-dasharray": `${beamLength}px ${gapLength}px`,
      "--laser-perimeter": `-${perimeter}px`,
      "--laser-duration": animationDuration,
      ...style,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        className={`laser-btn ${className}`.trim()}
        style={customProperties}
        {...props}
      >
        <svg className="laser-svg" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            className="laser-track"
          />

          <rect
            ref={rectRef}
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            className="laser-beam"
          />
        </svg>

        <span className="laser-btn-content">{children}</span>
      </button>
    );
  }
);

LaserButton.displayName = "LaserButton";