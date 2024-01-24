import { useLoaderData } from "react-router-dom";
import { httpInterceptedService } from "@core/http-service.js"
import { useTranslation } from "react-i18next";

const CourseDetails = () => {
  const {t} = useTranslation();
  const data = useLoaderData();
  return (<>
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body pt-0">
            <img
              className="mx-auto my-4 d-block rounded"
              style={{ width: "30%" }}
              src={data.coverImageUrl}
            />
 
            <div class="d-flex flex-column justify-content-center pe-4 text-center" >
              <div class="badge bg-info my-2 align-self-center">
                {data.courseCategory}
              </div>
              <h4 style={{direction: "rtl"}}>{data.title}</h4>
              <p style={{direction: "rtl"}}>{data.description}</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-3 col-xl-2 d-flex">
        <div className="card flex-fill text-center">
          <div className="card-header">
            <h5 className="card-title mb-0 mt-2">{t('details.time')}</h5>
          </div>
          <div className="card-body my-0 pt-0">
            <h4 className="text-info fw-bolder">{data.duration + " " + t('course.duration')}</h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xl-2 d-flex">
        <div className="card flex-fill text-center">
          <div className="card-header">
            <h5 className="card-title mb-0 mt-2">{t('details.level')}</h5>
          </div>
          <div className="card-body my-0 pt-0">
            <h4 className="text-info fw-bolder">{data.courseLevel}</h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xl-2 d-flex">
        <div className="card flex-fill text-center">
          <div className="card-header">
            <h5 className="card-title mb-0 mt-2">{t('details.numOfChapters')}</h5>
          </div>
          <div className="card-body my-0 pt-0">
            <h4 className="text-info fw-bolder">
              {data.numOfChapters + " " + t('course.chapter')}
            </h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xl-2 d-flex">
        <div className="card flex-fill text-center">
          <div className="card-header">
            <h5 className="card-title mb-0 mt-2">{t('details.numOfLectures')}</h5>
          </div>
          <div className="card-body my-0 pt-0">
            <h4 className="text-info fw-bolder">
              {data.numOfLectures + " " + t('course.lecture')}
            </h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xl-2 d-flex">
        <div className="card flex-fill text-center">
          <div className="card-header">
            <h5 className="card-title mb-0 mt-2">{t('details.numOfReviews')}</h5>
          </div>
          <div className="card-body my-0 pt-0">
            <h4 className="text-info fw-bolder">
              {data.numOfReviews + " " + t('course.reviews')}
            </h4>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xl-2 d-flex">
        <div className="card flex-fill text-center">
          <div className="card-header">
            <h5 className="card-title mb-0 mt-2">{t('details.averageReviewRating')}</h5>
          </div>
          <div className="card-body my-0 pt-0">
            <h4 className="text-info fw-bolder">
              {data.averageReviewRating + " " + t('course.rate')}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export async function courseDetailsLoader({ params }) {
  const response = await httpInterceptedService.get(`/Course/by-id/${params.id}`);
  return response.data;
}

export default CourseDetails;