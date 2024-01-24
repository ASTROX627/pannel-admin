import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
const Pagination = ({totalRecords, pageSize = 5, language}) => {
  const {t} = useTranslation();
  const pages = Math.ceil(totalRecords / pageSize);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("page") || 1;

  const prevPage = () => {
    if(currentPage > 1){
      setSearchParams({page: currentPage - 1})
    }
  }

  const nextPage = () => {
    if(currentPage < pages){
      setSearchParams({page: currentPage + 1})
    }
  }

  return(
    <nav>
      <ul className="pagination pagination-lg justify-content-center" style={{direction: "rtl"}}>
        <li className={`page-item  ${currentPage === 1 ? "disabled opacity-50": ""}`} onClick={prevPage} style={{width: "100px"}}>
          <a className="page-link text-center">
            {language === "fa"? t('page.next'): t('page.previous')}
          </a>
        </li>
        {
          _.times(pages, index => (
            <li key={`page${index + 1}`} className={`page-item ${index + 1 === currentPage? "active": ""}`} onClick={() => setSearchParams({page: index + 1})} >
              <a className="page-link">{index + 1}</a>
            </li>
          ))
        }
        <li className={`page-item ${currentPage === pages ? "disabled opacity-50" : ""}`} onClick={nextPage} style={{width: "100px"}}>
          <a className="page-link text-center">
            {language === "fa"? t('page.previous') : t('page.next')}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;