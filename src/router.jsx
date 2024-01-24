import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/login";
import Register, { registerAction } from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import Courses, { coursesLoader } from "./routes/courses";
import MainLayout from "./layouts/mainLayout/main-layout";
import CoursesCategories, { courseCategoriesLoader } from "./routes/course-categories";
import CourseDetails, { courseDetailsLoader } from "./features/courses/components/course-details";
import { CategoryProvider } from "./features/categories/category-context";
import NotFound from "./routes/not-found";
import UnhandledException from "./routes/unhandled-exception";
import CourseDiscount, { courseDiscountLoader } from "./routes/course-discount";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <UnhandledException/>,
    children: [{
      element: <Courses/>,
      index: true,
      loader: coursesLoader
    },
    {
      path: 'course-categories',
      element:(
        <CategoryProvider>
          <CoursesCategories/>
        </CategoryProvider>
      ),
      loader: courseCategoriesLoader
    },
    {
      path: "courses/:id",
      element: <CourseDetails />,
      loader: courseDetailsLoader,
    },
    {
      path: "course-discount",
      element: <CourseDiscount/>,
      loader: courseDiscountLoader
    }
  ]
  },
  {
    element: <IdentityLayout/>,
    children: [
      {
        path: 'login',
        element: <Login/>,
        action: loginAction,
        errorElement: <Login/>
      },
      {
        path: 'register',
        element: <Register/>,
        action : registerAction,
        errorElement: <Register/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

export default router;