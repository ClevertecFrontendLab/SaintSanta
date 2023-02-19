import { FC, useState } from 'react';
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './slider.scss';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/thumbs';

export type SliderType = {
    images: string[];
  };

export const Slider: FC<SliderType> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const slidesPerView = 5;
  const scrollVariables =
    images.length >= slidesPerView
      ? {
          hide: false,
          draggable: true,
          dragSize: 190,
        }
      : false;

  return (
    <div className='slider-container'>
      <Swiper
        className='slider-big-swiper'
        controller={thumbsSwiper}
        loop={true}
        modules={[Pagination, FreeMode, Navigation, Thumbs]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={10}
        scrollbar={false}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper, autoScrollOffset: 2 } : undefined}
        data-test-id='slide-big'
      >
        {images.map((el) => (
          <SwiperSlide data-test-id='slide-mini'>
            <img src={el} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className='slider-mini-swiper'
        centeredSlides={true}
        centeredSlidesBounds={true}
        centerInsufficientSlides={true}
        freeMode={false}
        loop={true}
        modules={[FreeMode, Thumbs, Scrollbar]}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        scrollbar={scrollVariables}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        slideToClickedSlide={true}
        watchSlidesProgress={true}
      >
        {images.map((el) => (
          <SwiperSlide>
            <img src={el} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
