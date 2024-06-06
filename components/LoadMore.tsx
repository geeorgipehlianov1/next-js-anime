'use client';
import { fetchAnime } from '@/app/action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

let page = 2;

export type AnimaCard = JSX.Element;
function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimaCard[]>([]);

  useEffect(() => {
    if (inView) {
      fetchAnime(2).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data}
      </section>
      <section className='flex w-full items-center justify-center'>
        <div ref={ref}>
          <Image
            src='./spinner.svg'
            alt='spinner'
            width={56}
            height={56}
            className='object-contain'
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
