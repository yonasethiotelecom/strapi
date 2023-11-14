import React from 'react';
import {CgDetailsMore } from 'react-icons/Cg';
import {LuTally1} from 'react-icons/Lu'
import Link from 'next/link';
import download from './download';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import RetingDisplayCard from './RetingDisplayCard';
import {useTranslations} from 'next-intl';

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/downloads/`;
interface DownloadData {
  id: number;
  attributes?: {
    count: number;
  };
}


const ProductCard: React.FC<any> = ({ product }) => {
  const t = useTranslations('Card');
  const formatDate = (isoDate: string | number | Date): string => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate.replace(/\d+/, day + daySuffix);
  };

  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  
  const queryClient = useQueryClient()
  const mutation1 = useMutation({
    mutationFn: (downloadData:any) => {
      const value = downloadData.attributes?.count;
    return axios.put(`${BASE_URL}${downloadData.id}`, {
      data: {
        count: value ? parseInt(value as any) + 1 : 1,
      },
    });
    
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["numberofdownload",product.id] })
      queryClient.invalidateQueries({ queryKey: ["numberofdownloadcard",product.id] })
      queryClient.invalidateQueries({ queryKey: ["averageRatingcard",product.id] })
  
    }

   
  })


  const mutation2 = useMutation({
    mutationFn: () => {

      const newDownload = {
        data: {
          count: 1,
          ProductId: `${product.id}`,
        },
        onSuccess: () => {
     
          queryClient.invalidateQueries({ queryKey: ["numberofdownload",product.id] })
      
        }
      };
  
      return axios.post(BASE_URL, newDownload);
      

     
    },
  })

const downloadSelf =async ()=>{

  const response = await axios.get(`${BASE_URL}?filters[ProductId][$eq]=${product.id}`);
  const downloadData: DownloadData = response.data.data[0];

  if (downloadData && downloadData.attributes) {
    
  mutation1.mutate(downloadData)
  
    

  } else {
     
    mutation2.mutate();
   
    

  }

  
}
  return (
    <div   className="relative bg-white p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-lg w-72   hover:w-80 mb-2 ">
        <div className=' '>
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER}${product.attributes.image.data[0].attributes.formats.thumbnail.url}`}
        alt={product.attributes.title}
  
        className=" mx-auto w-12 h-12 object-cover rounded-md my-4 "
      />
      </div>
    <div className=' w-full border-b-2 border-slate-300'></div>
      <h2 className=" text-center m-4 text-[#008dd2] text-lg font-semibold">
        {product.attributes.title}
      </h2>

      <div className=" whitespace-nowrap text-center  font-sans  text-zinc-500">{t("Downloadfrom")}</div>

     
