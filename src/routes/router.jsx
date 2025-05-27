import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "@/pages/landingpage/LandingPage";
import InputPage from "@/pages/inputpage/InputPage";
import HasilDiagnosis from "@/pages/hasildiagnosis/HasilDiagnosis";
import PenyakitPage from "@/pages/penyakit/PenyakitPage";

import LoginPage from "@/pages/login/LoginPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import DataMasyarakat from "@/pages/dataadmin/DataMasyarakat";
import DetailDataMasyarakat from "@/pages/dataadmin/DetailDataMasyarakat";
import DataFeedBack from "@/pages/dataadmin/DataFeedBack";

import ProtectedRoute from "@/routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/inputpage",
    element: <InputPage />,
  },
  {
    path: "/hasildiagnosis",
    element: <HasilDiagnosis />,
  },
  {
    path: "/penyakit",
    element: <PenyakitPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/datamasyarakat",
    element: (
      <ProtectedRoute>
        <DataMasyarakat />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detaildatamasyarakat/:id",
    element: (
      <ProtectedRoute>
        <DetailDataMasyarakat />
      </ProtectedRoute>
    ),
  },
  {
    path: "/datafeedback",
    element: (
      <ProtectedRoute>
        <DataFeedBack />
      </ProtectedRoute>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
