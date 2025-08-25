import { api } from "./api"

export type UploadTarget = "surveys" | "members" | "statuses" | "participations"

type UploadFileParams = {
  target: UploadTarget
  file: File
}

const targetTagMap: Record<UploadTarget, "Survey" | "Member" | "Status" | "Participant"> = {
  surveys: "Survey",
  members: "Member",
  statuses: "Status",
  participations: "Participant",
}

export const dataUploadApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<void, UploadFileParams>({
      query: ({ target, file }) => {
        const formData = new FormData()
        formData.append("file", file)

        return {
          url: `/${target}`,
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags: (_result, _error, { target }) => [{ type: targetTagMap[target], id: "LIST" }],
    }),
  }),
  overrideExisting: false,
})

export const { useUploadFileMutation } = dataUploadApi
