import React, { FC } from "react";

interface ProgressbarProps {
  progress: number;
  total: number;
}

export default function ProgressBar({ progress, total }: ProgressbarProps) {
  const progressPercentage = (progress / total) * 100;

  return (
    <>
    
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        >
        </div>
      </div>
    </>
  );
}
