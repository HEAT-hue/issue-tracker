import { Pencil2Icon } from "@radix-ui/react-icons"
import { Button, Flex } from "@radix-ui/themes"
import Link from "next/link"

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Link href={`/issues/${issueId}/edit`}>
                <Flex align={'center'} gap={'2'}>
                    <Pencil2Icon />
                    Edit Issue
                </Flex>
            </Link>
        </Button>
    )
}

export default EditIssueButton