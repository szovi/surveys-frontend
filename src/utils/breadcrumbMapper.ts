interface BreadcrumbItem {
    label: string
    to?: string
  }
  
export const Breadcrumbs = {
  surveyList: (): BreadcrumbItem[] => [
    { label: "Surveys", to: "/surveys" }
  ],

  availableParticipants: (surveyId: string, surveyName?: string): BreadcrumbItem[] => [
    { label: "Surveys", to: "/surveys" },
    { label: `Available Participants for ${surveyName ?? `Survey ${surveyId}`}` }
  ],

  finishedParticipants: (surveyId: string, surveyName?: string): BreadcrumbItem[] => [
    { label: "Surveys", to: "/surveys" },
    { label: `Finished Participants for ${surveyName ?? `Survey ${surveyId}`}` }
  ],

  upload: (): BreadcrumbItem[] => [
    { label: "Data Upload" }
  ]
}
