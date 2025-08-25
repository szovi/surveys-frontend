import { Route, Routes } from "react-router-dom"
import SurveyList from "../pages/SurveyList"
import AvailableParticipants from "../pages/AvailableParticipants"
import FinishedParticipants from "../pages/FinishedParticipants"
import UploadForm from "../components/Form/UploadForm"


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/surveys/:surveyId/available-participants" element={<AvailableParticipants />} />
            <Route path="/surveys/:surveyId/finished-participants" element={<FinishedParticipants />} />
            <Route path="/members/:memberId/completed-surveys" element={<div>Completed Surveys</div>} />
            <Route path="/upload" element={<UploadForm />} />
        </Routes>
    )
}

export default AppRoutes