import { login } from "@/services/auth.service.mjs";
import dayjs from "dayjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);


export const authOptions = {
    secret:process.env.NEXTAUTH_SECRET,


    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {
                    label: "email",
                    type: "email",
                    placeholder: "email@domain.com",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const res = await login(credentials);
              return res;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // token = updatedToken ? updatedToken : token;
            // console.log(account, "......next auth account");
            if(account){
                token.user= user
            }

            return token;
        },
        async session({ session, token, user }) {
            session.user = token.user
            return session;
        },
      
    },
   
};

export default NextAuth(authOptions);
