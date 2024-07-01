FROM node:18-alpine

WORKDIR /app

COPY . .

RUN corepack enable pnpm
RUN pnpm i --frozen-lockfile

RUN pnpm run build

#COPY public ./public
RUN #mkdir .next

#COPY .next/standalone ./
#COPY /app/.next/static ./.next/static


EXPOSE 3000
ENV PORT 3000

#CMD HOSTNAME="0.0.0.0" node server.js
