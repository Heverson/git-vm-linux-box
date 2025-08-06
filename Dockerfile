# Use uma imagem base Linux para garantir compatibilidade AMD64
FROM ubuntu:22.04

# Evita prompts interativos durante a instalação
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza o sistema e instala dependências básicas
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto (se houver)
COPY . .

# Comando padrão
CMD ["bash"] 