import React, { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';

interface DownloadCounterProps {
  count: number; // Your download count
}

function DownloadCounter({ count }: DownloadCounterProps) {
  const t = useTranslations('Card');
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
    <div className=" flex items-center ">
      <span className=" text-[#333333] text-xl font-bold">{formattedDownloadCount}</span>
      <h1 className="text-[#333333] text-sm font-semibold ml-1">{t("Downloads")}</h1>
    
    </div>
  );
}

export default DownloadCounter;
