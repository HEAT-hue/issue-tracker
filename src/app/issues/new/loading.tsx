import { Box, Button, TextField } from '@radix-ui/themes'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import Spinner from '@/components/Spinner'
import { register } from 'module'
import { Controller } from 'react-hook-form'

const LoadingNewIssuePage = () => {
    return (
        <Box className='space-y-3'>

            {/* Input text field */}
            <div className='space-y-1'>
                <Skeleton />
            </div>

            {/* Form Controller */}
            <div>
                <Skeleton count={3} width={"24rem"} />
            </div>

        </Box>
    )
}

export default LoadingNewIssuePage