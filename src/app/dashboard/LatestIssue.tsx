import { IssueStatusBadge } from "@/components"
import { Flex, Table } from "@radix-ui/themes"
import Link from "next/link"
import prisma from "../../../prisma/client"
import { Avatar } from "@radix-ui/themes"
import { Card, Heading } from "@radix-ui/themes"

const LatestIssue = async () => {

    // Fetch latest issues
    const latestIssues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' }, take: 5, include: { assignedToUser: true }
    })

    return (
        <>
            <Card>
                <Heading size={'4'} className="mb-3">Latest issues</Heading>

                {/* Table showing issues */}
                <Table.Root>

                    {/* Table Body */}
                    <Table.Body>
                        {latestIssues.map((issue) => {
                            return (
                                <Table.Row key={issue.id}>
                                    <Table.Cell>
                                        <Flex align={'center'} justify={'between'}>
                                            <Flex gap={'3'} direction={'column'}>
                                                <Link href={`/dashboard/issues/${issue.id}`}>
                                                    {issue.title}
                                                </Link>

                                                {/* Status badge */}
                                                <div className="w-max">
                                                    <IssueStatusBadge status={issue.status} />
                                                </div>
                                            </Flex>
                                            <Avatar className="cursor-pointer" radius="full" fallback={issue.assignedToUser?.name.charAt(0) ?? "?"} />
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table.Root>
            </Card>
        </>
    )
}

export default LatestIssue