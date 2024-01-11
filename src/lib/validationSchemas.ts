import { z } from 'zod';
import { Status } from '@prisma/client';

// Create object zchema
export const IssueSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).max(255),
    description: z.string().min(1, { message: 'Description is required' }),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).max(255).optional(),
    description: z.string().min(1, { message: 'Description is required' }).max(65555).optional(),
    assignedToUserId: z.string().max(255).optional().nullable(),
    status: z.nativeEnum(Status).optional()
});

export const CreateUserSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).max(20),
    email: z.string().email().min(1, { message: 'Name is required' }),
    password: z
        .string()
        .min(8, { message: "Password must be 5 or more characters long" })
        .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter')
        .refine((value) => /[a-z]/.test(value), 'Password must contain at least one lower letter')
    // .refine((value) => /[0-9]/.test(value), 'String must contain at least a digit')
    // .refine((value) => /[!@#$&*.]/.test(value), 'String must contain a special character')
    ,
    confirmPassword: z
        .string().min(1, { message: "Confirm password field cannot be empty" })
}).refine((data) => {
    return data.password === data.confirmPassword
}, { message: "Passwords do not match", path: ["confirmPassword"] });


// Extract inferred type from schema
export type IssueFormType = z.infer<typeof IssueSchema>;
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type CreateIssue = z.infer<typeof IssueSchema>;
export type PatchIssue = z.infer<typeof patchIssueSchema>;