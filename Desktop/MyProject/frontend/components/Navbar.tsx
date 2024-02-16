import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS } from '../constants'
import Button from './Button'

function Navbar() {
  return (

    <nav className=' fixed top-0 left-0 w-full flex justify-between items-center px-5 bg-transparent backdrop-blur-md border-b-4 transition-opacity z-50 rounded-full  '>
      <Link href="/" className='flex py-1'>
        <Image src="/you-and-me-logo.png" width={150} height={100} alt='Website logo' />
      </Link>
      <ul className='space-x-3 hidden h-full gap-12 lg:flex' >
        {NAV_LINKS.map( (link) => (
          <Link href={link.href} key={link.key}>{link.label}</Link> 
        ) )}
      </ul>
      <div className='space-x-3 hidden h-full lg:flex'>
      <Button 
        type="button"
        title="Sign Up"
        variant="btn_1"
      />
      <Button
        type='button'
        title='Login'
        variant='btn_2'
      />
      </div>
      <Image src="menu.svg" alt='' width={20} height={20} className='lg:hidden'/>
    </nav>
  )
}

export default Navbar