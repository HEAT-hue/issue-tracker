import { Box } from "@radix-ui/themes"
import { Skeleton } from "@/components";

const IssueFormSkeleton = () => {
    return (
        <Box className='space-y-3'>

            {/* Input text field */}
            <div className='space-y-1'>
                <Skeleton width={"3rem"} />
            </div>

            {/* Form Controller */}
            <div>
                <Skeleton count={3} width={"24rem"} />
            </div>

        </Box>
    )
}

export default IssueFormSkeleton