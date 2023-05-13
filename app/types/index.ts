import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified" | "deletedAt"
> & {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    emailVerified: string | null ;

}