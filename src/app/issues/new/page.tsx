'use client';
import React from 'react'
import { Text, TextField } from '@radix-ui/themes'
import { Button } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import { createIssue } from '@/lib/actions';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';
import { CreateIssueSchema } from '@/lib/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
})

// Extract inferred type from schema
type IssueForm = z.infer<typeof CreateIssueSchema>;

const NewIssuePage = () => {

    const [error, setError] = useState<string | undefined>(undefined);

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(CreateIssueSchema) });

    async function handleSubmitIssue(data: IssueForm) {

        try {
            // Loader
            setSubmitting(true);

            // Create issue in the  server and redirect to issues page
            await createIssue(data);
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
        <div className='max-w-xl space-y-3'>
            {error && (
                <Callout.Root color='red'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}
            <form className='space-y-3' onSubmit={handleSubmit(handleSubmitIssue)}>

                {/* Input text field */}
                <div className='space-y-1'>
                    <TextField.Root>
                        <TextField.Input className='outline-none' placeholder="Title" {...register("title")} />
                    </TextField.Root>
                    {errors.title && <Text color='red' className='text-sm' as='div'>{errors.title.message}</Text>}
                </div>

                {/* Form Controller */}
                <div>
                    <Controller
                        name='description'
                        control={control}
                        defaultValue=""
                        render={({ field }) => <SimpleMDE placeholder='description...' {...field} />}
                    />
                    {errors.description && <Text color='red' className='text-sm' as='div'>{errors.description.message}</Text>}
                </div>

                <Button disabled={isSubmitting} className={`cursor-pointer ${isSubmitting && 'bg-gray-400'}`}>Submit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage