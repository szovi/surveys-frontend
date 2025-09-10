import { Route, Routes } from 'react-router-dom'
import SurveyList from '../pages/SurveyList'
import AvailableParticipants from '../pages/AvailableParticipants'
import FinishedParticipants from '../pages/FinishedParticipants'
import UploadForm from '../components/Form/UploadForm'
import CompletedSurveys from '../pages/CompletedSurveys'
import SurveyPoints from '../pages/SurveyPoints'


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/surveys/:surveyId/available-participants" element={<AvailableParticipants />} />
            <Route path="/surveys/:surveyId/finished-participants" element={<FinishedParticipants />} />
            <Route path="/members/:memberId/completed-surveys" element={<CompletedSurveys />} />
            <Route path="/members/:memberId/survey-points" element={<SurveyPoints />} />
            <Route path="/upload" element={<UploadForm />} />
        </Routes>
    )
}

export default AppRoutes