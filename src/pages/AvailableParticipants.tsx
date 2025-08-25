import React, { useState, useMemo } from "react"
import { NavLink, useParams, useLocation } from "react-router-dom"
import DataList, { type Column } from "../components/DataList"
import type { AvailableParticipantDTO } from "../entities/AvailableParticipant"
import { useGetAvailableParticipantsPageQuery } from "../services/membersApi"
import Breadcrumb from "../components/Layout/Breadcrumb"
import { Breadcrumbs } from "../utils/breadcrumbMapper"
import "../styles/Breadcrumb.scss"
import { FaCheck, FaTimes } from "react-icons/fa"

const DEFAULT_PAGE_SIZE = 20;

const AvailableParticipants: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>()
  const location = useLocation()
  const surveyName = (location.state as { surveyName?: string })?.surveyName

  const [page, setPage] = useState(1);
  const [sortState, setSortState] = useState<{ accessor: string; direction: "ASC" | "DESC" }>({
    accessor: "fullName",
    direction: "ASC",
  })

  const { data: pageData, isLoading, isFetching, error, refetch } = useGetAvailableParticipantsPageQuery({
    surveyId: surveyId!,
    page,
    size: DEFAULT_PAGE_SIZE,
    sort: [`${sortState.accessor},${sortState.direction}`],
  })

  const handleSortChange = (accessor: string, direction: "ASC" | "DESC") => {
    setSortState({ accessor, direction })
    refetch()
  }

  const columns: Column<AvailableParticipantDTO>[] = useMemo(() => [
    { header: "Member Id", accessor: "memberId", sortable: true },
    { header: "Full Name", accessor: "fullName", sortable: true },
    { header: "E-mail Address", accessor: "emailAddress", sortable: true },
    { 
      header: "Is Active", 
      accessor: "isActive",
      sortable: true,
      render: (item) => 
        item.isActive 
          ? <FaCheck className="cell-center" style={{ color: "green" }} /> 
          : <FaTimes className="cell-center" style={{ color: "red" }} />
    },
    { 
      header: "Completed Surveys", 
      accessor: "memberId", 
      render: item => 
        <NavLink to={`/members/${item.memberId}/completed-surveys`} className="cell-link">
          View
        </NavLink> 
    },
    { 
      header: "Survey Points",
      accessor: "memberId", 
      render: item => 
        <NavLink to={`/members/${item.memberId}/survey-points`} className="cell-link">
          View
        </NavLink> 
    },
  ], [])

  const errorText = error 
    ? ("status" in error 
      ? (typeof error.data === "string" ? error.data : JSON.stringify(error.data)) 
      : (error as any)?.message ?? "Request failed") 
    : null

  return (
    <div className="available-participants">
      <Breadcrumb items={Breadcrumbs.availableParticipants(surveyId!, surveyName)} />

      <DataList<AvailableParticipantDTO>
        columns={columns}
        page={pageData}
        loading={isLoading || isFetching}
        error={errorText}
        onPageChange={setPage}
        sortState={sortState}
        onSortChange={handleSortChange}
        showPagerTop
        showPagerBottom
      />
    </div>
  )
}

export default AvailableParticipants
