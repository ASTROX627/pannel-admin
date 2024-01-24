import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import CourseDiscountList from "../features/courses/components/course-discount-list";
import { useTranslation } from "react-i18next";
import { httpInterceptedService } from "@core/http-service";

const CourseDiscount = () => {
  const data = useLoaderData();
  const {t} = useTranslation();
  return(
    <>
      <Suspense fallback={<p className="text-info">{t('courses.info')}</p>}>
        <Await resolve={data.discounts}>
          {
            (loadedDiscount) => <CourseDiscountList discounts={loadedDiscount}/>
          }
        </Await>
      </Suspense>
    </>

  )
}

export async function courseDiscountLoader (){
  return defer({
    discounts: loadDiscounts(),
  });
};

const loadDiscounts = async() => {
  const response = await httpInterceptedService.get("/Course/discount");
  return response.data;
}

export default CourseDiscount;