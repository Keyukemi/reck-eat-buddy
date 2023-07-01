import NextAuth,{ AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/app/libs/prismadb"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'}
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password){
                    throw new Error ('Invalid Credentials');
                }

                const user = await prismadb.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                if (!user){
                    throw new Error ('Invalid email')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword ?? ''
                );
                if (!isCorrectPassword){
                    throw new Error ("Invalid password")
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: "jwt"
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);