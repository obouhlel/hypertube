FROM node:22-alpine

#Crée un user ous
RUN addgroup ous && adduser -S -G ous ous

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

#Partie volume des fichiers upload sur le dossier public
RUN mkdir -p public/uploads && chown -R ous:ous public/uploads

#Droit owner
RUN chown -R ous:ous /app

#user non root
USER ous

EXPOSE 3000

CMD ["npm", "start"]
