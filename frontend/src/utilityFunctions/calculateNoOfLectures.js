export const calculateNoOfLectures = (course) => {
    let totalLectures = 0
    course.courseContent.forEach(chapter => {
        if (Array.isArray(chapter.chapterContent)) {
            totalLectures += chapter.chapterContent.length
        }
    })
    return totalLectures
}