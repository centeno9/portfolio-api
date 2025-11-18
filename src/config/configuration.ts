export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development,',
  },
  db: {
    url: process.env.DATABASE_URL!,
  },
  seed: {
    user: process.env.CONTENT_USER!,
    password: process.env.CONTENT_PASSWORD!,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  },
  web: {
    revalidateToken: process.env.REVALIDATE_TOKEN,
  },
});
