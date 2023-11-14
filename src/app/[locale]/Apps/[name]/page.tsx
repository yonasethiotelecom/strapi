"use client"
import { Suspense, useState } from 'react';
import LoadingPage from '../../../loading';

import {  useQuery, useQueryClient } from '@tanstack/react-query'

import Cards from './card';
import Product from './card';
import SideCard from './sideCard';

import {useTranslations} from 'next-intl';




import Reting from './Reting';
import RetingDisplay2 from './RetingDisplay2';
import { all } from 'axios';


interface Product {
  id: number;
  attributes: {
  
    title: string;
    description: string;
    playStoreLink: string;
    image: {
      data:[ {
        attributes: {
          formats: {
            thumbnail: {
              url: string;
            };
          };
        };
      },
    ]
    };
    file: {
      data: {
        attributes: {
          createdAt: string; // You might want to use a more specific date type
          updatedAt: string; // You might want to use a more specific date type
          url: string;
          size: number;
        };
      };
    };
    descriptionImage:{
      data: [{
        attributes: {
          formats:{
            small:{
              url: string;
            },
            medium:{
              url: string;
            }
          }
        };
      },
    ]
    };
  };
}






const fetchList2 = async ({ queryKey }: any) => {
  const Id = queryKey[1];

  const t= queryKey[2];


  const response2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${Id}?populate=*`);
  let data2 = await response2.json();
  let idLocale :number;
if(t===data2.data.attributes.locale){
  idLocale=data2.data.id
}else{
 
    idLocale= (data2.data.attributes.localizations.data.find((item: { attributes: { locale: any; }; }) => item.attributes.locale === t))?.id;}


    const response3 = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/?locale=${t}&filters[id][$ne]=${idLocale}&sort=createdAt:desc,updatedAt&populate=*`);
const data3=await response3.json();



  return data3;
  
}

const fetchList = async ({ queryKey }: any) => {
  const Id = queryKey[1];
  const t= queryKey[2];

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${Id}?populate=*`);
  let data = await response.json();
  if(t!==data.data.attributes.locale){
    const idLocale: number  = (data.data.attributes.localizations.data.find((item: { attributes: { locale: any; }; }) => item.attributes.locale === t))?.id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${idLocale}?populate=*`);
data=await response.json();
return data;
  }
  return data;
};

type DynamicFormParams = {
  params: {
    name: string;
  };
};
let dataa = null
const DynamicComponent: React.FC<DynamicFormParams> = ({ params: { name } }) => {
 
const queryClient = useQueryClient()

const t = useTranslations('language');
const aa = t('lan')




  const { isPending, isError, data, error } = useQuery({
    queryKey: ['DynamicComponent', name,aa],
    queryFn: fetchList,
     initialData: () => {
      const product: any | undefined = queryClient
        .getQueryData<{ data:any }>(["frontApps"])
        ?.data.data?.find((product:any) => product.id === name);
      if (product) {
        return {data:{ data: product }};
      } else {
        return undefined;
      }
    }, 
  });



  

  const { isPending:isPending2, isError:isError2, data:data2, error:error2 } = useQuery({
    queryKey: ['SideComponent',name,aa],
    queryFn: fetchList2,
   /*  initialData: () => {
      // Use a todo from the 'todos' query as the initial data for this todo query
      const product2 =queryClient.getQueryData(['frontApps'])

      if (product2) {
        console.log({data: product2})
        return {data: product2};
      } else {
        return undefined;
      }
    },  */
  });



  if (isPending||isPending2) {
    return <LoadingPage />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

 
  if (isError2) {
    return <span>Error: {error2.message}</span>;
  }


  return (
    <div className='bg-white flex flex-col w-full ' >
   <div className=' bg-white flex  w-full  justify-between  items-center min-h-screen'>
       

  <div className="w-full grid grid-cols-1  md:grid-cols-4  gap-4">
    <div className='col-span-3'>
    <Suspense fallback={<div className="text-center text-2xl text-gray-600">
  Loading...
</div>
}>
    <Cards product={data.data as Product}  productId={ name as string} />
    </Suspense>
    <div className=' flex  justify-start  items-start  max-md:flex-col mx-6'>
    <Suspense fallback={<div className="text-center text-2xl text-gray-600">
  Loading...
</div>
}>
<Reting  productId={name}  />
</Suspense>
<Suspense fallback={<div className="text-center text-2xl text-gray-600">
  Loading...
</div>
}>
<RetingDisplay2  productId={name}   />
</Suspense>
</div>
    </div>
   <div>
    <div className="  mt-6  hiddenw md:grid   md:grid-cols-1  md:gap-4">
     
    
     {data2.data.map((product:any) => (
       <SideCard key={product.id} product={product} />
        
     ))}   </div>
    </div>

    </div> 



    </div>
  

</div>
    );
};

export default DynamicComponent;