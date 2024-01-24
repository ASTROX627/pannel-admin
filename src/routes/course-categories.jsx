import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { httpInterceptedService } from "@core/http-service.js"
import { useTranslation } from "react-i18next";
import { Suspense, useState } from "react";
import CategoryList from "../features/categories/components/category-list";
import Modal from "../../public/components/modal";
import { toast } from "react-toastify"
import AddOrUpdateCategory from "../features/categories/components/add-or-update-category";
import { useCategoryContext } from "../features/categories/category-context";

const CoursesCategories = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const navigate = useNavigate();
  const {category} = useCategoryContext();

  const deleteCategory = categoryId => {
    setSelectedCategory(categoryId);
    setShowDeleteModal(true);
  }

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);
    const response = httpInterceptedService.delete(`/CourseCategory/${selectedCategory}`);
    toast.promise(
      response, {
      pending: t("toastify.deleting"),
      success: {
        render() {
          const url = new URL(window.location.href);
          navigate(url.pathname + url.search);
          return t("toastify.success")
        }
      },
      error: {
        render({data}) {
          return t("toastify." + data.response.data.code)
        }
      }
    }, {
      position: toast.POSITION.BOTTOM_LEFT
    }
    )


  }

  const { t } = useTranslation();
  const data = useLoaderData();
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <a className="btn btn-primary fw-bolder mt-n1" onClick={() => setShowAddCategory(true)}>
              {t("courses.category")}
            </a>
          </div>
          {
            (showAddCategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory}/>
          }
          <Suspense fallback={<p className="text-info">{t("courses.info")}</p>}>

            <Await resolve={data.categories}>
              {
                (loadedCategories) => <CategoryList deleteCategory={deleteCategory} categories={loadedCategories} />
              }
            </Await>

          </Suspense>
        </div>
      </div>
      <Modal isOpen={showDeleteModal} open={setShowDeleteModal} title={t("modal.delete")} body={t("modal.confirm")}>
        <button type="button" className="btn btn-secondary fw-bolder text-center" style={{ width: "75px" }}
          onClick={() => setShowDeleteModal(false)}
        >
          {t("modal.refuse")}
        </button>
        <button type="button" className="btn btn-primary fw-bolder text-center" style={{ width: "75px" }} onClick={handleDeleteCategory}>
          {t("modal.delete")}
        </button>
      </Modal>
    </>
  )
}

export async function courseCategoriesLoader({ request }) {
  return defer({
    categories: loadCategories({ request })
  })
}

const loadCategories = async ({ request }) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = 5;
  let url = '/CourseCategory/sieve';
  url += `?page=${page}&pageSize=${pageSize}`;
  const response = await httpInterceptedService.get(url);
  return response.data;
}

export default CoursesCategories;