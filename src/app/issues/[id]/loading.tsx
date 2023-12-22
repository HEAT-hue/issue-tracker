import IssueStatusBadge from '@/components/issues/IssueStatusBadge'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import Markdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl'>
            <Flex gap={'3'} direction={'column'}>

                {/* Issue heading */}
                <Skeleton width={"5rem"} />

                {/* Issue date */}
                <Skeleton width={"8rem"} />

                {/* Issue status */}
                <div className='w-max'>
                    <Skeleton width={"3rem"} />
                </div>

                {/* Issue description */}
                <Card className='prose'>
                    <Skeleton width={"24rem"} count={3} />
                </Card>
            </Flex>
        </Box>
    )
}

export default LoadingIssueDetailPage