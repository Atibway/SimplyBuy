"use client"

import IconButton from "@/components/frontentend/components/ui/iconButton";
import { Share2 } from "lucide-react"
import { MouseEventHandler } from "react";


export const ShareButton = ({ url, title, text }:{
    url: string;
    title: string;
    text: string
}) => {
  const handleShare: MouseEventHandler<HTMLButtonElement> = async(event)=> {
    event.stopPropagation() 
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <IconButton
    onClick={handleShare}
    icon={<Share2 size={20} className='text-blue-600' />}
/>
    
  );
};

