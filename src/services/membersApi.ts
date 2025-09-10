import { api } from './api'
import type { MemberDTO } from '../entities/Member'

export const membersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAvailableParticipantsPage: build.query<{
      content: MemberDTO[]
      pageNumber: number
      pageSize: number
      totalElements: number
      numberOfElements: number
    }, { surveyId: string; page: number; size: number; sort?: string[] }>({
      query: ({ surveyId, page, size, sort }) => {
        const sortQuery = sort?.map(s => `sort=${encodeURIComponent(s)}`).join('&')
        return `/members/by-not-participated-survey-and-active?surveyId=${surveyId}&page=${page}&size=${size}${sortQuery ? `&${sortQuery}` : ''}`
      },
      providesTags: ['Participant'],
    }),

    getFinishedParticipantsPage: build.query<{
      content: MemberDTO[]
      pageNumber: number
      pageSize: number
      totalElements: number
      numberOfElements: number
    }, { surveyId: string; page: number; size: number; sort?: string[] }>({
      query: ({ surveyId, page, size, sort }) => {
        const sortQuery = sort?.map(s => `sort=${encodeURIComponent(s)}`).join('&')
        return `/members/by-survey-and-completed?surveyId=${surveyId}&page=${page}&size=${size}${sortQuery ? `&${sortQuery}` : ''}`
      },
      providesTags: ['Participant'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAvailableParticipantsPageQuery,
  useGetFinishedParticipantsPageQuery,
} = membersApi
