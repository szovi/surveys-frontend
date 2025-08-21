// src/pages/AvailableParticipants.tsx
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { type RootState, type AppDispatch } from "../store"
import DataList, { type Column } from "../components/DataList"
import { type AvailableParticipantDTO } from "../entities/AvailableParticipant"
import { fetchAvailableParticipants } from "../features/members/availableParticipantsSlice"

const AvailableParticipants: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const { items, loading, error } = useSelector(
    (state: RootState) => state.availableParticipants
  )

  useEffect(() => {
    if (surveyId) dispatch(fetchAvailableParticipants(surveyId))
  }, [dispatch, surveyId])

  const columns: Column<AvailableParticipantDTO>[] = [
    { header: "Member Id", accessor: "memberId" },
    { header: "Full Name", accessor: "fullName" },
    { header: "E-mail Address", accessor: "emailAddress" },
    { header: "Is Active", accessor: "isActive" },
  ]

  return (
    <div className="available-participants">
      <h1>Available Participants for Survey {surveyId}</h1>
      <DataList<AvailableParticipantDTO>
        columns={columns}
        data={items}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default AvailableParticipants
