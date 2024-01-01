"use client";
import { ztReport, ztResultsOfReportsInfiniteQuery } from "@/Types/Report";
import { Report } from "@/components/Admin/Report";
import { Container } from "@/components/ui/Container";
import { REPORTS_LIMIT } from "@/data/pageLimiter";
import { QueryInfinite } from "@/utils/QueryInfinite";
import React, { useCallback, useEffect, useState } from "react";

export default function ReportPage() {
  const [reports, setReports] = useState<ztReport[]>([]);
  const [skip, setSkip] = useState(0);
  const [end, setEnd] = useState(false);
  const fetchingReports = useCallback(async () => {
    QueryInfinite({
      url: "reports",
      cb: (result: ztResultsOfReportsInfiniteQuery) => {
        console.log(result)
        setReports(oldReports => [...oldReports, ...result.reports])
        const lastPageNumber = Math.ceil(result.reportsCount / REPORTS_LIMIT);
        if (skip / REPORTS_LIMIT < lastPageNumber) {
          setSkip(skip + REPORTS_LIMIT);
          setSkip(skip + REPORTS_LIMIT);
        } else if (true) {
          setEnd(true);
        }
      },
      params: { limit: 10, skip },
    });
  }, [skip]);
  useEffect(() => {
    fetchingReports();
  }, [])
  return <Container>
    <h1 className="font-bold text-2xl my-5">Reports:</h1>
    <div className="flex gap-3 flex-col">
      {reports.map(report => {
        return <Report key={report._id} onSetReports={setReports} report={report} />
      })}
    </div>

  </Container>;
}
