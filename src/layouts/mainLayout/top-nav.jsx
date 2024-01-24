import { useTranslation } from "react-i18next";
import { useAppContext } from "../../contexts/app/app-context";
import ChangeLanguage from "/public/components/change-language";
import ChangeTheme from "/public/components/change-theme";
import { useNavigate } from "react-router-dom";
const TopNav = () => {
  const {t} = useTranslation();
  const {toggleSidebar} = useAppContext();
  const {language} = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-3 me-3">
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className={`${language === "fa"? "me-auto" : "ms-auto"}`}>
        <button className="btn ms-2 btn-outline-danger fw-bolder" onClick={logout}>
          {t("logout.logout")}
        </button>
      </div>
    </nav>
  )
}

export default TopNav;