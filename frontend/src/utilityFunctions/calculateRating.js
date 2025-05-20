export const calculateRating = (courseRatings) => {

    if (courseRatings.length === 0) {
        return 0;
    }
    let totalRating = 0;
    courseRatings.forEach(rating => {
        totalRating += rating.rating
    })
    return Math.floor(totalRating / courseRatings.length)
}