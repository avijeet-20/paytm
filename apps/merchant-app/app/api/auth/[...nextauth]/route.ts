import NextAuth from "next-auth";
import { authOptions } from "../../../../../merchant-app/lib/auth";
console.log('control reached')
const handler = NextAuth(authOptions);

export {handler as GET ,handler as POST}