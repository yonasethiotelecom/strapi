
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

import Link from 'next/link';
import SigninButton from './SigninButton';


const Navbar = () => {
  

  const [activeButton, setActiveButton] = useState('Home');
  const t = useTranslations('Navigation');
  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setActiveButton(buttonName);
  };
  return (
  
    <div className=" z-50  min-w-min bg-white flex items-center  justify-between shadow-2xl  shadow-slate-200 border space-x-4 sticky top-0 ">
      <div></div>
      <div className='flex items-center justify-center  space-x-4 mx-6'>
        <div className=' hidden  max-sm:block   '> <LocaleSwitcher /></div>
      <div>
        <Link
         onClick={() => handleButtonClick('')}
        href="/">
          <Image
            src="/imag/ethio-App-store-log-aadcbcacbfa4d99a13cd0cb079a36966.svg"
            alt="logo"
            width={200}
            height={51}
          />
        </Link>
      </div>

      <div>
        <Link
       onClick={() => handleButtonClick('Apps')}
className={`flex hover:underline focus:text-[#008FD5] text-${activeButton === 'Apps' ? 'blue' : 'gray'}-500 p-2 rounded-md`}
href="/Apps"
><svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      height="22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'rgb(141, 198, 63)' }}
    >
      <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"></path>
    </svg>{t('apps')}</Link>
      </div>

      <div>
        <Link

onClick={() => handleButtonClick('About')}
className={`flex hover:underline focus:text-[#008FD5] text-${activeButton === 'About' ? 'blue' : 'gray'}-500 p-2 rounded-md`}

         
          href="/about"
        >
          <svg
            className="text-green-500"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 448 512"
            height="22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: 'rgb(141, 198, 63)' }}
            
          >
          <path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"></path>
          </svg>     {t('about')}
        </Link>
      </div>
     
      <div>
        <Link
        onClick={() => handleButtonClick('contact')}
        className={`flex hover:underline focus:text-[#008FD5] text-${activeButton === 'contact' ? 'blue' : 'gray'}-500 p-2 rounded-md`}
          href="/contact"
        >
          <svg
            className="text-green-500"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: 'rgb(141, 198, 63)' }}
          >
           <path d="M594.3 601.5a111.8 111.8 0 0 0 29.1-75.5c0-61.9-49.9-112-111.4-112s-111.4 50.1-111.4 112c0 29.1 11 55.5 29.1 75.5a158.09 158.09 0 0 0-74.6 126.1 8 8 0 0 0 8 8.4H407c4.2 0 7.6-3.3 7.9-7.5 3.8-50.6 46-90.5 97.2-90.5s93.4 40 97.2 90.5c.3 4.2 3.7 7.5 7.9 7.5H661a8 8 0 0 0 8-8.4c-2.8-53.3-32-99.7-74.7-126.1zM512 578c-28.5 0-51.7-23.3-51.7-52s23.2-52 51.7-52 51.7 23.3 51.7 52-23.2 52-51.7 52zm416-354H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496z"></path>
          </svg>{t('contact')}
        </Link>
      </div>
      </div>
      <div className=' hidden sm:flex sm:space-x-2' >
      <SigninButton />
      <LocaleSwitcher />
      </div>
     {/*  <Link href="/Login">Login</Link>
      <Link href="/Logout">Log_Out</Link> */}
    </div>
    
  );
};

export default Navbar;