<div className='flex justify-center items-center '>
{product.attributes.playStoreLink&&(<>
    <div className='grid place-content-center '>
    <Link 
        href={product.attributes.playStoreLink}

        
     
      >
        <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDY2LjlweCIgaGVpZ2h0PSI0NjYuOXB4IiB2aWV3Qm94PSItMjkuNDUgMCA0NjYuOSA0NjYuOSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlPi5zdDB7ZmlsbDp1cmwoI1NWR0lEXzFfKX0uc3Qxe2ZpbGw6dXJsKCNTVkdJRF8yXyl9LnN0MntmaWxsOnVybCgjU1ZHSURfM18pfS5zdDN7ZmlsbDp1cmwoI1NWR0lEXzRfKX08L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTEyLjA5NCIgeDI9IjI2MS43NDYiIHkyPSIxMTIuMDk0Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM2M2JlNmIiLz48c3RvcCBvZmZzZXQ9Ii41MDYiIHN0b3AtY29sb3I9IiM1YmJjNmEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0YWI5NmEiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjEuNyAxNDIuM0wxNSAxLjNDMTEuOS0uNSA4LS40IDUgMS40Yy0zLjEgMS44LTUgNS01IDguNiAwIDAgLjEgMTMgLjIgMzQuNGwxNzkuNyAxNzkuNyA4MS44LTgxLjh6Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIuMTUyIiB5MT0iMjIzLjM5MyIgeDI9IjE3OS44OTYiIHkyPSIyMjMuMzkzIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzZWM2ZjIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0NWFmZTMiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0uMiA0NC40Qy41IDEyMS42IDEuNCAzMDkgMS44IDQwMi4zTDE4MCAyMjQuMS4yIDQ0LjR6Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8zXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNzkuODk2IiB5MT0iMjI5LjQ2NCIgeDI9IjQwNy45NzYiIHkyPSIyMjkuNDY0Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmYWE1MWEiLz48c3RvcCBvZmZzZXQ9Ii4zODciIHN0b3AtY29sb3I9IiNmYWI3MTYiLz48c3RvcCBvZmZzZXQ9Ii43NDEiIHN0b3AtY29sb3I9IiNmYWM0MTIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYWM4MGYiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MDIuOSAyMjNsLTE0MS4yLTgwLjctODEuOSA4MS44IDkyLjQgOTIuNEw0MDMgMjQwLjNjMy4xLTEuOCA1LTUuMSA1LTguNiAwLTMuNi0yLTYuOS01LjEtOC43eiIvPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMS43NDQiIHkxPSIzNDUuNTIxIiB4Mj0iMjcyLjI5NiIgeTI9IjM0NS41MjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2VjM2I1MCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2U3NTE1YiIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0MyIgZD0iTTEuNyA0MDIuM2MuMiAzMy4zLjMgNTQuNi4zIDU0LjYgMCAzLjYgMS45IDYuOSA1IDguNiAzLjEgMS44IDYuOSAxLjggMTAgMGwyNTUuMy0xNDguOS05Mi40LTkyLjRMMS43IDQwMi4zeiIvPjwvc3ZnPg=='alt='' width={20} height={20}
        className=' mx-auto'
     
        />
        <span    className="  text-[#8Dc63F] m-2 block text-xs no-underline hover:text-ethLightBlue-500">{t("PlayStore")}</span>

      </Link >

    </div>
    <div className='mx-auto  text-center '>
      <span className=' text-2xl text-center  text-ethLightBlue-500 '><LuTally1 /></span>
      </div>
    </>)}
    <div className=' grid place-content-center '>
    <Link 
  href={`${process.env.NEXT_PUBLIC_SERVER}` + product.attributes.file.data.attributes.url}
  onClick={() => downloadSelf()}
>
       <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                    
                      xmlns="http://www.w3.org/2000/svg"
                   
                 
                      className=' mx-auto  w-5 h-5 text-ethLime-500  hover:text-ethLightBlue-500'
                    >
                      <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
                    </svg>
                    <span   className=" text-ethLime-500  block text-xs no-underline hover:text-ethLightBlue-500" >{t("EthioAppStore")}</span>

      </Link >
      </div>   
    </div>


      <div className=' text-zinc-500 text-opacity-80  text-center text-xs m-4  mb-24 '>
        
      <p className=" mt-2 ">
        {t("Size")}: {(product.attributes.file.data.attributes.size / 1000).toFixed(1)} MB
      </p>
        <p className="my-2">
          <span>
          {t("Published")} : <strong>{formatDate(product.attributes.file.data.attributes.createdAt)}</strong>
          </span>
        </p>
        <p className="my-2 ">
          <span>
          {t("Updated")}: <strong>{formatDate(product.attributes.file.data.attributes.updatedAt)}</strong>
          </span>
        </p>
       <RetingDisplayCard productId={product.id}/>
      </div   >
      <div className="  bg-ethLime-600   hover:bg-ethLime-700 rounded-xl  px-6 py-2 absolute bottom-4  right-4 left-4">
      <Link href={`/Apps/${product.id}`}>
  <div className='flex justify-center items-center text-white font-semibold'>
  <span className='px-1' >{t("Details")} </span> <CgDetailsMore />
  </div>
</Link>
    </div>
    </div>
  );
};

export default ProductCard;
