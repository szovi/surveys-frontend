import { api } from "./api"
import type { Page } from "../entities/Page"
import type { SurveyStatDTO } from "../entities/SurveyStat"

type Params = {
  page: number
  size: number
  sort?: string[]         // pl. ["surveyId,ASC"]
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
  }),
  overrideExisting: false,
})

export const { useGetSurveyStatsPageQuery } = surveysApi
