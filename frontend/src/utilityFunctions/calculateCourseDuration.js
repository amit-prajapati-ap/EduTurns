import humanizeDuration from "humanize-duration"

export const calculateCourseDuration = (course) => {
    let time = 0
    course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
    return humanizeDuration(time * 60 * 1000, {units: ['h','m']})
}