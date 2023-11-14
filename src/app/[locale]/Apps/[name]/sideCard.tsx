import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard: React.FC<any> = ({ product }) => {
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

  return (
    <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-lg  max-w-xs  max-h-min ">
        <div className=' '>
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER}${product.attributes.image?.data[0]?.attributes.formats.thumbnail.url}`}
        alt={product.attributes.title}
        fill
        
        className=" mx-auto w-16 h-16 object-cover rounded-md my-4 "
      />

      </div>
   
    <Link href={`/Apps/yimulu-app/${product.id}`}>
      <h2 className=" text-center m-4 text-[#008dd2] text-lg font-semibold">
        {product.attributes.title}
      </h2>
</Link>
      
    </div>
  );
};

export default ProductCard;
