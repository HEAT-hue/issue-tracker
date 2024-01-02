import { LatestIssue, IssueSummary, IssueChart } from "./_components"
import prisma from "../../../prisma/client"

const DashboardPage = async () => {

    const openIssues = await prisma.issue.count({ where: { status: 'OPEN' } });
    const closedIssues = await prisma.issue.count({ where: { status: 'CLOSED' } });
    const inProgressIssues = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });

    return (
        <>
            {/* <LatestIssue />
            <IssueSummary openIssues={openIssues} closedIssues={closedIssues} inProgressIssues={inProgressIssues} /> */}
            <IssueChart openIssues={openIssues} closedIssues={closedIssues} inProgressIssues={inProgressIssues} />
        </>
    )
}

export default DashboardPage