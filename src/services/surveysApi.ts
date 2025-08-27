import { api } from "./api"
import type { Page } from "../entities/Page"
import type { SurveyStatDTO } from "../entities/SurveyStat"
import type { CompletedSurveyDTO } from "../entities/CompletedSurvey"

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
        params.set("page", String(page))
        params.set("size", String(size))
        sort?.forEach(s => params.append("sort", s))
        return `/surveys/all-statistic?${params.toString()}`
      },
      providesTags: [{ type: "Survey", id: "LIST" }],
    }),
    getCompletedSurveysPage: build.query<Page<CompletedSurveyDTO>, 
      { memberId: string; page: number; size?: number; sort?: string[] }>({
        query: ({ memberId, page, size, sort }) => {
          const sortQuery = sort?.map(s => `sort=${encodeURIComponent(s)}`).join("&")
          return `/surveys/by-member-id-and-completed?memberId=${memberId}&page=${page}&size=${size}${sortQuery ? `&${sortQuery}` : ""}`
        },
      providesTags: [{ type: "Survey", id: "CompletedSurveyList" }],
    }),
    }),
  overrideExisting: false,
})

export const { 
  useGetSurveyStatsPageQuery,
  useGetCompletedSurveysPageQuery,
} = surveysApi
