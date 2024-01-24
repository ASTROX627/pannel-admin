import { Outlet } from "react-router-dom";
import ChangeLanguage from "../../public/components/change-language";
import ChangeTheme from "../../public/components/change-theme";

const IdentityLayout = () => {
  return(
    <div className='main d-flex justify-content-center w-100'>
      <nav className="navbar shadow-sm justify-content-start gap-3 align-items-center">
        <ChangeLanguage/>
        <ChangeTheme/>
      </nav>
      <main className='content d-flex p-0'>
        <div className='container d-flex flex-column'>
          <div className='row h-100'>
            <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
              <div className='d-table-cell align-middle'>
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
};

export default IdentityLayout;