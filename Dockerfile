# Use a imagem oficial do Node.js como imagem base
FROM node:22-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia package.json e yarn.lock para o diretório de trabalho
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação
COPY . .

# Generate Build
RUN npm run build

# Copia o restante do código da aplicação
COPY . .

# Exponha a porta na qual a aplicação irá rodar
EXPOSE 9070

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npm start"]