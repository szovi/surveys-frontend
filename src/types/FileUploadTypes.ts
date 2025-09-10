export type UploadTarget = 'surveys' | 'members' | 'statuses' | 'participations'

export type UploadFileParams = {
  file: File
}

export type UploadFileResponse = {
  target: UploadTarget
}

