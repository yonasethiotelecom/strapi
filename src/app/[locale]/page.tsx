"use client"
import ProductCard from '../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {BiSolidDashboard} from 'react-icons/Bi'

import { icons } from 'react-icons';
import LoadingPage from '../loading';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';




const fetchList = async ({ queryKey }: any) => {
  
  const t = queryKey[1];

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/?locale=${t}&filters[hide][$eq]=false&sort=createdAt:desc,updatedAt&populate=*`);
    const data = await response.json();
    return data;
    
  }

const ProductPage: React.FC = () => {
 
  const t = useTranslations('language');
   
  const  w= useTranslations('IndexPage');
  const aa = t('lan')
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['frontApps',aa],
    queryFn: fetchList,
  })

  if (isPending) {
    return <span><LoadingPage /></span>

 

  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  return (
    <div className=' bg-white  flex flex-col items-center justify-center  min-h-screen'>
      <div className=' text-center text-[#018FD3]  font-semibold text-3xl mt-4 ' >{w('title')}</div>
      <h3  className=' text-center text-[#018FD3]  font-medium text-2xl m-4'>{w('title2')} </h3>
       
      <div className={`mt-6 mx-auto gap-5 ${  data?.data?.length > 2? ' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5':data.data.length > 1?'  grid grid-cols-1 sm:grid-cols-2 gap-5':'flex justify-center items-center' }` }>
     
     
    
      {data.data.map((product:any) => (

<Suspense  key={product.id} fallback={<div className="text-center text-2xl text-gray-600">
Loading...
</div>}>
        <ProductCard  product={product} />
        </Suspense>
      ))}
     
    </div>

    <div >
    <Link className='flex justify-center items-center  text-[#008FD5]  text-xl  hover:text-[#0072BC] font-semibold my-12' href="/Apps" >{w('footer')} <BiSolidDashboard/></Link>
    </div>
    </div>
  );
};

export default ProductPage;
