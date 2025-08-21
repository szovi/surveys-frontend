export interface SurveyStatDTO {
  surveyId: number
  surveyName: string
  numberOfCompletes: number
  numberOfFilteredParticipants: number
  numberOfRejectedParticipants: number
  averageLengthOfTimeSpentOnSurvey: number
}