import { api } from './api'
import type { Page } from '../entities/Page'
import type { SurveyStatDTO } from '../entities/SurveyStat'
import type { CompletedSurveyDTO } from '../entities/CompletedSurvey'
import type { SurveyPointDTO } from '../entities/SurveyPoint'

/**
 * #SUMMARY:
 * 
 * Endpoint	                backend-responsing	            frontend-expects	          transformResponse needed?
    SurveyStatsPage	          Page<DTO[]>	                    Page<DTO[]>	                  ❌
    CompletedSurveysPage	    Page<DTO[]>	                    Page<DTO[]>	                  ❌
    SurveyPoints	            Record<string, number>	        DTO[]	                        ✅
    * 
 */


type Params = {
  page: number
  size: number
  sort?: string[]
}

export const surveysApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSurveyStatsPage: build.query<Page<SurveyStatDTO>, Params>({
      query: ({ page, size, sort }) => {
        const params = new URLSearchParams()
        params.set('page', String(page))
        params.set('size', String(size))
        sort?.forEach(s => params.append('sort', s))
        return `/surveys/all-statistic?${params.toString()}`
      },
      providesTags: [{ type: 'Survey', id: 'LIST' }],
    }),

    getCompletedSurveysPage: build.query<
      Page<CompletedSurveyDTO>,
      { memberId: string; page: number; size?: number; sort?: string[] }
    >({
      query: ({ memberId, page, size, sort }) => {
        const sortQuery = sort?.map(s => `sort=${encodeURIComponent(s)}`).join('&')
        return `/surveys/by-member-id-and-completed?memberId=${memberId}&page=${page}&size=${size}${
          sortQuery ? `&${sortQuery}` : ''
        }`
      },
      providesTags: [{ type: 'Survey', id: 'CompletedSurveyList' }],
    }),

    getSurveyPointsPage: build.query<SurveyPointDTO[], { memberId: string }>({
      query: ({ memberId }) => `/surveys/by-member-id-completion-points?memberId=${memberId}`,
      transformResponse: (response: Record<string, number>) => Object.entries(response).map(([surveyName, points]) => ({ surveyName, points })),
      providesTags: (_result: SurveyPointDTO[] | undefined, _error: unknown, arg: { memberId: string }) => [
        { type: 'Survey', id: `SurveyPoints-${arg.memberId}` },
      ],
    }),
  }),
  overrideExisting: false,
})

export const { 
  useGetSurveyStatsPageQuery,
  useGetCompletedSurveysPageQuery,
  useGetSurveyPointsPageQuery,
} = surveysApi
