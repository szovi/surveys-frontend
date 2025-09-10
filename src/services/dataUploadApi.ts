import type { UploadFileParams, UploadFileResponse, UploadTarget } from '../types/FileUploadTypes'
import { api } from './api'

const targetTagMap: Record<UploadTarget, 'Survey' | 'Member' | 'Status' | 'Participant'> = {
  surveys: 'Survey',
  members: 'Member',
  statuses: 'Status',
  participations: 'Participant',
}

const headerMap: Record<UploadTarget, string[]> = {
  members: ['Member Id', 'Full name', 'E-mail address', 'Is Active'],
  participations: ['Member Id', 'Survey Id', 'Status', 'Length'],
  statuses: ['Status Id', 'Name'],
  surveys: ['Survey Id', 'Name', 'Expected completes', 'Completion points', 'Filtered points'],
}

const detectTargetFromHeader = (headerLine: string): UploadTarget | null => {
  const columns = headerLine.split(',').map(c => c.trim())

  for (const [target, expected] of Object.entries(headerMap) as [UploadTarget, string[]][]) {
    const matches =
      expected.length === columns.length &&
      expected.every((v, i) => v === columns[i])

    if (matches) {
      return target
    }
  }

  return null
}

export const dataUploadApi = api.injectEndpoints({
  endpoints: build => ({
    uploadFile: build.mutation<UploadFileResponse, UploadFileParams>({
      async queryFn(args, _api, _extra, baseQuery) {
        const { file } = args
        const text = await file.text()
        const firstLine = text.split('\n')[0].trim()
        const target = detectTargetFromHeader(firstLine)

        if (!target) {
          return { error: { status: 400, data: 'Unknown file header' } }
        }

        const formData = new FormData()
        formData.append('file', file)

        const result = await baseQuery({
          url: `/${target}`,
          method: 'POST',
          body: formData,
        })

        if (result.error) {
          return { error: result.error }
        }

        return { data: { target } }
      },
      invalidatesTags: result =>
        result ? [{ type: targetTagMap[result.target], id: 'LIST' }] : [],
    }),
  }),
  overrideExisting: false,
})

export const { useUploadFileMutation } = dataUploadApi
