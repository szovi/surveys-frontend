import { useState, useMemo } from "react"
import { NavLink } from "react-router-dom"
import DataList, { type Column } from "../components/DataList"
import type { SurveyStatDTO } from "../entities/SurveyStat"
import { useGetSurveyStatsPageQuery } from "../services/surveysApi"
import Breadcrumb from "../components/Layout/Breadcrumb"
import { Breadcrumbs } from "../utils/breadcrumbMapper"

const DEFAULT_PAGE_SIZE = 20

const SurveyList: React.FC = () => {
  const [page, setPage] = useState(1)
  const [sortState, setSortState] = useState<{ accessor: string; direction: "ASC" | "DESC" }>({
    accessor: "surveyId",
    direction: "ASC",
  })

  const { data: pageData, isLoading, isFetching, error, refetch } = useGetSurveyStatsPageQuery({
    page,
    size: DEFAULT_PAGE_SIZE,
    sort: [`${sortState.accessor},${sortState.direction}`],
  })

  const columns: Column<SurveyStatDTO>[] = useMemo(() => [
    { header: "Survey ID", accessor: "surveyId", sortable: true },
    { header: "Survey Name", accessor: "name", sortable: true },
    { header: "Completed", accessor: "numberOfCompletes" },
    { header: "Filtered Participants", accessor: "numberOfFilteredParticipants" },
    { header: "Rejected Participants", accessor: "numberOfRejectedParticipants" },
    { header: "Avg Time Spent On", accessor: "averageLengthOfTimeSpentOnSurvey" },
    { 
      header: "Available Participants", 
      accessor: "surveyId", 
      sortable: false,
      render: item => (
        <NavLink 
          to={`/surveys/${item.surveyId}/available-participants`} 
          state={{ surveyName: item.surveyName }}
        >
          View
        </NavLink>
      ) 
    },
    { 
      header: "Finished Participants", 
      accessor: "surveyId", 
      sortable: false,
      render: item => (
        <NavLink 
          to={`/surveys/${item.surveyId}/finished-participants`} 
          state={{ surveyName: item.surveyName }}
        >
          View
        </NavLink>
      ) 
    },
  ], [])

  const errorText = error 
    ? ("status" in error 
        ? (typeof error.data === "string" ? error.data : JSON.stringify(error.data)) 
        : (error as any)?.message ?? "Request failed") 
    : null

  const handleSortChange = (accessor: string, direction: "ASC" | "DESC") => {
    setSortState({ accessor, direction });
    refetch()
  }

  return (
    <div className="survey-list">
      <Breadcrumb items={Breadcrumbs.surveyList()} />

      <DataList<SurveyStatDTO>
        columns={columns}
        page={pageData}
        loading={isLoading || isFetching}
        error={errorText}
        onPageChange={setPage}
        sortState={sortState}
        onSortChange={handleSortChange}
        showPagerTop
        showPagerBottom
      />
    </div>
  )
}

export default SurveyList;
