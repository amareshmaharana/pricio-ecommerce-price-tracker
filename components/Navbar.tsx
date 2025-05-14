import Link from "next/link"
import Image from "next/image"

const navIcons = [
  {
    src: '/assets/icons/search.svg', alt: 'search'
  },
  {
    src: '/assets/icons/black-heart.svg', alt: 'heart'
  },
  {
    src: '/assets/icons/user.svg', alt: 'user'
  },
]

const Navbar = () => {
  return (
    <>
      <header className='w-full'>
        <nav className='nav'>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/icons/logo.svg" alt="Logo" width={27} height={27} />
            <p className="nav-logo">
              Pri<span className="text-primary">Cio</span>
            </p>
          </Link>
          <div className="flex items-center gap-5">
            {navIcons.map((icon) => (
              <Image key={icon.alt} src={icon.src} alt={icon.alt} width={28} height={28} className="object-contain cursor-pointer" />
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar