FROM node:latest as server

CMD ["npm", "i", "-g", "robocopy"]
# Copia todos os arquivos da aplicação para o diretório  'server'
COPY  ari-fitness-api server

# Muda o diretório de trabalho para dentro do container
WORKDIR server


# Instala as dependências do projeto
RUN npm install --legacy-peer-deps --silent

# Constrói a aplicação para produção
RUN npm run start:dev



FROM node:latest as client-app

# Copia todos os arquivos da aplicação para o diretório 'client'
COPY  ari-fitness-app client

# Muda o diretório de trabalho para dentro do container
WORKDIR client

# Instala as dependências do projeto
RUN npm install --legacy-peer-deps --silent

# Constrói a aplicação para produção
RUN npx run build --prod


# Final image
FROM node 
WORKDIR /ari-fitness-app/
COPY --from=server /usr/src /usr/src
COPY --from=client-app /usr/src/app/dist ./
EXPOSE 3000
# CMD ["node", "server.js"]
CMD ["npm", "run", "start:dev"]
