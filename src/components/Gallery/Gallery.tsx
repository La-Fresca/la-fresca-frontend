import React from 'react'
import { ImagesSet } from './Images-set'
import { TitleBox } from '../Landing/TitleBox'

export const Gallery = () => {
  return (
    <div className='bg-transparent'>
        {/* <h1 className='text-xl'>Gallery</h1> */}
        <TitleBox title='gallery' subtitle='la Fresca cafe' button='' ClassName='relative top-0 lect-0 w-screen h-fit px-20 mb-10 bg-white ' URLLink='' />
        <ImagesSet />
    </div>
  )
}
