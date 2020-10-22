import request from '@/utils/request'

interface Course {
  name: string;
  status: boolean;
  currentPage: number;
  pageSize: number;
  courseId: number;
}

export const getQueryCourses = (data: Course) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const getCourseById = (courseId: number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

export const changeState = (data: Course) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: data
  })
}

export const saveOrUpdateCourse = (data: Course) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}
