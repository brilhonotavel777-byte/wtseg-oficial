# Asset Optimization — WTSEG

## WebP Conversion — Client Logos

**Data:** 2026-07-04
**Commit:** `7d677eb` — Performance: convert client logos to optimized WebP
**Tag:** `v1.0-assets-webp`
**Responsável:** Rodrigo Souza

---

## Motivo da Otimização

As imagens `differential-05.png` (2.6 MB) e `differential-06.png` (2.1 MB) da seção
"Empresas que Confiam na WTSEG" apresentavam falha de carregamento em dispositivos
móveis com conexões limitadas (3G, sinal fraco, modo economia de dados).

Diagnóstico: arquivos PNG com conteúdo fotográfico/artwork são ineficientes no formato
lossless. Em mobile, os arquivos pesados competiam na fila de requisições simultâneas com
as demais imagens da página (~19 imagens no carregamento inicial), causando timeout ou
aborto de download pelo browser.

---

## Imagens Alteradas

| Arquivo | Dimensão | Peso PNG | Peso WebP | Redução |
|---|---|---|---|---|
| `differential-04.png` → `.webp` | 1774×887 px | 1132 KB | 65 KB | **−94%** |
| `differential-05.png` → `.webp` | 1774×887 px | 2600 KB | 211 KB | **−92%** |
| `differential-06.png` → `.webp` | 1774×887 px | 2142 KB | 120 KB | **−94%** |
| **Total** | | **5874 KB** | **396 KB** | **−93%** |

---

## Dimensões Preservadas

Todos os arquivos WebP gerados mantêm exatamente **1774×887 px** (proporção 2:1),
idêntico aos PNG originais. Nenhuma alteração visual, de enquadramento ou de proporção.

---

## Método de Conversão

- Ferramenta: `sharp` v0.33.x via execução temporária isolada (diretório `%TEMP%`)
- Qualidade WebP: **82** com `effort: 6`
- Nenhuma dependência nova adicionada ao `package.json` do projeto
- PNGs originais mantidos em `public/differentials/` (não removidos)

---

## Arquivos de Código Alterados

**`src/App.jsx`** — array `CLIENTS` (linhas 67–69):

```js
// Antes
{ name: "Prime Tennessee",   image: "/differentials/differential-04.png" },
{ name: "Nova Opção",        image: "/differentials/differential-05.png" },
{ name: "DreamPack Solution",image: "/differentials/differential-06.png" },

// Depois
{ name: "Prime Tennessee",   image: "/differentials/differential-04.webp" },
{ name: "Nova Opção",        image: "/differentials/differential-05.webp" },
{ name: "DreamPack Solution",image: "/differentials/differential-06.webp" },
```

Correções aplicadas no mesmo sprint:

- `loading="lazy"` e `decoding="async"` adicionados aos `<img>` dos client cards
- `height: 100%` corrigido para `height: auto` em `.client-card img` (risco CSS Safari iOS)

---

## Validação

- Build Vite: ✅ `0 erros — 70.14 kB gzip`
- Vercel deploy: ✅ produção validada
- `git status`: ✅ `working tree clean`
- `package.json`: ✅ inalterado
- `package-lock.json`: ✅ inalterado

---

## Recomendações Futuras

1. **Converter differential-01, 02, 03 para WebP** — os três PNGs restantes somam ~3.2 MB
   e se beneficiariam da mesma otimização.

2. **Converter imagens de serviços e locais** — `public/services/` e `public/locations/`
   contêm PNGs que também podem ser convertidos para WebP sem perda visual.

3. **Usar `<picture>` com fallback PNG** para garantir compatibilidade com browsers muito
   antigos que não suportam WebP (< 0.5% do tráfego atual):
   ```jsx
   <picture>
     <source srcSet={c.image} type="image/webp" />
     <img src={c.image.replace('.webp', '.png')} alt={c.name} loading="lazy" />
   </picture>
   ```

4. **Adicionar `vite-plugin-imagemin`** ao pipeline de build para automatizar compressão
   de novos assets no futuro.

5. **Monitorar Core Web Vitals** (LCP, CLS) no Google Search Console após o deploy para
   medir o impacto real da otimização no ranking mobile.
