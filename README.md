# Projeto Docker - Sistemas Operacionais

**Disciplina:** Sistemas Operacionais  
**Aluno:** Eduardo Felipe de Oliveira
**Data:** Junho de 2026

---

## Descrição

Infraestrutura Docker contendo uma aplicação Node.js com Express e um banco de dados MySQL, demonstrando conceitos fundamentais de Sistemas Operacionais como processos, virtualização, gerenciamento de recursos, sistemas de arquivos, redes e segurança.

---

## Estrutura do Projeto

```
projeto-docker/
├── docker-compose.yml
├── README.md
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── evidencias/
    ├── docker-ps.txt
    ├── docker-stats.txt
    ├── docker-inspect-app.txt
    ├── logs-app.txt
    └── print-navegador.png
```

---

## Como Executar

```bash
# Construir e iniciar os containers
docker-compose up -d --build

# Verificar os containers em execução
docker ps

# Acessar a aplicação
# http://localhost:3000      → Informações do sistema
# http://localhost:3000/info → Informações do processo

# Parar os containers
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

---

## Rotas da Aplicação

### `GET /`

Retorna informações gerais do sistema:

```json
{
  "disciplina": "Sistemas Operacionais",
  "aluno": "Eduardo Felipe de Oliveira",
  "hostname": "container-id",
  "plataforma": "linux",
  "arquitetura": "x64"
}
```

### `GET /info`

Retorna informações do processo Node.js:

```json
{
  "pid": 1,
  "uptime": 123,
  "cpus": 4
}
```

### `GET /health`

Verifica a conexão com o banco de dados MySQL.

---

## Comandos para Gerar Evidências

```bash
# docker-ps.txt
docker ps > evidencias/docker-ps.txt

# docker-stats.txt
docker stats --no-stream > evidencias/docker-stats.txt

# docker-inspect-app.txt
docker inspect app-nodejs > evidencias/docker-inspect-app.txt

# logs-app.txt
docker logs app-nodejs > evidencias/logs-app.txt

# print-navegador.png
# Capturar manualmente no navegador acessando http://localhost:3000
```

---

# Relatório - N3 Sistemas Operacionais

## 1. Qual a diferença entre imagem e container?

A imagem é um modelo pronto da aplicação. O container é a aplicação rodando a partir dessa imagem.

## 2. Qual processo está executando dentro do container?

O processo que está rodando é o Node.js executando o arquivo server.js.

## 3. O container possui kernel próprio? Justifique.

Não. O container usa o mesmo kernel do sistema operacional do computador onde ele está rodando.

## 4. Qual recurso foi limitado na sua infraestrutura?

Foi limitada a memória RAM em 128 MB.

## 5. Qual a finalidade do volume Docker utilizado?

Guardar os dados do banco MySQL, mesmo quando o container for reiniciado ou removido.

## 6. Qual a finalidade da rede Docker criada?

Permitir que os containers (app e banco) se comuniquem entre si.

## 7. Por que executar aplicações como usuário não-root?

Por segurança, para evitar que a aplicação tenha acesso total ao sistema dentro do container.

## 8. Por que Docker não é uma máquina virtual?

Porque o Docker não cria um sistema operacional completo, ele só usa o sistema do host.

## 9. O que representa o PID exibido na rota /info?

É o número do processo Node.js que está rodando dentro do container.

## 10. Cite três conceitos de Sistemas Operacionais presentes neste projeto.

- Processos
- Memória (limite de RAM)
- Sistema de arquivos (volume do MySQL)

---

## Conceitos de SO Aplicados no Projeto

| Conceito                        | Implementação no Projeto                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| SO como máquina estendida       | Docker abstrai o hardware, oferecendo uma interface simplificada para executar aplicações |
| SO como gerenciador de recursos | Limite de memória (128 MB) via cgroups                                                    |
| Processos                       | Processo Node.js (PID 1) e MySQL executando em containers isolados                        |
| Sistema de arquivos             | Volume `dados-mysql` para persistência, sistema de camadas do Docker                      |
| Redes                           | Rede bridge `rede-projeto` para comunicação entre containers                              |
| Virtualização                   | Containers Docker usando virtualização em nível de SO                                     |
| Segurança                       | Usuário não-root (`appuser`), isolamento via namespaces                                   |
