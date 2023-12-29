'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'
import { fetchUsers } from '@/lib/actions/userActions';
import { useState, useEffect } from 'react';
import { User } from '@prisma/client';

const AsigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([]);

    // Fetch users when component mounts
    useEffect(() => {
        (async () => {
            const users = await fetchUsers();
            setUsers(users)
        })()

    }, [])


    return (
        <Select.Root defaultValue="apple">
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) => {
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