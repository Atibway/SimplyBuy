import { cn } from '@/lib/utils'
import React, { MouseEventHandler } from 'react'

interface IconProps{
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string  
}

const IconButton: React.FC<IconProps> = ({
    onClick,
    icon,
    className
}) => {
  return (
    <div>
        <button
        onClick={onClick}
        className={cn(
            "rounded-full flex items-center bg-white border shadow-md p-2 hover:scale-110 transition",
            className
        )}
        >
{icon}
        </button>
    </div>
  )
}

export default IconButton