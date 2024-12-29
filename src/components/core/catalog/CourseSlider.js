import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { CatalogCourseCard } from "./CatalogCourseCard";
import "./Swiper.css";

export const CourseSlider = ({ courses }) => (
  <>
    {courses?.length ? (
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        modules={[FreeMode, Pagination]}
        pagination={true}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-h-[30rem]"
      >
        {courses.map((course) => (
          <SwiperSlide key={course._id}>
            <CatalogCourseCard course={course} height="h-[240px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div>No courses found</div>
    )}
  </>
);
