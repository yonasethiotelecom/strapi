import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa'; 
import {BsStarHalf} from 'react-icons/Bs'
import { useQuery } from '@tanstack/react-query';
import NumberOfDownload from './numberOfDownload';
import {useTranslations} from 'next-intl';

interface YourComponentProps {
  productId: string;

}

interface Rating {
  stars: number;
  count: number;
}


const YourComponent: React.FC<YourComponentProps> = ({ productId}) => {

  const t = useTranslations('Card');
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
    queryKey: ['averageRating', productId],
    queryFn: getReviews,
  });

  if (isPending) {
    return <div className="text-center text-2xl text-gray-600">
    Loading...
  </div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Calculate the percentage of star occurrences
  const starPercentages = starData.map((count) => (count / rating.count) * 100);

  return (
    <div className=" bg-white grid grid-cols-3 p-4 rounded-md shadow-sm min-w-min">
      <div className=' flex  flex-col-reverse justify-end  items-end mx-4 space-y-4 min-w-min'>

        <div>    <NumberOfDownload productId={productId} /></div>

     


    <div>
 
      <span className="text-3xl font-bold">
        {rating.stars > 0 ? rating.stars.toFixed(1) : 0}{' '}
        {rating.stars > 0 && (
          <span className="text-yellow-400">
            {' '}
            {Array(Math.ceil(rating.stars)).fill(null).map((_, index) => (
  (index === Math.floor(rating.stars) && !Number.isInteger(rating.stars)) ? (
    <BsStarHalf key={index} className="inline h-4 w-4" />
  ) : (
    <FaStar key={index} className="inline h-4 w-4" />
  )

            )
)}





          </span>
        )}
      </span>
     
      <div className="text-[#333333] text-xl">
        <span className="font-bold">{formatCount(rating.count)}</span> {t("reviews")}
      </div>
      </div>
      </div>

      {/* Display horizontal progress bars for each star value */}
      <div className="my-4 col-span-2 space-y-2 min-w-min">
  {[1, 2, 3, 4, 5]
    .reverse()
    .map((starValue, index) => (
      <div key={starValue}>
        <div className="w-full flex items-center justify-start space-x-2 bg-gray-200 rounded-full h-2.5">
          <span>{starValue}</span>
          <div
            className=" bg-[#8Dc63F] h-2.5 rounded-full"
            style={{ width: `${starPercentages[4 - index]}%` }}
          ></div>
        </div>
      </div>
    ))}
</div>

    
    </div>
  );
}

export default YourComponent;
