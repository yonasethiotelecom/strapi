// myFile.ts

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


interface DownloadData {
  id: number;
  attributes?: {
    count: number;
  };
}

const BASE_URL = `${process.env.BAAKEND_URL}/api/downloads/`;



const FetchDownload = async (productId: string|number): Promise<void> => {
  const queryClient = useQueryClient()
  try {
    const response = await axios.get(`${BASE_URL}?filters[ProductId][$eq]=${productId}`);
    const downloadData: DownloadData = response.data.data[0];

    if (downloadData && downloadData.attributes) {
     
      queryClient.invalidateQueries({ queryKey:["numberofdownload",productId] })
      await updateDownload(downloadData);
      

    } else {
      
      queryClient.invalidateQueries({ queryKey: ["numberofdownload",productId] })
      await createDownload(productId);
      

    }
  } catch (error) {
    console.error('Error:', error);
  }
  return ;
};

const updateDownload = async (downloadData: DownloadData): Promise<void> => {
  try {
    const value = downloadData.attributes?.count;
    await axios.put(`${BASE_URL}${downloadData.id}`, {
      data: {
        count: value ? parseInt(value as any) + 1 : 1,
      },
    });
    console.log('Update successful', downloadData);
  } catch (error) {
    console.error('Error updating download:', error);
  }
  return
};



const createDownload = async (productId: string|number): Promise<void> => {
  try {
    const newDownload = {
      data: {
        count: 1,
        ProductId: `${productId}`,
      },
    };

    const response = await axios.post(BASE_URL, newDownload);
    console.log('Download created', response.data);
  } catch (error) {
    console.error('Error creating download:', error);
  }
  return
};

export default FetchDownload;
