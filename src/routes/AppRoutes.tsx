import { Route, Routes } from "react-router-dom"
import SurveyList from "../pages/SurveyList"
import AvailableParticipants from "../pages/AvailableParticipants"


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/surveys/:surveyId/available-participants" element={<AvailableParticipants />} />
            <Route path="/surveys/:surveyId/finished-participants" element={<div>Finished Participants</div>} />
        </Routes>
    )
}

export default AppRoutes