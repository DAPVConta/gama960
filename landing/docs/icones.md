# Ícones: Gama 960+

Pesquisa feita em 24/10/2026 na API pública do Iconify (`api.iconify.design`), categoria **UI 24px**. Os números de ícones vêm do endpoint `/collections`. A cobertura foi conferida ícone a ícone contra os 36 conceitos da landing page.

## 1. Comparação das candidatas

Todas as coleções abaixo pertencem de fato à categoria "UI 24px" (confirmado pela API). A Phosphor, usada só como reserva para o Pix, está em outra categoria ("UI Other / Mixed Grid").

| Coleção | Prefixo | Nº de ícones | Estilo do traço | Espessura padrão (viewBox 24) | Licença / atribuição | Cobertura (36 conceitos) |
|---|---|---|---|---|---|---|
| **Tabler Icons** (v3.49.0) | `tabler` | 6.238 | Só linha, geometria precisa, pontas e cantos arredondados, desenho sóbrio | 2, **ajustável** (o valor recomendado de 1,5 já vem aplicado nos arquivos) | MIT, **sem atribuição** | **35/36**: tem WhatsApp no mesmo traço. Faltam Pix e Google Meet |
| Lucide | `lucide` | 1.903 | Só linha, herdeira do Feather, muito limpa | 2, ajustável | ISC, sem atribuição | 34/36: sem ícones de marca (não tem WhatsApp nem Pix) |
| Iconoir (v7.12.1) | `iconoir` | 1.671 | Linha fina e delicada | 1,5 | MIT, sem atribuição | 34/36: tem WhatsApp. Não tem alvo (`meta`) nem Pix, e não tem ingresso (`vagas` só com cadeado) |
| Huge Icons | `hugeicons` | 6.065 | Linha arredondada, setas com ponta curva característica, ar mais descontraído | 1,5 | MIT, sem atribuição | 35/36: tem WhatsApp, falta Pix. O desenho é menos sóbrio que o do Tabler |
| Solar (estilo Linear) | `solar` | 8.706 no total, cerca de 1.450 no Linear | Linha suave e arredondada | 1,5 | CC BY 4.0, **exige atribuição** | 34/36: sem WhatsApp e sem Pix. Alguns ícones vêm dentro de moldura (por ex. `graph-up`), o que quebra a uniformidade |
| Myna UI | `mynaui` | 2.620 (Regular + Solid) | Linha simples | 1,5 | MIT, sem atribuição | 33/36, sendo 2 aproximados (`autonomia` = sparkles, `examinador` = badge). Sem WhatsApp, sem Pix e sem aspas |

Nenhuma coleção da categoria tem Pix nem Google Meet.

## 2. Coleção escolhida: Tabler Icons

- **Estética:** o ícone é só traço, com geometria precisa e pontas arredondadas. Com `stroke-width` 1,5 o desenho fica fino e elegante, sem ar de cartoon. Na comparação visual, em azul-escuro sobre branco e em dourado sobre azul-escuro, foi a candidata mais consistente.
- **Cobertura:** 35 dos 36 conceitos no mesmo estilo, incluindo o **WhatsApp com traço idêntico** aos demais. Só o Pix precisou de reserva.
- **Licença:** MIT, permite uso comercial e não exige crédito na página.
- **Manutenção:** é a maior coleção de traço puro da categoria, com lançamentos frequentes. Se a página crescer, há ícones extras no mesmo estilo.

**Reserva para o Pix:** `ph:pix-logo` (Phosphor Regular, MIT). Ele é desenhado em contorno com espessura equivalente a cerca de 1,5 numa grade de 24, por isso combina com o Tabler a 1,5.

## 3. Licença

| Coleção | Licença | Uso comercial | Atribuição |
|---|---|---|---|
| Tabler Icons | MIT | Sim | Não exige crédito visível |
| Phosphor (só o `pix`) | MIT | Sim | Não exige crédito visível |

**Texto de atribuição exato:** nenhum é exigido. A licença MIT pede apenas que o aviso de copyright acompanhe as cópias do código. Basta manter estas linhas no repositório (este arquivo já cumpre isso):

```
Tabler Icons: MIT License. Copyright (c) 2020-2026 Paweł Kuna. https://github.com/tabler/tabler-icons
Phosphor Icons: MIT License. Copyright (c) 2023 Phosphor Icons. https://github.com/phosphor-icons/core
```

