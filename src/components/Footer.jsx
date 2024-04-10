import React from 'react'
import { footerLinks } from '/src/constants/index.js'
const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
      <div className=' screen-max-width'>
        <div>
          <p className=' font-semibold text-gray text-xs'>
            More ways to shop:{' '}
            <span className='ubderline text-blue'>
              <a href='https://www.apple.com/retail/' target='_blank'>Find an Apple Store</a>{' '}
            </span>
            or{' '}
            <span className='ubderline text-blue'>
              <a href='https://locate.apple.com/' target='_blank'>other retailer</a>{' '}
            </span>
            near you. Or call 1-800-MY-APPLE.
          </p>
        </div>
        <div className=' bg-neutral-700 my-5 h-[1px] w-full' />
        <div className=' flex md:flex-row flex-col md:items-center justify-between'>
          <p className="text-xs font-semibold text-gray-700 flex flex-wrap items-center gap-2">
            © 2024 Apple Inc. All rights reserved.
            <span className="text-white font-normal ">
              Developed by <a href="https://www.mgoyeghiaian.com/" className="text-white  font-semibold  hover:underline hover:text-gray-200">Mgo Yeghiaian</a>
            </span>
          </p>

          <div className='flex'>
            {footerLinks.map((link, index) => (
              <p key={link} className=' font-semibold text-gray text-xs'>
                {link}{''}
                {index !== footerLinks.length - 1 && (<a className='mx-2'>|</a>)
                }
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer