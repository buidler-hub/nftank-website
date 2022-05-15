import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Modal({ children }: Props) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70 p-2">
      <div className="relative w-full max-w-4xl rounded-xl bg-white p-7">
        {children}
      </div>
    </div>
  )
}
