'use client';

import {useTranslations} from 'next-intl';
import {useEffect} from 'react';
;

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({error, reset}: Props) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (

      <div>
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              className=" border-2 border-ethLime-400 bg-ethLightBlue-400 text-white underline underline-offset-2"
              onClick={reset}
              type="button"
            >
              {chunks}
            </button>
          )
        })}
      </div>
  
  );
}
