'use client'
import React from 'react'
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts'
import { Card } from '@radix-ui/themes'

interface Props {
    openIssues: number,
    inProgressIssues: number,
    closedIssues: number
}

const IssueChart = ({ openIssues, inProgressIssues, closedIssues }: Props) => {

    const data = [
        {
            label: 'Open Issues',
            value: openIssues,
            fill: 'var(--red-9)',
        },
        {
            label: 'In-progress Issues',
            value: inProgressIssues,
            fill: 'var(--accent-9)',
        },
        {
            label: 'Closed Issues',
            value: closedIssues,
            fill: 'var(--green-9)',
        },
    ]

    return (
        <Card>
            <ResponsiveContainer height={300} width="100%">
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" barSize={60} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart