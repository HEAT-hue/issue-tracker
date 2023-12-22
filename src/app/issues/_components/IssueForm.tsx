'use client'
import { Spinner } from "@/components"
import { createIssue, updateIssue } from "@/lib/actions"
import { IssueSchema, IssueFormType } from "@/lib/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Button, Callout, Text, TextField } from "@radix-ui/themes"
import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
})

interface Prop {
    issue?: Issue
}

const IssueForm = ({ issue }: Prop) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormType>({ resolver: zodResolver(IssueSchema) });

    const [error, setError] = useState<string | undefined>(undefined);

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    async function handleSubmitIssue(data: IssueFormType) {

        try {
            // Loader
            setSubmitting(true);

            // If any issue is present, update it
            if (issue) {
                await updateIssue(data, issue.id);
            }
            else {
                // Create issue in the  server and redirect to issues page
                await createIssue(data);
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("An error occurred");
            }
        } finally {
            setSubmitting(false);
        }

    };

    return (
        <>
            {error && (
                <Callout.Root color='red'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}

            {/* Issue Form */}
            <form className='space-y-3' onSubmit={handleSubmit(handleSubmitIssue)}>

                {/* Input text field */}
                <div className='space-y-1'>
                    <TextField.Root>
                        <TextField.Input defaultValue={issue?.title} className='outline-none' placeholder="Title" {...register("title")} />
                    </TextField.Root>
                    {errors.title && <Text color='red' className='text-sm' as='div'>{errors.title.message}</Text>}
                </div>

                {/* Form Controller */}
                <div>
                    <Controller
                        name='description'
                        control={control}
                        defaultValue={issue?.description || ""}
                        render={({ field }) => <SimpleMDE placeholder='description...' {...field} />}
                    />
                    {errors.description && <Text color='red' className='text-sm' as='div'>{errors.description.message}</Text>}
                </div>

                {/* Edit or Submit Issue */}
                <Button disabled={isSubmitting} className={`cursor-pointer ${isSubmitting && 'bg-gray-400'}`}>{issue ? 'Edit Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}</Button>
            </form>
        </>
    )
}

export default IssueForm