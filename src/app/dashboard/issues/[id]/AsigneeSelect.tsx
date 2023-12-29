'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'
import { fetchUsers } from '@/lib/actions/userActions';
import { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components";

const AsigneeSelect = () => {

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

    return (
        <Select.Root defaultValue="apple">
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map((user) => {
                        return (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AsigneeSelect