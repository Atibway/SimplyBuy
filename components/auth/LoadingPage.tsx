"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
interface LoadingPageProps {
  message?: string;
  className?: string;
}

const LoadingPage = ({ message = "Loading...", className }: LoadingPageProps) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={cn(
      "fixed inset-0 bg-background flex flex-col items-center justify-center z-50",
      "transition-opacity duration-300 ease-in-out",
      className
    )}>
      <div className="w-full max-w-md px-8 flex flex-col z-50 items-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary opacity-20 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-primary opacity-70" 
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 4.75V6.25M18.2483 5.75171L17.1872 6.81282M19.25 12H17.75M18.2483 18.2483L17.1872 17.1872M12 17.75V19.25M6.81282 17.1872L5.75171 18.2483M4.75 12H6.25M5.75171 5.75171L6.81282 6.81282" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-light text-foreground mb-6">{message}</h2>
        
        <div className="w-full mb-8">
          <Progress value={progress} className="h-1" />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Please wait while we complete this process
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
