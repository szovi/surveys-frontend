import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetCompletedSurveysPageQuery } from "../services/surveysApi";
import type { CompletedSurveyDTO } from "../entities/CompletedSurvey";
import type { Column } from "../components/DataList";
import Breadcrumb from "../components/Layout/Breadcrumb";
import { Breadcrumbs } from "../utils/breadcrumbMapper";
import DataList from "../components/DataList";

const DEFAULT_PAGE_SIZE = 20;

const CompletedSurveys: React.FC = ()=> {
    const { memberId } = useParams<{ memberId: string }>()
    const location = useLocation()
    const navigate = useNavigate()
    const memberName = (location.state as { memberName?: string })?.memberName


    const [page, setPage] = useState(1);
    const [sortState, setSortState] = useState<{ accessor: string; direction: "ASC" | "DESC" }>({
        accessor: "surveyId",
        direction: "ASC",
    })

    const { data: pageData, isLoading, isFetching, error, refetch } = useGetCompletedSurveysPageQuery({
        memberId: memberId!,
        page,
        size: DEFAULT_PAGE_SIZE,
        sort: [`${sortState.accessor},${sortState.direction}`],
    })

    const handleSortChange = (accessor: string, direction: "ASC" | "DESC") => {
        setSortState({ accessor, direction })
        refetch()
    }

    const columns: Column<CompletedSurveyDTO>[] = useMemo(() => [
        { header: "Survey ID", accessor: "surveyId", sortable: true },
        { header: "Name", accessor: "name", sortable: true },
        { header: "Expected completes", accessor: "expectedCompletes" },
        { header: "Completion points", accessor: "completionPoints" },
        { header: "Filtered points", accessor: "filteredPoints" },
    ], [])


    const errorText = error 
      ? ("status" in error 
        ? (typeof error.data === "string" ? error.data : JSON.stringify(error.data)) 
        : (error as any)?.message ?? "Request failed") 
      : null
      
    return (
        <div className="completed-surveys">
            <Breadcrumb items={Breadcrumbs.completedSurveys(memberId!, memberName)} />

            <button
                onClick={() => navigate(-1)}
                className="btn-back"
            >
                ← Vissza
            </button>

            <DataList<CompletedSurveyDTO>
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

export default CompletedSurveys
