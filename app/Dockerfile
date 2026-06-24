# Imagem base Node.js Alpine (leve)
FROM node:18-alpine

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências primeiro (aproveita cache do Docker)
COPY package.json ./

# Instalar dependências
RUN npm install --production

# Copiar código da aplicação
COPY server.js ./

# Criar usuário não-root para segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Alterar proprietário dos arquivos para o usuário não-root
RUN chown -R appuser:appgroup /app

# Executar como usuário não-root
USER appuser

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
