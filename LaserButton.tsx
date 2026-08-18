import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

    return (<>
      <style>
        {
          `.laser-btn {
              position: relative;
              display: inline-flex;
              align-items: center;
              justify-content: center;

              padding: 12px 28px;
              background-color: #0f172a;
              color: #ffffff;

              font-size: 1rem;
              font-weight: 600;

              border: none;
              border-radius: 12px;

              cursor: pointer;
              outline: none;
            }

            .laser-svg {
              position: absolute;
              inset: 0;

              width: 100%;
              height: 100%;

              pointer-events: none;
              overflow: visible;
            }

            .laser-track {
              fill: none;
              stroke: rgba(255, 255, 255, 0.1);
              stroke-width: 2px;
            }

            .laser-beam {
              fill: none;
              stroke: var(--laser-color, #00f0ff);
              stroke-width: 2px;
              stroke-linecap: round;

              stroke-dasharray: var(--laser-dasharray);

              filter: drop-shadow(0 0 6px var(--laser-color, #00f0ff));

              animation: run-laser var(--laser-duration, 2.5s) linear infinite;
            }

            .laser-btn-content {
              position: relative;
              z-index: 1;
            }

            @keyframes run-laser {
              from {
                stroke-dashoffset: 0;
              }

              to {
                stroke-dashoffset: var(--laser-perimeter);
              }
            }`
        }
      </style>
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
    </>);
  }
);

LaserButton.displayName = "LaserButton";