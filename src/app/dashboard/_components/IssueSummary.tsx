import { Status } from "@prisma/client"
import { Flex, Card, Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
import { IssueStatusBadge } from "@/components"

interface Props {
    openIssues: number,
    inProgressIssues: number,
    closedIssues: number
}

const IssueSummary = ({ openIssues, inProgressIssues, closedIssues }: Props) => {

    // Issue containers
    const issueContainers: { label: string, value: number, status: Status }[] = [
        { label: 'Open Issues', value: openIssues, status: 'OPEN' },
        { label: 'In-progress issues', value: inProgressIssues, status: 'IN_PROGRESS' },
        { label: 'Closed Issues', value: closedIssues, status: 'CLOSED' },
    ]

    return (
        <Flex gap={'2'}>
            {issueContainers.map((issueContainer, index: number) => {
                return (
                    <Link className="block" key={index} href={`/dashboard/issues?status=${issueContainer.status}`}>
                        <Card asChild>
                            <Flex gap={'1'} direction={'column'}>
                                <Heading size={'3'} className="font-medium text-sm">{issueContainer.label}</Heading>
                                <div className="w-max ml-auto">
                                    <IssueStatusBadge status={issueContainer.status} />
                                </div>
                                <Text size={'4'} className="font-bold">{issueContainer.value}</Text>
                            </Flex>
                        </Card>
                    </Link>
                );
            })}
        </Flex>
    )
}

export default IssueSummary