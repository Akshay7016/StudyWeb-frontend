export const getAverageRating = (ratingArray) => {
    if (ratingArray?.length === 0) return 0;

    const totalReviewCount = ratingArray?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    }, 0)

    const multiplier = Math.pow(10, 1)
    return Math.round((totalReviewCount / ratingArray?.length) * multiplier) / multiplier
};