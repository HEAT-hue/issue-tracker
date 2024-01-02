import { LatestIssue, IssueSummary, IssueChart } from "./_components"
import prisma from "../../../prisma/client"
import { Grid, Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const DashboardPage = async () => {

    const openIssues = await prisma.issue.count({ where: { status: 'OPEN' } });
    const closedIssues = await prisma.issue.count({ where: { status: 'CLOSED' } });
    const inProgressIssues = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });

    return (
        <>
            <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
                <Flex direction={'column'} gap={'5'}>
                    <IssueSummary openIssues={openIssues} closedIssues={closedIssues} inProgressIssues={inProgressIssues} />
                    <IssueChart openIssues={openIssues} closedIssues={closedIssues} inProgressIssues={inProgressIssues} />
                </Flex>

                <LatestIssue />
            </Grid>
        </>
    )
}

export default DashboardPage

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: 'View a summary of project issues'
};