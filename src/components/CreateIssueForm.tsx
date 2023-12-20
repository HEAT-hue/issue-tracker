'use client'
import { createIssue } from '@/lib/actions'
import { Button } from '@radix-ui/themes';

const CreateIssueForm = () => {

    async function handleClick() {
        const response: { status: boolean, data: any } = await createIssue({ title: "", description: "" });

        if (!response.status) {
            console.log(response.data);
            return;
        }

        console.log(response.data);

    }

    return (
        <form className='max-w-[320px] outline-none' action="">
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" className='border focus:border-blue-500 outline-none p-2' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="description">Description</label>
                    <textarea className='w-full resize-none h-24 border focus:border-blue-500 outline-none p-2' id="description" />
                </div>
            </div>
            <Button>New Issue</Button>
        </form>
    )
}

export default CreateIssueForm