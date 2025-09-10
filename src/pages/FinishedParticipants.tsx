import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import DataList from '../components/DataList'
import { useGetFinishedParticipantsPageQuery } from '../services/membersApi'
import Breadcrumb from '../components/Layout/Breadcrumb'
import { Breadcrumbs } from '../utils/breadcrumbMapper'
import { FaCheck, FaTimes } from 'react-icons/fa'
import '../styles/FinishedParticipants.scss'
import type { MemberDTO } from '../entities/Member'
import type { Column } from '../types/DataListTypes'
import { DEFAULT_PAGE_SIZE } from '../constants'

const FinishedParticipants: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>()
  const [page, setPage] = useState(1)
  const [sortState, setSortState] = useState<{ accessor: string; direction: 'ASC' | 'DESC' }>({
    accessor: 'fullName',
    direction: 'ASC',
  })

  const { data: pageData, isLoading, isFetching, error, refetch } = useGetFinishedParticipantsPageQuery({
    surveyId: surveyId!,
    page,
    size: DEFAULT_PAGE_SIZE,
    sort: [`${sortState.accessor},${sortState.direction}`],
  })

  const handleSortChange = (accessor: string, direction: 'ASC' | 'DESC') => {
    setSortState({ accessor, direction });
    refetch();
  }

  const columns: Column<MemberDTO>[] = useMemo(() => [
    { header: 'Member Id', accessor: 'memberId', sortable: true },
    { header: 'Full Name', accessor: 'fullName', sortable: true },
    { header: 'E-mail Address', accessor: 'emailAddress', sortable: true },
    { 
      header: 'Is Active', 
      accessor: 'isActive',
      sortable: true,
      render: (item) => 
        item.isActive 
          ? <FaCheck className="cell-center active-icon" /> 
          : <FaTimes className="cell-center inactive-icon" />
    },
  ], []);

  const errorText = error 
    ? ('status' in error 
        ? (typeof error.data === 'string' ? error.data : JSON.stringify(error.data)) 
        : (error as any)?.message ?? 'Request failed') 
    : null;

  return (
    <div className="finished-participants">
      <Breadcrumb items={Breadcrumbs.finishedParticipants(surveyId!)} />

      <DataList<MemberDTO>
        columns={columns}
        page={pageData}
        loading={isLoading || isFetching}
        error={errorText}
        onPageChange={setPage}
        sortState={sortState}
        onSortChange={handleSortChange}
        showPagerBottom
      />
    </div>
  );
};

export default FinishedParticipants;
