import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import {useTranslations} from 'next-intl';
// import Swiper core and required modules
import { Navigation,Autoplay, Pagination,EffectCoverflow, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'
import RetingDisplay from './RetingDisplay';
import NumberOfDownload from './numberOfDownload';
import download from '../../../../components/download';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/downloads/`;
interface DownloadData {
  id: number;
  attributes?: {
    count: number;
  };
}

interface Product {
  id: number;
  attributes: {
    title: string;
    description: string;
    playStoreLink: string;
    image: {
      data:[{
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

interface ProductCardProps {
  product: Product,
  productId:string,

  
}

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

const ProductCard: React.FC<ProductCardProps> = ({ product ,productId  }) => {
  const t = useTranslations('Card');
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
     
      queryClient.invalidateQueries({ queryKey: ["numberofdownload",productId] })
  
    }

   
  })


  const mutation2 = useMutation({
    mutationFn: () => {

      const newDownload = {
        data: {
          count: 1,
          ProductId: `${productId}`,
        },
      };
  
      return axios.post(BASE_URL, newDownload);
      

     
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["numberofdownload",productId] })
  
    }
  })

const downloadSelf =async ()=>{

  const response = await axios.get(`${BASE_URL}?filters[ProductId][$eq]=${productId}`);
  const downloadData: DownloadData = response.data.data[0];

  if (downloadData && downloadData.attributes) {
    
  mutation1.mutate(downloadData)
  
    

  } else {
     
    mutation2.mutate();
   
    

  }

  
}


  return (
    <div className='p-4'>
    <div className="bg-white p-4 shadow-sm   border border-gray-100 rounded-lg max-h-min">
      <div className="grid grid-cols-3">
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER}${product.attributes.image.data[0].attributes.formats.thumbnail.url}`}
            alt={product.attributes.title}
            width={145}
          
            className="mx-auto object-cover rounded-md my-4"
          />
         
         
        </div>
        <div className="col-span-2 ">
          <h2 className="text-center m-4 text-[#008dd2] text-lg font-semibold">
            {product.attributes.title}
          </h2>
          <p className="text-center my-2">
            <span>
              {t("Published")}: <strong>{formatDate(product.attributes.file.data.attributes.createdAt)}</strong>
            </span>
          </p>
          <p className="text-center my-2">
            <span>
             {t("Updated")}: <strong>{formatDate(product.attributes.file.data.attributes.updatedAt)}</strong>
            </span>
          </p>
          <div className="whitespace-nowrap text-center font-sans text-zinc-500">{t("Downloadfrom")}</div>
          <div className="flex justify-center items-center">
          {product.attributes.playStoreLink&&(<>
            <div className="grid place-content-center">
              
        
            <Link
        href={product.attributes.playStoreLink}
  
        
     
      >
        <Image  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDY2LjlweCIgaGVpZ2h0PSI0NjYuOXB4IiB2aWV3Qm94PSItMjkuNDUgMCA0NjYuOSA0NjYuOSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlPi5zdDB7ZmlsbDp1cmwoI1NWR0lEXzFfKX0uc3Qxe2ZpbGw6dXJsKCNTVkdJRF8yXyl9LnN0MntmaWxsOnVybCgjU1ZHSURfM18pfS5zdDN7ZmlsbDp1cmwoI1NWR0lEXzRfKX08L3N0eWxlPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB5MT0iMTEyLjA5NCIgeDI9IjI2MS43NDYiIHkyPSIxMTIuMDk0Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM2M2JlNmIiLz48c3RvcCBvZmZzZXQ9Ii41MDYiIHN0b3AtY29sb3I9IiM1YmJjNmEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0YWI5NmEiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjEuNyAxNDIuM0wxNSAxLjNDMTEuOS0uNSA4LS40IDUgMS40Yy0zLjEgMS44LTUgNS01IDguNiAwIDAgLjEgMTMgLjIgMzQuNGwxNzkuNyAxNzkuNyA4MS44LTgxLjh6Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIuMTUyIiB5MT0iMjIzLjM5MyIgeDI9IjE3OS44OTYiIHkyPSIyMjMuMzkzIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzZWM2ZjIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0NWFmZTMiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0uMiA0NC40Qy41IDEyMS42IDEuNCAzMDkgMS44IDQwMi4zTDE4MCAyMjQuMS4yIDQ0LjR6Ii8+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8zXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNzkuODk2IiB5MT0iMjI5LjQ2NCIgeDI9IjQwNy45NzYiIHkyPSIyMjkuNDY0Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmYWE1MWEiLz48c3RvcCBvZmZzZXQ9Ii4zODciIHN0b3AtY29sb3I9IiNmYWI3MTYiLz48c3RvcCBvZmZzZXQ9Ii43NDEiIHN0b3AtY29sb3I9IiNmYWM0MTIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYWM4MGYiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MDIuOSAyMjNsLTE0MS4yLTgwLjctODEuOSA4MS44IDkyLjQgOTIuNEw0MDMgMjQwLjNjMy4xLTEuOCA1LTUuMSA1LTguNiAwLTMuNi0yLTYuOS01LjEtOC43eiIvPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMS43NDQiIHkxPSIzNDUuNTIxIiB4Mj0iMjcyLjI5NiIgeTI9IjM0NS41MjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2VjM2I1MCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2U3NTE1YiIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggY2xhc3M9InN0MyIgZD0iTTEuNyA0MDIuM2MuMiAzMy4zLjMgNTQuNi4zIDU0LjYgMCAzLjYgMS45IDYuOSA1IDguNiAzLjEgMS44IDYuOSAxLjggMTAgMGwyNTUuMy0xNDguOS05Mi40LTkyLjRMMS43IDQwMi4zeiIvPjwvc3ZnPg=='alt='' width={20} 
        className=' mx-auto'
        fill
        />
        
        <span    className="   text-[#8Dc63F] m-2 block text-xs no-underline hover:text-[#0072BC] ">{t("PlayStore")}</span>

      </Link>
            </div>
            <div className="grid place-content-center">or</div>
            </>   )
}
            <div className="grid place-content-center">
              <Link href={`${process.env.NEXT_PUBLIC_SERVER}` + product.attributes.file.data.attributes.url}
              onClick={() => downloadSelf()
              
              }
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: 'rgb(141, 198, 63)' }}
                  className="mx-auto w-5 h-5"
                >
                  <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
                </svg>
                <span className="text-[#8Dc63F] m-2 block text-xs no-underline hover:text-[#0072BC]">{t("EthioAppStore")}</span>
              </Link>
            </div>
          </div>
          <div className="text-zinc-800 text-opacity-80 text-center text-sm m-4">
            <p className="mt-2">
              {t("Size")}: {(product.attributes.file.data.attributes.size / 1000).toFixed(1)} MB
            </p>
          </div>
         {/*  <NumberOfDownload productId={productId}/> */}
        </div>
      </div>
      <RetingDisplay  productId={productId}  />
    </div>
    <div>
    <h2 className="text-center m-4 text-[#008dd2] text-lg font-semibold">
        {product.attributes.title} 
      </h2>
      <ReactMarkdown>{product.attributes.description}</ReactMarkdown>
    
      <div className=''>
      <Swiper
     
      // install Swiper modules
      modules={[Navigation, Autoplay,Pagination, Scrollbar,EffectCoverflow, A11y]}
      spaceBetween={30}
     /*  slidesPerView={2} */
      navigation
      
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={4}
      
  
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
   
      
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >


{product.attributes.descriptionImage?.data?.map((imageData, index) => (
  <SwiperSlide key={index}>
    <img
      src={`${process.env.NEXT_PUBLIC_SERVER}${imageData.attributes.formats.small.url}`}
  
      alt={`Description Image ${index + 1}`}
    />
  </SwiperSlide>
))}

    </Swiper>
    </div>
    </div>
    </div>
  );
};

export default ProductCard
