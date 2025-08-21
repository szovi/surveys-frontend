import type { SurveyStatDTO } from '../../entities/SurveyStat'
import { createFetchSlice } from '../../store/createFetchSlice'

const { reducer, fetchThunk } = createFetchSlice<SurveyStatDTO>(
    'surveys',
    '/surveys/all-statistic'
)

export const fetchSurveyStats = fetchThunk
export default reducer