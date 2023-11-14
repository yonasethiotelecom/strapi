// src/components/ReviewForm.tsx
"use client"
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useMutation,useQueryClient} from '@tanstack/react-query';
import { signIn, signOut, useSession } from "next-auth/react";
import {useTranslations} from 'next-intl';
const colors = {
  orange: 'text-yellow-400',
  grey: 'text-gray-400',
};

interface ReviewFormProps {
  
    productId: string;

  }

  
 
  
  
const ReviewForm: React.FC<ReviewFormProps> = ({ productId}) => {
  
const t = useTranslations('Reting');
    const { data: session } = useSession();
    console.log(session?.user)
  const [currentValue, setCurrentValue] = useState<number | undefined>(undefined);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const stars = Array(5).fill(0);
  const [comment, setComment] = useState('');

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  


  const queryClient = useQueryClient()



const mutation = useMutation({
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/api/reviews`,
        {
          data: {
            text: comment,
            productId,
            email:session?.user?.email,
            stars: currentValue,
            username:session?.user?.name,
            image:session?.user?.image
          },
        },
       
      )
      }, 
    
      onSuccess: () => {
        
        setCurrentValue(undefined);
        setComment('');
        // I will fire first
        queryClient.invalidateQueries({ queryKey: ["comment",productId] })
        queryClient.invalidateQueries({ queryKey: ["averageRating",productId] })
     


      },
   
    })
    






  const handleSubmit = async () => {
    if (session && session.user) {
    if (currentValue && comment) {
      try {
       
        mutation.mutate();
    
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
}
else{
    signIn();
}
  };




  return (
    <div className="container mx-auto p-4  mt-0 max-w-md">
      <h2 className="text-xl font-semibold mb-4">{t("ReactRatings")}</h2>
      <div className="flex   items-center mb-4 space-x-2">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`${
              (hoverValue || currentValue || 0) > index
                ? colors.orange
                : colors.grey
            } cursor-pointer`}
          />
        ))}
      </div>
      <textarea
        placeholder={t("What'syourexperience?")}
        className="mt-1 focus:ring-blue-500 focus:ring-1 focus:outline-none block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-4 py-2  h-32"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="border p-2 rounded w-full mt-4" onClick={handleSubmit}>
        {t("Submit")}
      </button>
    </div>
  );
};

export default ReviewForm;
