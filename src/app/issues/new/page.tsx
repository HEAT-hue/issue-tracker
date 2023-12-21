'use client'
import React from 'react'
import { TextField } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { createIssue } from '@/lib/actions';

interface IssueForm {
    title: string,
    description: string;
}

const NewIssuePage = () => {

    const { register, control, handleSubmit, watch, formState: { errors }, } = useForm<IssueForm>();

    async function handleSubmitIssue(data: IssueForm) {

        try {
            // Create issue in the  server and redirect to issues page
            await createIssue(data);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(handleSubmitIssue)}>
            {/* Input text field */}
            <TextField.Root>
                <TextField.Input className='outline-none' placeholder="Title" {...register("title")} />
            </TextField.Root>

            {/* Form Controller */}
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='description...' {...field} />}
            />
            <Button className='cursor-pointer'>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage