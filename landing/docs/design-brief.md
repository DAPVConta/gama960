# Gama 960+ — Direção de arte da landing page

Pedido do cliente: **"suba o máximo que puder o design. Algo elegante, mas que impressione."**
A página precisa convencer dois públicos ao mesmo tempo: o **estudante** (17–18 anos, mira Medicina, Direito, Engenharia) e os **pais**, que pagam R$ 1.490–1.590/mês. Elegância transmite confiança aos pais; impacto visual prende o jovem.

## Conceito: "Editorial de alto desempenho"

O acabamento de uma revista editorial premium encontra a precisão de um placar de prova.

- **Tipografia é a protagonista.** Títulos grandes em *Instrument Serif* com a palavra-chave em itálico dourado; *Manrope* para corpo e interface. Nada de terceira fonte.
- **O dourado é luz, não tinta.** Fios finos, numerais, ícones, selos, o botão principal em seções escuras. Nunca grandes áreas chapadas de dourado; nunca texto pequeno dourado sobre branco (use `--gold-ink`).
- **Azul-marinho dá profundidade.** As seções `section--navy`/`section--deep` são os momentos dramáticos: granulado sutil, brilhos radiais dourados, numerais gigantes.
- **Branco e espaço respiram.** Espaço em branco generoso é o que separa "premium" de "lotado".
- **Motivo da marca:** a seta dupla ascendente do logo (azul + dourado), já desenhada em `.motif-arrow`. Ela se desenha sozinha ao entrar na tela.

## Momentos assinatura (os dois breakpoints entregam a sua versão)

1. **Hero** — título enorme; foto em moldura alta com um fio dourado deslocado (pseudo-elemento) criando profundidade; chips de vidro flutuando sobre a borda da foto; selo circular girando lentamente sobre um canto; seta-motivo se desenhando ao fundo; faixa de credenciais com numerais serifados.
2. **Cada ponto conta (navy)** — numerais dourados gigantes como protagonistas, grade editorial com fios divisórios.
3. **O platô** — tensão visual: feedback genérico riscado em serif itálico × perguntas nítidas em sans.
4. **Método** — linha do tempo de 5 etapas com a linha dourada se desenhando (`.steps__line`).
5. **Desempenho** — o cartão das 5 competências como um "placar" (barras douradas se enchendo).
6. **Estudante × família** — cartão branco ao lado de cartão navy: dois públicos, visualmente distintos e pareados.
7. **Prova social (deep)** — "700 → 980" enorme com a seta-motivo se desenhando entre os números; depoimento em serif grande.
8. **Planos** — plano Completo elevado em navy com contorno dourado; preços em serif grande.
9. **CTA final (deep)** — centralizado, serif grande, brilho dourado, seta-motivo.

## Regras de movimento (skill emil-design-eng)

- Revelação já pronta em `base.css`: 900ms, `--ease-out`, deslocamento de 18px, cascata de 80ms via `style="--i:N"`.
- **Elementos com `[data-reveal]` usam `transform` para a revelação.** Para posicionar ou girar esses elementos use as propriedades independentes `translate`, `rotate`, `scale`, ou `position`/margens. Nunca `transform`, ou a revelação quebra.
- Sem animação em interações frequentes. Hover só dentro de `@media (hover: hover) and (pointer: fine)`. Botões já têm `scale(.97)` no `:active`.
- Animar apenas `transform`, `opacity`, `clip-path`, `filter` leve. Nada de animar `width`, `height`, `top`, `margin`.
- Tudo respeita `prefers-reduced-motion` (a base já trata; se você criar animação nova, trate também).

## Restrições

- Paleta: só os tokens de `base.css` (`--navy*`, `--gold*`, `--gray*`, `--white`, textos). Nenhuma cor nova sem motivo forte.
- Contraste AA: texto de corpo ≥ 4,5:1. Dourado `#D4AF37` sobre branco = 2,1:1 (só decorativo). Dourado sobre navy ≈ 6:1 (ok).
- Corpo mínimo 16px no celular; áreas de toque ≥ 44px.
- **Desempenho:** só CSS. Nenhuma biblioteca, fonte ou imagem nova. `backdrop-filter` só em elementos pequenos.
- Não invente conteúdo: o texto aprovado está em `docs/conteudo-secoes.md` e já está no HTML.

## Arquivos e donos

| Arquivo | Dono | Regra |
| --- | --- | --- |
| `index.html` | orquestrador | **Não editar.** Peça mudanças no relatório final. |
| `css/base.css` | orquestrador | **Não editar.** Tokens, tipografia e aparência dos componentes. Pode sobrescrever no seu arquivo; se a mudança deveria valer para os dois breakpoints, peça no relatório. |
| `js/main.js` | orquestrador | **Não editar.** |
| `css/mobile.css` | agente mobile | Carregado só em `max-width: 959.98px`. |
| `css/desktop.css` | agente desktop | Carregado só em `min-width: 960px`. |

## Ganchos disponíveis

- Estados do JS: `html.js`, `.is-in` (elemento revelado), `html.nav-open` (menu mobile aberto), `html.fab-visible` (mostrar o botão flutuante), `.site-header.is-scrolled`.
- Âncoras: `#topo`, `#pontos`, `#plato`, `#metodo`, `#desempenho`, `#repertorio`, `#publicos`, `#estudante`, `#familia`, `#resultados`, `#professor`, `#comparativo`, `#planos`, `#entrevista`, `#duvidas`, `#transparencia`, `#contato`.
- Ícones: `<svg class="icon"><use href="#i-nome"/></svg>` (Tabler, traço 1,5; ver `docs/icones.md`).
- Para decorações extras sem tocar no HTML, use `::before`/`::after`.

## Como conferir o trabalho (sem usar o navegador do app)

```
node "C:/Users/IDA/AppData/Local/Temp/claude/C--Sistemas-Gama-960/74d78947-d72b-4182-813b-146c78a237de/scratchpad/shot/shot.mjs" --width 1440 --height 900 --selector ".hero" --out "<pasta de screenshots>/hero.png"
```

- `--selector` captura um elemento (use para revisar seção por seção); `--full` captura a página inteira; `--scroll N` rola antes.
- Por padrão todas as revelações aparecem prontas. `--animate` mantém os estados iniciais reais.
- O script avisa se houver **rolagem horizontal** e lista erros do console.
- Depois, abra o PNG com a ferramenta Read para ver.
