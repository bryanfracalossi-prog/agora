# Ágora — histórias para viver melhor

Um app (PWA) em português para quem anda cansado de trabalhar demais, de correr atrás de dinheiro e de sentir que nunca é suficiente. Cada filósofo vira uma **tirinha**, cada tirinha vira uma **lição**, e cada lição termina em uma pergunta que cabe no seu dia.

Funciona no celular e no computador, instala na tela inicial e **funciona offline**. Sem framework, sem build, sem dependência: HTML, CSS e JavaScript puros.

> O app é um convite à reflexão — **não é terapia** e não substitui acompanhamento profissional.

## Rodar no seu computador

```powershell
# na pasta do projeto
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

- No PC: `http://localhost:8090`
- No celular, na mesma Wi-Fi: o endereço de rede que o servidor mostra (ex.: `http://192.168.x.x:8090`)
- No Chrome do celular: menu → **Adicionar à tela inicial**

O `serve.ps1` serve os arquivos estáticos **e** a API do Círculo. Ele precisa ficar aberto enquanto o app estiver em uso na rede.

## O que tem dentro

**Hoje** — uma tirinha, uma lição e uma pausa por dia, mais um cartão de apoio com o CVV (188).

**Tirinhas** — 13 histórias em quadrinhos com arte vetorial original (SVG, sem imagem externa): Sísifo, o pescador e o executivo, Diógenes e Alexandre, a espada de Dâmocles, o anel de Giges, a caverna, o velho e o cavalo, o vaso rachado, o barco vazio, o rei e a camisa, as três metamorfoses, Antígona e Zhuangzi com a borboleta.

**Lições** — 13 leituras curtas sobre trabalho, dinheiro, presença, descanso, comparação, identidade, pertencimento, medo do futuro e pedir ajuda. Cada uma traz **três atos para fazer hoje**.

**Círculo** — o espaço de apoio: dá para escrever o que está sentindo **anônimo** ou com o seu nome, ler o que outras pessoas escreveram, responder, marcar **coração** e **"eu também"**. Tem filtro por assunto (ansiedade, trabalho, dinheiro, futuro, luto, identidade…), aviso de "você não está sozinho" e atalhos para ajuda gratuita.

**Pausas** — 7 práticas guiadas de 1 a 3 minutos: respiração, notar cinco coisas, olhar longe, soltar os ombros, gratidão, caminhar sem destino e deixar o futuro esperar.

**Meu** — diário reflexivo com busca e humor, tirinhas salvas, sequência de dias, gráfico dos últimos 14 dias, backup em `.json` e importação.

## O Círculo: como funciona

Existem dois modos, e a interface sempre diz em qual você está:

| Modo | Quando acontece | O que muda |
|---|---|---|
| **Online** | O `serve.ps1` está rodando | Os posts ficam no `community-data.json` e todo mundo na mesma rede vê |
| **Local** | A API não responde (offline, GitHub Pages, arquivo aberto direto) | Os posts ficam só no `localStorage` daquele aparelho, com aviso na tela |

Cuidados já implementados:

- **Anônimo por padrão.** O nome só aparece se a pessoa escolher.
- **Token de exclusão** por post: só quem escreveu consegue apagar, e o token fica no aparelho.
- **Denúncia** de post ou resposta; ao chegar a 3 denúncias o conteúdo é ocultado automaticamente.
- **Limite de tamanho** e **rate limit por IP** no servidor.
- **Blocklist** básica de termos e links.
- **Detecção de sofrimento**: se o texto sugerir risco, o app mostra CVV 188, SAMU 192 e orientação sobre CAPS e clínicas-escola antes de publicar.
- **Nenhum usuário fictício.** Os posts iniciais são assinados pela própria Ágora.

### API

Base: `/api/community`

| Método | Rota | Para quê |
|---|---|---|
| `GET` | `/health` | Saber se o modo online está ativo |
| `GET` | `/posts?mood=&limit=&device=` | Listar posts e presença |
| `POST` | `/posts` | Publicar (`{ text, mood, name?, anonymous }`) |
| `POST` | `/posts/{id}/comments` | Responder |
| `POST` | `/posts/{id}/react` | Coração / "eu também" |
| `POST` | `/posts/{id}/report` | Denunciar |
| `DELETE` | `/posts/{id}` | Apagar (exige o token) |
| `POST` | `/presence` | Contar quantas pessoas estão por aqui |

O protótipo é **aberto e sem autenticação**, feito para rodar em rede local. Para uso público de verdade, precisa de hospedagem, banco, moderação humana e política de privacidade.

## Publicar no GitHub Pages

O app é estático, então o Pages serve tudo — **menos a API**. No Pages o Círculo entra automaticamente em **modo local** (posts só no aparelho). Para o Círculo online funcionar de verdade é preciso hospedar a API em algum lugar (ou manter o `serve.ps1` rodando na rede).

## Privacidade

- Diário, tirinhas salvas, ajustes e posts do modo local ficam no `localStorage` do navegador.
- No modo online, os posts vão para o `community-data.json` **na máquina que roda o servidor** — não para a nuvem.
- `community-data.json` está no `.gitignore`: desabafos reais nunca vão para o repositório.
- Limpar os dados do site apaga tudo — por isso existe **Ajustes → Exportar backup**.

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | Estrutura, telas, diálogos |
| `styles.css` | Tema claro/escuro, layout, tirinhas, Círculo |
| `content.js` | Citações, 13 lições, 7 pausas |
| `comics.js` | Roteiro das 13 tirinhas |
| `comicart.js` | Arte SVG das cenas |
| `app.js` | Rotas, leitor, diário, práticas, Círculo na interface |
| `circle.js` | Camada de dados do Círculo (online + local) |
| `serve.ps1` | Servidor local + API do Círculo (Windows PowerShell) |
| `sw.js` | Cache offline (`agora-v2`) |
| `manifest.webmanifest` | Instalação como app |
| `icons/` | Ícones |

## Ajuda

- **CVV — 188** (24h, gratuito, sigiloso) · [cvv.org.br](https://www.cvv.org.br)
- **SAMU — 192** em emergência
- **CAPS** (Centro de Atenção Psicossocial) pelo SUS, sem encaminhamento
- Clínicas-escola de psicologia costumam atender de graça ou com valor social

Os textos são adaptações livres das histórias, feitas para conversar — não para citação acadêmica.
