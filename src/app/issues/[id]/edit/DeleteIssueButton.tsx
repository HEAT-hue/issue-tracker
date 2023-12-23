'use client'
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { deleteIssue } from "@/lib/actions"
import { useState } from "react"
import { DEFAULT_ERR_MSG } from "@/lib/definitions"
import { Spinner } from "@/components"
import classNames from "classnames"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const [error, setError] = useState<string | undefined>(undefined);


    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    async function handleDeleteIssueClick() {
        try {
            // Loader
            setSubmitting(true);

            await deleteIssue(issueId);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError(DEFAULT_ERR_MSG);
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button
                        disabled={isSubmitting} color="red"
                        className={classNames({
                            'bg-red-600': !isSubmitting,
                            'bg-gray-300': isSubmitting,
                            'transition-colors': true
                        })}
                    >
                        Delete Issue
                        {isSubmitting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 350 }}>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray" className="bg-gray-300">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={handleDeleteIssueClick} variant="solid" color="red" className="bg-red-600">
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root >

            {/* Error dialogue box */}
            <AlertDialog.Root open={error ? true : false}>
                <AlertDialog.Content style={{ maxWidth: 350 }}>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        {error || "An error occurred!"}
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4">
                        <AlertDialog.Action>
                            <Button onClick={() => setError(undefined)} variant="soft" color="gray" className="bg-gray-300">
                                Close
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root >
        </>
    )
}

export default DeleteIssueButton