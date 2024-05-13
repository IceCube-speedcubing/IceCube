import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('your-database-name')
        const usersCollection = db.collection('users')

        // Find the user in the database
        const user = await usersCollection.findOne({ username })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        // Return the user object
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          isAdmin: user.isAdmin || false,
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token }) {
      session.user = token.user
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}
