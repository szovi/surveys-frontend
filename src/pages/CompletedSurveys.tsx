import { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetCompletedSurveysPageQuery } from '../services/surveysApi'
import type { CompletedSurveyDTO } from '../entities/CompletedSurvey'
import Breadcrumb from '../components/Layout/Breadcrumb'
import { Breadcrumbs } from '../utils/breadcrumbMapper'
import DataList from '../components/DataList'
import { DEFAULT_PAGE_SIZE } from '../constants'
import type { Column } from '../types/DataListTypes'


const CompletedSurveys: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>()
  const location = useLocation()

  const state = location.state as {
    memberName?: string
    surveyId?: string
    surveyName?: string
  }

  const memberName = state?.memberName
  const surveyId = state?.surveyId
  const surveyName = state?.surveyName

  const [page, setPage] = useState(1)
  const [sortState, setSortState] = useState<{
    accessor: string
    direction: 'ASC' | 'DESC'
  }>({
    accessor: 'surveyId',
    direction: 'ASC',
  })

  const {
    data: pageData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetCompletedSurveysPageQuery({
    memberId: memberId!,
    page,
    size: DEFAULT_PAGE_SIZE,
    sort: [`${sortState.accessor},${sortState.direction}`],
  })

  const handleSortChange = (accessor: string, direction: 'ASC' | 'DESC') => {
    setSortState({ accessor, direction })
    refetch()
  }

  const columns: Column<CompletedSurveyDTO>[] = useMemo(
    () => [
      { header: 'Survey ID', accessor: 'surveyId', sortable: true },
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Expected completes', accessor: 'expectedCompletes' },
      { header: 'Completion points', accessor: 'completionPoints' },
      { header: 'Filtered points', accessor: 'filteredPoints' },
    ],
    []
  )

  const errorText = error
    ? 'status' in error
      ? typeof error.data === 'string'
        ? error.data
        : JSON.stringify(error.data)
      : (error as { message?: string })?.message ?? 'Request failed'
    : null

  return (
    <div className="completed-surveys">
      <Breadcrumb
        items={Breadcrumbs.completedSurveys(
          memberId!,
          memberName,
          surveyId!,
          surveyName
        )}
      />

      <DataList<CompletedSurveyDTO>
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

export default CompletedSurveys
