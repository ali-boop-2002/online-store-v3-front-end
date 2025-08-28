// src/components/ProductCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = ["/images/school1.png", "/images/school2.png"];

function ProductCarousel() {
  return (
    <div className="w-full max-w-6xl mx-auto h-48 relative">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        className="h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductCarousel;
