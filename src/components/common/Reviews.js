import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import StarRatings from "react-star-ratings";

import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { getAllRatingsAndReviews } from 'services/operations/courseDetailsAPI';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchReviews = async () => {
            const result = await getAllRatingsAndReviews();
            setReviews(result);
        };

        fetchReviews();
    }, []);

    return (
        <div className='bg-richblack-900 mb-[80px]'>
            <div className='text-4xl text-white text-center font-semibold  mb-[80px]'>
                Reviews from other learners
            </div>

            <div className='h-[190px] max-w-maxContent'>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full"
                >
                    {
                        reviews.map((review) => (
                            <SwiperSlide
                                key={review._id}
                            >
                                <div className='flex flex-col gap-3 text-[14px] text-richblack-25 p-3 bg-richblack-800'>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={review?.user?.image ?? `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                            alt="user-profile-pic"
                                            className='w-9 aspect-square object-cover rounded-full'
                                        />
                                        <div className='flex flex-col gap-[2px]'>
                                            <p className='font-semibold text-richblack-5'>
                                                {review?.user?.firstName} {review?.user?.lastName}
                                            </p>
                                            <p className='text-[12px] font-medium text-richblack-500'>
                                                {review?.course?.courseName}
                                            </p>
                                        </div>
                                    </div>

                                    <p className='font-medium text-richblack-25'>
                                        {
                                            review?.review?.split(" ")?.length > truncateWords ?
                                                `${review?.review
                                                    ?.split(" ")
                                                    ?.slice(0, truncateWords)
                                                    ?.join(" ")}...`
                                                : review?.review
                                        }
                                    </p>

                                    <div className='flex items-center gap-2'>
                                        <p className='pt-1 font-semibold text-yellow-100'>
                                            {review?.rating?.toFixed(1)}
                                        </p>

                                        <StarRatings
                                            numberOfStars={5}
                                            rating={review?.rating}
                                            starRatedColor="#E7C009"
                                            starEmptyColor="#6E727F"
                                            starDimension="16px"
                                            starSpacing="1px"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Reviews;