**Atenção, marcas:** WhatsApp (Meta) e Pix (Banco Central do Brasil) são marcas registradas. Usá-las para indicar o canal de contato ou a forma de pagamento é o uso comum. Se o Pix aparecer como selo de destaque ("Pague com Pix"), confira antes o manual de uso da marca Pix do Banco Central, porque o ícone salvo é uma releitura em contorno do símbolo, não o logotipo oficial.

## 4. Mapeamento: nome semântico → id Iconify

Arquivos em `landing/assets/icons/<nome>.svg`.

| Nome semântico | Id Iconify | Observação |
|---|---|---|
| `whatsapp` | `tabler:brand-whatsapp` | Marca, no mesmo traço da coleção |
| `arrow-right` | `tabler:arrow-right` | CTA principal |
| `arrow-up-right` | `tabler:arrow-up-right` | Links externos e "saiba mais" |
| `chevron-down` | `tabler:chevron-down` | Acordeão do FAQ (girar 180° quando aberto) |
| `plus` | `tabler:plus` | Alternativa para o acordeão (fechado) |
| `minus` | `tabler:minus` | Alternativa para o acordeão (aberto) |
| `check` | `tabler:check` | Itens incluídos e listas positivas |
| `x` | `tabler:x` | Itens do bloco "talvez não seja para você" |
| `menu` | `tabler:menu-2` | Três linhas iguais (o `tabler:menu` tem só duas) |
| `close` | `tabler:x` | Mesmo desenho de `x`. Arquivo separado por semântica |
| `diagnostico` | `tabler:zoom-scan` | Lupa analítica. Alternativas: `tabler:report-search`, `tabler:stethoscope` |
| `aula-ao-vivo` | `tabler:video` | Câmera de videochamada. Alternativa: `tabler:device-laptop` |
| `redacao` | `tabler:file-pencil` | Documento com lápis, forma par com `correcao`. Alternativa: `tabler:ballpen` |
| `correcao` | `tabler:file-check` | Documento com check. Alternativa: `tabler:clipboard-check` |
| `audio` | `tabler:microphone` | Áudio de análise. Alternativa: `tabler:microphone-2` |
| `revisao-professor` | `tabler:shield-check` | Escudo com check. Alternativa (selo): `tabler:rosette-discount-check` |
| `mentoria` | `tabler:users` | Duas pessoas, ou seja, encontro individual. Alternativas: `tabler:user-star`, `tabler:messages` |
| `prazo` | `tabler:clock` | 7 dias / 48 h. Alternativa: `tabler:hourglass` |
| `calendario` | `tabler:calendar-event` | Período do plano e aula semanal |
| `repertorio` | `tabler:book` | Livro aberto. Alternativa (biblioteca): `tabler:books` |
| `autonomia` | `tabler:bulb` | Lâmpada. Alternativa: `tabler:brain` |
| `meta` | `tabler:target-arrow` | Alvo com flecha. Alternativa: `tabler:target` |
| `evolucao` | `tabler:trending-up` | Gráfico subindo |
| `universidade` | `tabler:school` | No Tabler, `school` é o capelo |
| `examinador` | `tabler:award` | Medalha com fitas. Alternativas: `tabler:certificate`, `tabler:medal-2` |
| `experiencia` | `tabler:chalkboard-teacher` | Professor diante do quadro. Alternativa: `tabler:chalkboard` |
| `individual` | `tabler:user` | Um único estudante |
| `vagas` | `tabler:ticket` | Ingresso, para sugerir lugar limitado. Alternativas: `tabler:lock`, `tabler:armchair` |
| `online-brasil` | `tabler:world` | Globo. Alternativa: `tabler:map-pin` |
| `mensagem` | `tabler:message-circle` | Suporte por mensagem |
| `depoimento` | `tabler:quote` | Aspas |
| `estrela` | `tabler:star` | Destaque / recomendado |
| `cartao` | `tabler:credit-card` | Pagamento com cartão |
| `pix` | `ph:pix-logo` | **Reserva (Phosphor Regular, MIT)**, porque o Tabler não tem Pix. É preenchido (`fill`), então não aceita ajuste de `stroke-width`. Usa viewBox 0 0 256 256 e fica um pouco maior que os outros (veja a seção 6) |
| `aviso` | `tabler:info-circle` | Aviso de transparência |
| `competencias` | `tabler:list-check` | Lista com checks. Alternativa (camadas): `tabler:stack-2` |

**Google Meet (opcional, sem arquivo):** a categoria não tem esse ícone. A recomendação é escrever "Google Meet" no texto ao lado de `aula-ao-vivo`. Se o logotipo for indispensável, há duas opções: `streamline-logos:google-meet-logo`, em linha mas com traço 1 e licença CC BY 4.0, que exige atribuição; ou `simple-icons:googlemeet`, preenchido e CC0.

