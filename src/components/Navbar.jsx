import { appleImg, searchImg, bagImg } from '/src/utils'
import { navLists } from '/src/constants'
const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 w-full py-4 sm:px-10 px-5 flex justify-between items-center bg-black/70 backdrop-blur-md border-b border-white/5'>
      <nav className='flex w-full screen-max-width'>
        <img src={appleImg} alt='Apple' width={14} height={18} />
        <div className='flex flex-1 justify-center max-sm:hidden'>
          {navLists.map((nav) => (
            <div key={nav} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-colors duration-200'>
              {nav}
            </div>
          ))}
        </div>
        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 '>
          <img src={searchImg} alt='Search' width={18} height={18} className='cursor-pointer opacity-80 hover:opacity-100 transition-opacity' />
          <img src={bagImg} alt='Bag' width={18} height={18} className='cursor-pointer opacity-80 hover:opacity-100 transition-opacity' />
        </div>
      </nav>
    </header>
  )
}

export default Navbar