import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../../loading';
import DownloadCounter from './DownloadCounter';

interface DownloadData {
  id: number;
  attributes: {
    count: number;
  };
}

interface QueryResult {
  isPending: boolean;
  isError: boolean;
  data: { data: DownloadData[] } | undefined;
  error: Error | null;
}


const fetchList = async (productId:any): Promise<{ data: DownloadData[] }> => {

   
    console.log("tttttttttttttttttttt"+productId)

    const response2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${productId}?populate=*`);
    let data2 = await response2.json();
    
// Finding all IDs from the data
const allIds: number[] = data2.data.attributes.localizations.data.map((item: { id: any; }) => item.id);

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/downloads?filters[ProductId][$in]=${productId}&filters[ProductId][$in]=${allIds[0]}`);
  const data = await response.json();
  console.log("data--------------"+productId)
  return data;
};

function NumberOfDownload({ productId }: { productId: string }) {
 


  const { isPending, isError, data, error } = useQuery({
    queryKey: ['numberofdownload',productId],
    queryFn:  async () => {
        const data = await fetchList(productId)
        return data
      },



  })

  if (isPending) {
    return <span><LoadingPage /></span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (!data || data.data.length === 0 || !data.data[0].attributes) {
    return ;
  }

  return (
  <div>
    <DownloadCounter count={Number(data.data[0].attributes.count)
    +Number(data.data[1].attributes.count)} />
  </div>
  );
}

export default NumberOfDownload;
