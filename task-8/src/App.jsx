import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JobProvider } from "./contexts/JobContext";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetails";
import RootLayout from "./layout/RootLayout";
import { ToastContainer } from "react-toastify";
import JobLayout from "./layout/JobLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <JobProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/jobs" element={<JobLayout />} >
              <Route index element={<Jobs />} />
              <Route path=":id" element={<JobDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </JobProvider>
  );
}

export default App;
