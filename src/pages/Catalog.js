import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getCatalogPageData } from "services/operations/catalogPageDataAPI";
import { CourseSlider } from "components/core/catalog/CourseSlider";
import { CatalogCourseCard } from "components/core/catalog/CatalogCourseCard";
import Footer from "components/common/Footer";
import Spinner from "components/common/Spinner";

const Catalog = () => {
    const location = useLocation();
    const { categoryId } = location.state;
    const [categoryPageData, setCategoryPageData] = useState({})
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCategoryDetails = async () => {
            setLoading(true);
            const result = await getCatalogPageData(categoryId);
            setCategoryPageData(result);
            setLoading(false);
        };

        getCategoryDetails();
    }, [categoryId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            {
                Object.keys(categoryPageData)?.length !== 0 ? (
                    <>
                        <div className="bg-richblack-800 py-[72px] px-4">
                            <div className="max-w-maxContent mx-auto flex flex-col gap-4 ">
                                <p className="text-sm text-richblack-300">
                                    Home / Catalog / <span className="text-yellow-25">{categoryPageData?.selectedCategory?.name}</span>
                                </p>
                                <p className="text-3xl text-richblack-5">
                                    {categoryPageData?.selectedCategory?.name}
                                </p>
                                <p className="max-w-[870px] text-richblack-200">
                                    {categoryPageData?.selectedCategory?.description}
                                </p>
                            </div>
                        </div>

                        <div className="px-4 mb-16">
                            <div className="max-w-maxContent mx-auto">
                                {/* Section 1 */}
                                <div>
                                    <h1 className="text-4xl text-white font-bold pt-12 pb-6">
                                        Courses to get you started
                                    </h1>
                                    <div className="mb-[2px] flex gap-2 border-b border-b-richblack-700">
                                        <p
                                            className={`px-4 py-2 ${active === 1 ? "text-yellow-25 border-b border-b-yellow-25" : "text-richblack-50"} cursor-pointer`}
                                            onClick={() => setActive(1)}
                                        >
                                            Most Popular
                                        </p>
                                        <p
                                            className={`px-4 py-2 ${active === 2 ? "text-yellow-25 border-b border-b-yellow-25" : "text-richblack-50"} cursor-pointer`}
                                            onClick={() => setActive(2)}
                                        >
                                            New
                                        </p>
                                    </div>
                                    <CourseSlider courses={categoryPageData?.selectedCategory?.courses} />
                                </div>

                                {/* section 2 */}
                                <div>
                                    <p className="text-4xl text-white font-bold pt-12 pb-10">
                                        Top courses in {categoryPageData?.differentCategory?.name}
                                    </p>
                                    <CourseSlider courses={categoryPageData?.differentCategory?.courses} />
                                </div>

                                {/* section 3 */}
                                <div>
                                    <p className="text-4xl text-white font-bold pt-12 pb-10">
                                        Frequently Bought
                                    </p>
                                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                                        {
                                            categoryPageData?.mostSellingCourses?.slice(0, 4)?.map((course) => <CatalogCourseCard key={course._id} course={course} height="h-[400px]" />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-28 text-white text-3xl font-semibold ">No courses found 😟</div>
                )
            }

            <Footer />
        </>
    )
};

export default Catalog;