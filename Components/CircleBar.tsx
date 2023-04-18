import { useEffect, useRef, useState } from "react";

interface CircularProgressbarProps {
  value: number;
  maxValue: number;
}

export default function CircularProgressbar({
  value,
  maxValue,
}: CircularProgressbarProps) {
  
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);

  // update the progress bar based on persentage.
  useEffect(() => {
    const percentage = Math.round((value / maxValue) * 100);
    const progressValue = (percentage / 100) * 628.32; // 628.32 is the circumference of the circle with radius 100
    setProgress(progressValue);

    const circle = circleRef.current;
    if (circle) {
      circle.style.strokeDasharray = `${progressValue} 628.32`;
    }
  }, [value, maxValue]);

  return (
    <svg viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        strokeWidth="20"
        stroke="#ccc"
      />
      <circle
        ref={circleRef}
        cx="100"
        cy="100"
        r="90"
        fill="none"
        strokeWidth="20"
        stroke="#5f2eea"
        strokeDasharray="0 628.32"
        strokeLinecap="round"
        transform="rotate(-90, 100, 100)"
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="50"
        fontWeight="bold"
        fill="#5f2eea"
      >
        {value}/{maxValue}
      </text>
    </svg>
  );
}
