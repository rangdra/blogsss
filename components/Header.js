import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full text-gray-100 bg-gray-900 shadow-md">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link href="/">
          <a className="flex items-center mb-4 font-medium md:w-1/5 title-font md:justify-start md:mb-0">
            <Image src="/logo.png" width={40} height={40} alt="logo" />
            <span className="ml-3 text-xl">DevSpace</span>
          </a>
        </Link>
        <nav className="flex flex-wrap items-center justify-end text-base md:w-4/5 md:ml-auto">
          <Link href="/blog">
            <a className="mx-5 uppercase cursor-pointer hover:text-indigo-300">
              Blog
            </a>
          </Link>
          <Link href="/about">
            <a className="mx-5 uppercase cursor-pointer hover:text-indigo-300">
              About
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
