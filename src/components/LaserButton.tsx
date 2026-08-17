import type { ReactElement } from "react";
import "./LaserButton.css";

 export default function LaserButton({
  children,
  className = "",
  ...props
}:{
  children: ReactElement,
  className: string
}) {
  return (
    <button
      className={`laser-btn ${className}`.trim()}
      {...props}
    >
      <svg className="laser-svg" aria-hidden="true">
        {/* Static border */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="12"
          className="laser-track"
        />

        {/* Laser segment */}
        <rect
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