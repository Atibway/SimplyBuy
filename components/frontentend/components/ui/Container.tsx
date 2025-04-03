
import React from 'react'

interface Containerprops {
    children: React.ReactNode;
    className? : string
}

export const Container: React.FC<Containerprops> = ({children, className}) => {
  return (
    <div className={`mx-auto max-w-7xl ${className}`}>
{children}
    </div>
  )
}
