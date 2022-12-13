import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import styles from './HeaderSlide.module.css'


function createSlide(img) {
    return (
      <SwiperSlide>
        <img className={styles.headerImg}  src={img} alt="" />
      </SwiperSlide>
    );
  }
const HeaderSlide = ({one, two, three}) => {

  return (
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    slidesPerView={1}
    navigation
    autoplay={{ delay: 1000 }}
    pagination={{ clickable: true }}
  >
    {createSlide(one)}
    {createSlide(two)}
    {createSlide(three)}
  </Swiper>
  )
}

export default HeaderSlide
