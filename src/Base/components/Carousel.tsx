import { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps extends BoxProps {
  items: { id: string; content: ReactNode }[];
}

const Carousel = ({ items = [], ...boxProps }: CarouselProps) => (
  <Box
    as={Swiper}
    modules={[Navigation, Pagination]}
    pagination={{ clickable: true }}
    navigation
    {...boxProps}
  >
    {items.map((item) => (
      <SwiperSlide key={item.id}>{item.content}</SwiperSlide>
    ))}
  </Box>
);

export default Carousel;
