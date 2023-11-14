'use client';

import {useTranslations} from 'next-intl';

function Page() {
  
  const t = useTranslations('AboutPage');
  return (
    <div>
      
      <div className=' bg-white  min-h-screen flex  flex-col justify-center items-center' >
        <h1 className=' mt-6 text-3xl font-bold text-[#0072BC]' >{t('description')}</h1>
        <p className=' mt-6 text-xl'>{t('description2')}</p>
        <p className='mt-6 text-xl text-[#008FD5]'><a href="https://www.ethiotelecom.et/profile/" target="_blank">{t('description3')}</a></p>
        </div>

    </div>
  )
}

export default Page
