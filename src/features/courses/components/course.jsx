import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Course = ({ title, coverImageUrl, courseLevel, description, duration, numOfReviews , id }) => {
  const { t } = useTranslation();
  return (
    <div className="card h-100">
      <img className="card-img-top" src={coverImageUrl} />
      <div className="card-header px-4 pt-4 pb-0 " style={{direction: "rtl"}}>
        <div className="badge bg-primary my-2 fw-bolder">
          {courseLevel}
        </div>
        <h4 className="mb-0" style={{direction: "rtl"}}>
          <Link to={`/courses/${id}`} >{title}</Link>
        </h4>
      </div>
      <div className="card-body d-flex flex-column px-4 pt-2">
        <p className="text-truncate-3 mt-auto" style={{direction: "rtl"}}>{description}</p>
      </div>
      <div className="card-footer fs-sm d-flex align-items-center fw-bolder text-secondary justify-content-between">
        <div className="d-flex align-items-center gap-1 w-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-clock align-middle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {`${duration} ${t("course.duration")} `}
        </div>
        <div className="d-flex align-items-center gap-1 w-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle align-middle me-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          {`${numOfReviews} ${t("course.reviews")}`}
        </div>
      </div>
    </div>
  )
}

export default Course;