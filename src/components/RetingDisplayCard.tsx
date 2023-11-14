import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAmericanSignLanguageInterpreting, FaStar } from 'react-icons/fa'; 
import {BsStarHalf} from 'react-icons/Bs'
import { useQuery } from '@tanstack/react-query';
import NumberOfDownload from './numberOfDownload';

interface YourComponentProps {
  productId: string;
}

interface Rating {
  stars: number;
  count: number;
}

function YourComponent({ productId }: YourComponentProps) {
  const [rating, setRating] = useState<Rating>({ stars: 0, count: 0 });
  const [starData, setStarData] = useState<number[]>([]); // Array to store star occurrence data

  const getReviews = async () => {
    const response2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${productId}?populate=*`);
    let data2 = await response2.json();
    
// Finding all IDs from the data
const allIds: number[] = data2.data.attributes.localizations.data.map((item: { id: any; }) => item.id);


    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/reviews?filters[productId][$in]=${productId}&filters[productId][$in]=${allIds[0]}&fields[0]=stars`
    );

    const totalStars = data.data.data.reduce(
      (acc: number, review: { attributes: { stars: string } }) => {
        return acc + parseInt(review.attributes.stars);
      },
      0
    );

    const averageStars = totalStars / data.data.data.length;

    setRating({ stars: averageStars, count: data.data.data.length });

    // Count star occurrences
    const starCounts = [0, 0, 0, 0, 0]; // Initialize an array for each star value
    data.data.data.forEach((review: { attributes: { stars: string } }) => {
      const starValue = parseInt(review.attributes.stars);
      starCounts[starValue - 1]++; // Star values are 1-based
    });
    setStarData(starCounts);

    return data;
  };

  function formatCount(count: number): string {
    if (count >= 1e9) {
      return (count / 1e9).toFixed(1) + 'B';
    } else if (count >= 1e6) {
      return (count / 1e6).toFixed(1) + 'M';
    } else if (count >= 1e3) {
      return (count / 1e3).toFixed(1) + 'K';
    } else {
      return count.toString();
    }
  }

  const { isPending, isSuccess, isError, data, error } = useQuery({
    queryKey: ['averageRatingcard', productId],
    queryFn: getReviews,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Calculate the percentage of star occurrences
  const starPercentages = starData.map((count) => (count / rating.count) * 100);

  return (
    <div className=" bg-white flex flex-col p-4 rounded-md  min-w-min">
      <div className=' flex justify-between items-center'>
        <div>    <NumberOfDownload productId={productId}/></div>
  
     


    <div>
 
      <span className="text-xl font-bold">
        {rating.stars > 0 ? rating.stars.toFixed(1) : 0}{' '}
        {rating.stars > 0 && (
          <span className="text-yellow-400">
            {' '}
            {Array(Math.ceil(rating.stars)).fill(null).map((_, index) => (
  (index === Math.floor(rating.stars) && !Number.isInteger(rating.stars)) ? (
    <BsStarHalf key={index} className="inline h-2 w-2" />
  ) : (
    <FaStar key={index} className="inline h-2 w-2" />
  )

            )
)}





          </span>
        )}
      </span>
     
      <div className="font-bold text-xl  flex space-x-1">
        
        <span className=" ">{formatCount(rating.count)}</span> <span className='text-[#8Dc63F] text-2xl'><FaAmericanSignLanguageInterpreting/></span>
      </div>
      </div>
      </div>
     
   
    
    </div>
  );
}

export default YourComponent;
