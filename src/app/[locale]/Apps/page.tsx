"use client"
import ProductCard from '../../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../loading';
import {useTranslations} from 'next-intl';
import { Suspense } from 'react';


const fetchList = async ( { queryKey }: any) => {

  const t = queryKey[1];

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/?locale=${t}&sort=createdAt:desc,updatedAt&populate=*`);
    const data = await response.json();
    return data;
    
  }

const ProductPage: React.FC = () => {
  const t = useTranslations('language');
  const w = useTranslations('Apps');
  const aa = t('lan')

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['frontAppss',aa],
    queryFn: fetchList,
  })

  if (isPending) {
    return <span><LoadingPage /></span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  return (
    <div className=' bg-white  flex flex-col items-center justify-center  min-h-screen  '>
        <h2 className=' text-center  text-[#0072BC] text-3xl my-6'>{w("title")}</h2>
       

  
<div className={`mt-6 mx-auto gap-5 ${  data.data.length > 2? ' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5':data.data.length > 1?'  grid grid-cols-1 sm:grid-cols-2 gap-5':'flex justify-center items-center' }` }>
     

    
      {data.data.map((product:any) => (
  <Suspense key={product.id} fallback={<div className="text-center text-2xl text-gray-600">
  Loading...
</div>
}>
        <ProductCard  product={product} />
        </Suspense>
      ))}
 
    </div>
    </div>
  );
};

export default ProductPage;