## 5. Tratamento aplicado aos arquivos

- Baixados de `https://api.iconify.design/<prefixo>/<nome>.svg` em 24/10/2026. São 36 arquivos.
- Mantêm `viewBox` (0 0 24 24, ou 0 0 256 256 no Pix) e `width="1em" height="1em"`, sem outras dimensões fixas.
- Cores apenas `currentColor` / `none`, então o ícone herda a cor do texto.
- **Tabler:** o `stroke-width="2"` original foi retirado dos elementos internos, e `stroke-width="1.5"` foi definido no `<svg>` raiz. Assim o traço fino já aparece mesmo via `<img>` ou máscara CSS, e continua ajustável por CSS quando o SVG está inline.
- Antes de salvar, cada arquivo foi conferido: sem `<script>`, sem atributos `on*=`, sem `href`, `url()`, `data:` ou qualquer referência externa. Só aparecem os elementos de desenho `svg`, `g` e `path`.

## 6. Recomendação de uso

### Tamanho e traço por contexto

| Contexto | Ícones | Tamanho | `stroke-width` |
|---|---|---|---|
| Listas dos planos e "não é para você" | `check`, `x` | 20 px | 1,5 |
| Botões e links de CTA | `arrow-right`, `arrow-up-right`, `whatsapp` | 20 px (botão normal), 24 px (botão grande), com espaço de 8 px até o texto | 1,5 |
| FAQ | `chevron-down` (ou `plus`/`minus`) | 20 a 24 px | 1,5 |
| Menu mobile | `menu`, `close` | 24 px, com área de toque de pelo menos 44×44 px | 1,5 |
| Cards de benefícios, "como funciona", credenciais | `diagnostico`, `aula-ao-vivo`, `redacao`, `correcao`, `audio`, `examinador`, `experiencia`... | 28 a 32 px, se quiser dentro de um círculo de 48 a 56 px | **1,25** |
| Botão flutuante do WhatsApp | `whatsapp` | 28 px | 1,5 |
| Pagamento | `cartao`, `pix` | 24 px. Desenhe o `pix` em 22 px para igualar o peso visual, porque ele ocupa mais da grade | Pix fixo, cerca de 1,5 |

**Por que 1,5 e 1,25:** o traço escala com o ícone. Com 1,5 numa grade de 24, a linha fica com 1,25 px a 20 px e 2 px a 32 px. Nos tamanhos grandes, 1,25 mantém a linha entre 1,5 e 1,7 px, o que dá o aspecto refinado. Não use valores abaixo de 1,25 em 20 px, porque o dourado sobre azul perde nitidez.

### Cor e contraste

- **Azul-escuro #003366 sobre branco:** contraste de cerca de 12,6:1. Excelente.
- **Dourado #D4AF37 sobre azul-escuro #003366:** cerca de 6:1. Passa nos 3:1 que a WCAG exige para elementos gráficos.
- **Dourado sobre branco:** cerca de 2,1:1. **Não passa.** Use dourado sobre branco apenas em ícones decorativos e nunca como único portador de significado (por exemplo, o `check` dos planos deve ficar em azul-escuro sobre fundo branco).

### Como inserir

SVG inline (recomendado, herda `color` e permite ajustar o traço):

```html
<span class="icon" aria-hidden="true"><!-- conteúdo de assets/icons/check.svg --></span>
```

```css
.icon { display: inline-flex; font-size: 20px; color: #003366; }   /* 1em = font-size */
.icon--lg { font-size: 32px; }
.icon--lg svg { stroke-width: 1.25; }                              /* traço mais fino nos grandes */
.on-navy .icon { color: #D4AF37; }
```

Arquivo externo com cor controlável (máscara CSS; `<img>` sozinho não herda `currentColor` e fica preto):

```css
.i-check {
  display: inline-block; width: 20px; height: 20px;
  background-color: currentColor;
  -webkit-mask: url("../assets/icons/check.svg") center / contain no-repeat;
          mask: url("../assets/icons/check.svg") center / contain no-repeat;
}
```

### Acessibilidade

- Use `aria-hidden="true"` nos ícones decorativos, aqueles que acompanham texto.
- Botões só com ícone (`menu`, `close`, WhatsApp flutuante) precisam de `aria-label`, por exemplo `aria-label="Falar com o professor André Gama no WhatsApp"`.
- No acordeão, faça a rotação do `chevron-down` com `transform: rotate(180deg)` e `transition: transform .2s ease`, respeitando `prefers-reduced-motion`.
