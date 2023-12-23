import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />
})

const NewIssuePage = () => {

    return (
        <div className='max-w-xl space-y-3'>

            {/* Issue Form */}
            <IssueForm />
        </div>
    )
}

export default NewIssuePage