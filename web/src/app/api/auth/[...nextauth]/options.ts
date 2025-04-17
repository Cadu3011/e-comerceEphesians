import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import  jwt, { JwtPayload }  from "jsonwebtoken";

interface MyPayload extends JwtPayload {
  email: string;
  name?: string;
}
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Email ou senha estão vazios!");
          return null;
        }
      
        try {
          const res = await fetch("http://localhost:4000/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
      
          if (!res.ok) {
            throw new Error("Falha na autenticação");
          }
          
          const user = await res.json();
          if (!user.access_token) {
            console.error("Token não fornecido");
            return null;
          }
          const decodeUser =  jwt.decode(user.access_token) as MyPayload
          
          if (!decodeUser) {
            console.error("Token inválido ou incompleto");
            return null;
          }
          
          
          return {
            id: String(decodeUser.sub),
            email: decodeUser.email,
            name: decodeUser.name ?? "",
            image: "/"
          };
        } catch (error) {
          console.error("Erro ao autorizar usuário:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(user.name)
      return true
    }
  }
};