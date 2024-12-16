import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
const denySupport = ["/servers", "/server-news", "/accounts", "/companies", "/payments", "/dashboard-sales", "/dashboard-servers"];
const denySales = ["/servers", "/server-news", "/accounts",  "/dashboard-servers"];
const denyServer = ["/accounts", "/companies", "/payments", "/contacts", "/messages", "/dashboard-sales", "/dashboard-customers"];
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
     
    },
    {
        callbacks: {
            authorized: ({ token }) => (token ? true : false),
        },

    }
);

export const config = {
    matcher: [
        "/",
        // "/dashboard-sales:path*",
        // "/dashboard-requests:path*",
        // "/dashboard-customers:path*",
        // "/dashboard-servers:path*",
        // "/account:path*",
        // "/access-logs:path*",
        // "/companies:path*",
        // "/payments:path*",
        // "/server:path*",
        // "/requests:path*",
        // "/messages:path*",
        // "/matching/:path*",
        // "/api/proxy/:path*",
    ],
};
