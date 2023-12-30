'use client';
import { Select } from '@radix-ui/themes'
import React, { use } from 'react'
import { fetchUsers } from '@/lib/actions/userActions';
// import { useState, useEffect } from 'react';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components";
import { updateIssue } from '@/lib/actions';
import toast, { Toaster } from 'react-hot-toast';

const AsigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => fetchUsers(),
        staleTime: 60 * 1000,
        retry: 3
    })

    if (error) {
        return null
    }

    if (isLoading) {
        return <Skeleton />
    }

    async function handleUpdateIssue(value: string) {
        const userId = value == "undefined" ? null : value;

        // Assign issue to user
        try {
            await updateIssue({ assignedToUserId: userId }, issue.id);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                toast.error(error.message)
            }
            else {
                toast.error("An error occurred!");
            }
        }
    }


    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || "undefined"} onValueChange={(value) => handleUpdateIssue(value)}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={"undefined"}>Unassigned</Select.Item>
                        {users?.map((user) => {
                            return (
                                <Select.Item key={user.id} value={user.id + "s"}>{user.name}</Select.Item>
                            )
                        })}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AsigneeSelect