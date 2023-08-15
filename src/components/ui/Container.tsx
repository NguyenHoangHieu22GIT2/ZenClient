import React, { PropsWithChildren } from 'react'

export const Container = (props: PropsWithChildren) => {
  return (
    <div className='max-w-sm md:max-w-md lg:max-w-5xl mx-auto'>
      {props.children}
    </div>
  )
}
