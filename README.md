# Git VM Linux Box

Este projeto inclui configuração automatizada para build e publicação de imagens Docker no Docker Hub usando GitHub Actions.

## Configuração do GitHub Actions

### 1. Configurar Secrets no GitHub

Para que o workflow funcione, você precisa configurar os seguintes secrets no seu repositório GitHub:

1. Vá para **Settings** > **Secrets and variables** > **Actions**
2. Adicione os seguintes secrets:

#### `DOCKERHUB_USERNAME`
- Seu nome de usuário do Docker Hub

#### `DOCKERHUB_TOKEN`
- Um token de acesso do Docker Hub (não use sua senha)
- Para criar um token:
  1. Acesse [Docker Hub](https://hub.docker.com)
  2. Vá para **Account Settings** > **Security**
  3. Clique em **New Access Token**
  4. Dê um nome ao token (ex: "GitHub Actions")
  5. Copie o token gerado

### 2. Como funciona o workflow

O workflow será executado automaticamente quando:
- Fizer push para as branches `main` ou `master`
- Criar uma tag com padrão `v*` (ex: `v1.0.0`)
- Abrir um Pull Request para `main` ou `master`

### 3. Build Multi-Architecture

O workflow está configurado para:
- Build apenas para arquitetura **AMD64** (`linux/amd64`)
- Resolve o problema de compatibilidade com Mac M1
- Garante que a imagem rode em servidores Linux tradicionais

### 4. Tags automáticas

O workflow gera automaticamente tags baseadas em:
- Nome da branch (ex: `main`, `develop`)
- Tags semânticas (ex: `v1.0.0`, `v1.0`)
- SHA do commit (ex: `sha-abc123`)

## Uso local

Para testar localmente:

```bash
# Build da imagem
docker build -t seu-usuario/git-vm-linux-box .

# Executar o container
docker run -it seu-usuario/git-vm-linux-box
```

## Estrutura do projeto

```
.
├── .github/
│   └── workflows/
│       └── docker-build.yml    # Workflow do GitHub Actions
├── Dockerfile                  # Configuração da imagem Docker
├── .dockerignore              # Arquivos ignorados no build
└── README.md                  # Este arquivo
```

## Personalização

### Modificar o Dockerfile

Edite o `Dockerfile` para incluir suas dependências específicas:

```dockerfile
# Exemplo: adicionar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Exemplo: adicionar Python
RUN apt-get install -y python3 python3-pip
```

### Modificar o nome da imagem

No arquivo `.github/workflows/docker-build.yml`, altere:

```yaml
env:
  IMAGE_NAME: seu-usuario/nome-da-imagem
```

## Troubleshooting

### Erro de autenticação
- Verifique se os secrets `DOCKERHUB_USERNAME` e `DOCKERHUB_TOKEN` estão configurados corretamente
- Certifique-se de que o token do Docker Hub não expirou

### Build falha
- Verifique se o Dockerfile está correto
- Teste o build localmente primeiro: `docker build .`

### Push não funciona
- Verifique se você tem permissão para fazer push no repositório do Docker Hub
- Certifique-se de que o repositório existe no Docker Hub 