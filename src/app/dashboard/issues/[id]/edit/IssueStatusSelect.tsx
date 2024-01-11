'use client';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { updateIssue } from '@/lib/actions';
import toast, { Toaster } from 'react-hot-toast';

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {

    async function handleUpdateIssue(status: Status) {

        // Update Created Issue Status
        try {
            await updateIssue({ status }, issue.id);

            toast.success("Issue status has been updated successfully!");

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
            else {
                toast.error("An error occurred!");
            }
        }
    }


    return (
        <>
            <Select.Root defaultValue={issue.status || "undefined"} onValueChange={(value) => handleUpdateIssue(value as Status)}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group className='outline-none border-none'>
                        <Select.Label>Select status</Select.Label>
                        <Select.Item key={1} value={Status.OPEN} className='hover:bg-[red] hover:text-white border-none'>OPEN</Select.Item>
                        <Select.Item key={2} value={Status.IN_PROGRESS} className='hover:bg-[violet] hover:text-white'>IN_PROGRESS</Select.Item>
                        <Select.Item key={3} value={Status.CLOSED} className='hover:bg-[green] hover:text-white'>CLOSED</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default IssueStatusSelect