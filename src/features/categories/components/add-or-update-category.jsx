import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { httpInterceptedService } from "/src/core/http-service.js";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useCategoryContext} from "../category-context"
import { useEffect } from "react";

const AddOrUpdateCategory = ({ setShowAddCategory }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const {category, setCategory} = useCategoryContext();

  useEffect(() => {
    if(category) {
      setValue("name", category.name);
      setValue("id", category.id);
    }
  },[category])
 
  const onClose = () => {
    setShowAddCategory(false);
    setCategory(null);
  }

  const onSubmit = (data) => {
    setShowAddCategory(false);
    const response = httpInterceptedService.post(`/CourseCategory/`, data);
    toast.promise(
      response, {
      pending: t("updateCategory.saving"),
      success: {
        render() {
          const url = new URL(window.location.href);
          navigate(url.pathname + url.search);
          if(category){
            setCategory(null);
          }
          return t("toastify.success")
        }
      },
      error: {
        render({ data }) {
          if(data.response.status === 400){
            return t("toastify." + data.response.data.code)
          } else {
            return
          }
        }
      }
    }, {
      position: toast.POSITION.BOTTOM_LEFT
    }
    )
  }

  return (
    <div className="card">
      <div className="card-body">
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">{t("updateCategory.name")}</label>
            <input
              className={`form-control from-control-lg ${errors.name && "is-invalid"}`}
              {...register("name", { required: true })}
            />
            {
              errors.name && errors.name.type === 'required' && (
                <p className="text-danger small fw-bolder mt-2">{t("updateCategory.validation.nameRequired")}</p>
              )
            }
          </div>
          <div className="text-start mt-3">
            <button type="button" className="btn btn-lg btn-secondary ms-2" onClick={onClose}>
              {t("updateCategory.close")}
            </button>
            <button type="submit" className="btn btn-lg btn-primary ms-2">
              {t("updateCategory.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddOrUpdateCategory;