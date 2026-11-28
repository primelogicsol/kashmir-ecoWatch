import crypto from 'crypto';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const googleId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET;

function resolveNextAuthSecret(): string | undefined {
  const configured = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (configured && configured.trim().length >= 16) {
    return configured.trim();
  }
  if (process.env.NODE_ENV === 'production') {
    return undefined;
  }
  if (!globalThis.__kewRuntimeEphemeralSecret) {
    globalThis.__kewRuntimeEphemeralSecret = crypto.randomBytes(32);
  }
  return crypto
    .createHmac('sha256', globalThis.__kewRuntimeEphemeralSecret)
    .update('kew-hmac-domain:nextauth:v2', 'utf8')
    .digest('hex');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    ...(googleId && googleSecret ? [
      Google({
        clientId: googleId,
        clientSecret: googleSecret,
      })
    ] : []),
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: resolveNextAuthSecret(),
});
