import { useLayoutEffect, useRef, useState, type ReactElement } from "react";
import "./LaserButton.css";

export default function LaserButton({
  children,
  className = "",
  ...props
}: {
  children: ReactElement,
  className: string
}) {
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
  }, []);

  const gapLength = Math.max(0, perimeter - 60);

  const customProperties = {
    "--laser-dasharray": `60px ${gapLength}px`,
    "--laser-perimeter": `-${perimeter}px`,
  } as React.CSSProperties;

  return (
    <button
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

      <span className="laser-btn-content">
        {children}
      </span>
    </button>
  );
}