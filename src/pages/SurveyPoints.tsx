import { useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Breadcrumb from '../components/Layout/Breadcrumb'
import { Breadcrumbs } from '../utils/breadcrumbMapper'
import { useGetSurveyPointsPageQuery } from '../services/surveysApi'
import type { SurveyPointDTO } from '../entities/SurveyPoint'
import DataList from '../components/DataList'
import '../styles/SurveyPoints.scss'
import type { Column } from '../types/DataListTypes'

const SurveyPoints: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>()
  const location = useLocation()
  
  const state = location.state as {
    surveyId?: string
    surveyName?: string
    memberName?: string
  } | undefined


  const surveyId = state?.surveyId ?? ''
  const surveyName = state?.surveyName
  const memberName = state?.memberName

  const { data: pointsData, isLoading, isFetching, error } = useGetSurveyPointsPageQuery({
    memberId: memberId!,
  })

  const columns: Column<SurveyPointDTO>[] = useMemo(
    () => [
      { header: 'Survey Name', accessor: 'surveyName' },
      { header: 'Points', accessor: 'points' },
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
    <div className="survey-points">
      <Breadcrumb
        items={Breadcrumbs.surveyPoints(
          memberId!,
          memberName,
          surveyId,
          surveyName
        )}
      />

      <DataList<SurveyPointDTO>
        columns={columns}
        page={pointsData ?? []}
        loading={isLoading || isFetching}
        error={errorText}
        showPagerTop={false}
        showPagerBottom={false}
      />
    </div>
  )
}

export default SurveyPoints
