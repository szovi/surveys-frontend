import { useSelector, useDispatch } from "react-redux"
import { type AppDispatch, type RootState } from "../store"
import DataList, { type Column } from "../components/DataList"
import type { SurveyStatDTO } from "../entities/SurveyStat"
import { useEffect } from "react"
import { fetchSurveyStats } from "../features/surveys/surveySlice"
import { NavLink } from "react-router-dom"


const SurveyList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading, error } = useSelector((state: RootState) => state.survey)

    const columns: Column<SurveyStatDTO>[] = [
        { header: "Survey ID", accessor: "surveyId" },
        { header: "Survey Name", accessor: "surveyName" },
        { header: "Completed", accessor: "numberOfCompletes" },
        { header: "Filtered Participants", accessor: "numberOfFilteredParticipants" },
        { header: "Rejected Participants", accessor: "numberOfRejectedParticipants" },
        { header: "Avg Time Spent On", accessor: "averageLengthOfTimeSpentOnSurvey" },
        {
            header: "Available Participants",
            accessor: "surveyId",
            render: (item: SurveyStatDTO) => (
                <NavLink to={`/surveys/${item.surveyId}/available-participants`}>
                    View
                </NavLink>
            )
        },
        {
            header: "Finished Participants",
            accessor: "surveyId",
            render: (item: SurveyStatDTO) => (
                <NavLink to={`/surveys/${item.surveyId}/finished-participants`}>
                    View
                </NavLink>
            )
        }
      ]

    useEffect(() => {
        if (items.length === 0 && !loading && !error) {
            dispatch(fetchSurveyStats())
        }
    }, [dispatch])

    return (
        <div className="survey-list">
            <h1>Survey List</h1>
            <DataList<SurveyStatDTO>
                columns={columns}
                data={items}
                loading={loading}
                error={error}
            />
        </div>
    )
}

export default SurveyList