import { httpInterceptedService } from "@core/http-service";
import { useTranslation } from "react-i18next";
import CourseList from "../features/courses/components/course-list";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const Courses = () => {
  const data = useLoaderData();
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1">
            {t("courses.newCourse")}
          </a>
        </div>
        <Suspense fallback={<p className="text-info">{t("courses.info")}</p>}>

          <Await resolve={data.courses}>
            {
              (loadedCourse) => <CourseList courses={loadedCourse} />
            }
          </Await>

        </Suspense>
      </div>
    </div>
  )
}

export async function coursesLoader() {
  return defer({
    courses: loadCourses(),
  });
};

const loadCourses = async () => {
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
};

export default Courses;