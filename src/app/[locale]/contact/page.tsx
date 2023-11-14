'use client';
import React from 'react'

import {useTranslations} from 'next-intl';
function Page() {
  const t = useTranslations('ContactPage');
  return (
    <div>
    <div className=' bg-white  min-h-screen flex  flex-col justify-center items-center'><h1 className=' mt-6 text-3xl font-bold text-[#0072BC]'>{t('title')}</h1><h2 className=' mt-6 text-2xl font-bold text-[#0072BC]'>{t('email')}</h2><p className='mt-6'>{t('wey')} <a className=' mt-6 text-xl font-bold text-[#0072BC]' href="https://www.ethiotelecom.et/contact-us/" rel="noopener noreferrer" target="_blank">{t('our')}</a></p></div>

    </div>
  )
}

export default Page