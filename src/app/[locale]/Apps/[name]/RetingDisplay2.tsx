import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { BiSolidUserCircle } from 'react-icons/Bi';

import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query'
import { CgMoreVerticalR } from 'react-icons/Cg';
import {useTranslations} from 'next-intl';

interface YourComponentProps {
  
  productId: string;
}

interface Review {
  id: number;
  attributes: {
    createdAt: string;
    stars: string;
    text: string;
    username: string;
    image:string;
  };
}

function YourComponent({  productId }: YourComponentProps): JSX.Element {
 


 
    const getReviews = async ({ pageParam}:{pageParam:any}) => {
    

      const response2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${productId}?populate=*`);
      let data2 = await response2.json();
;

      
// Finding all IDs from the data
const allIds: number[] = data2.data.attributes.localizations.data.map((item: { id: any; }) => item.id);
  
     

    

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/api/reviews?pagination[pageSize]=3&filters[productId][$in]=${productId}&filters[productId][$in]=${allIds[0]}&pagination[page]=${pageParam}`,
         /*  headerConfig */
        );

        return response.data;
      
    };

    
  



 




  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['comment',productId],
  
    queryFn: getReviews,
    
    initialPageParam: 1,
    
       
  
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
          return undefined
      }
      return lastPageParam + 1
    },
  
  }
  )
  
  const t = useTranslations('Reting');

  return status === 'pending' ? (
    <div className="text-center text-2xl text-gray-600">
    Loading...
  </div>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      <h1 className="text-xl font-semibold mb-6">{t("CustomerReviews")}</h1>
      <div>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>

        {group.data?.map((review: Review) => (
           <div key={review.id} className="bg-white p-4 rounded-lg mb-4">
           <div className="flex items-center mb-2">
            {/*  <BiSolidUserCircle size={30} className="mr-2" /> */}
             <img src ={review.attributes.image} alt=""  className='h-8 w-8 mr-2 rounded-full object-cover'/>
          

             <p className="text-lg  ">{review.attributes.username}</p>
           </div>
            <div>
              {[...Array(parseInt(review.attributes.stars))].map((_, index) => (
               <FaStar key={index} className="text-yellow-400 inline" />
              ))}
            </div>
            <p className="text-gray-600 mt-2">
                     {t("ReviewDate")}: {new Date(review.attributes.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-800 mt-2">{review.attributes.text}</p>
            
          </div>
        ))}
</React.Fragment>
      ))}

<div>
<button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
              className="mt-4  bg-ethGreen-600 text-white py-2 px-4 rounded-lg"
            >
              {t("LoadMoreReviews")} <CgMoreVerticalR size={20} className="inline ml-2" />
            </button>
        
      </div>
      <div className="text-center mt-2">
            {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
          </div>
   
      </div>
    </div>
  );
              }
export default YourComponent;
