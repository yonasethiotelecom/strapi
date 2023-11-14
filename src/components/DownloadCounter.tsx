import React, { useEffect, useState } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';

interface DownloadCounterProps {
  count: number; // Your download count
}

function DownloadCounter({ count }: DownloadCounterProps) {
  function formatDownloadCount(count: number): string {
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

  const formattedDownloadCount = formatDownloadCount(count);

  return (
    <div className=" p-4  flex  items-center space-x-1">
      <span className="  text-xl font-bold">{formattedDownloadCount}</span>
      <h1 className=" text-xl font-semibold text-[#8Dc63F] "><FaCloudDownloadAlt/></h1>
    
    </div>
  );
}

export default DownloadCounter;
