# Cantos da Mata — site institucional

Site da **Pousada Cantos da Mata** — Vale do Jamacá, Chapada dos Guimarães (MT).
Site estático (HTML/CSS/JS), **sem build**: abre direto no navegador e é fácil de hospedar.

> Projeto da **Agência PCDM**.

## ✨ O que tem
- **Single-page app** com rotas por hash (links compartilháveis): `#chales`, `#chale/caracol`, `#passeios`, etc.
- **Páginas individuais** para cada chalé (Caracol, Casinha na Mata, Casa de Pedra, Abrigo na Mata, Esconderijo).
- **Passeios** com conteúdo real (Aroe Jari, Parque Nacional / Véu de Noiva, Cidade de Pedra, Águas do Cerrado / São Jerônimo, aventura).
- **Galeria** com filtros + lightbox, **galerias por chalé**.
- **Animações**: scroll suave (Lenis), revelações no scroll, parallax, contadores, folhas caindo e o **macaco-prego** balançando — clima de floresta.
- **Reserva por WhatsApp** (botões e FAB) + formulário que abre o WhatsApp já preenchido.
- SEO básico (Open Graph, JSON-LD `LodgingBusiness`), responsivo e acessível (respeita `prefers-reduced-motion`).

## 📁 Estrutura
```
index.html                  → marcação + home + containers das rotas
assets/
  css/styles.css            → design system (tema floresta) + animações
  js/
    content.js              → DADOS editáveis (contato, chalés, passeios, infos)
    gallery-data.js         → manifesto de imagens (gerado pelo script)
    main.js                 → router, renderers, lightbox, WhatsApp
    animations.js           → Lenis + reveals + parallax + macaco/folhas
    vendor/                 → GSAP, ScrollTrigger, Lenis (locais, offline-ok)
  images/                   → fotos otimizadas (.webp 1600 e 800)
tools/optimize-images.js    → regenera as imagens otimizadas a partir de Pousada/FotosJu
backup/                     → cópia do index.html original (não versionado)
Pousada/                    → fotos originais e flyers (fonte; não versionado)
```

## ✏️ Como editar
- **Textos, contato, chalés, passeios, infos:** `assets/js/content.js`.
- **Links de Instagram / Airbnb / Booking:** `CDM_SITE` em `content.js`.
- **Estilo/cores:** variáveis no topo de `assets/css/styles.css` (`:root`).

## 🖼️ Atualizar as fotos
As fotos do site são versões otimizadas (`.webp`). Para regenerar a partir dos originais:
```bash
cd tools
npm install sharp
node optimize-images.js
```
O script lê `Pousada/FotosJu/CANTOS DA MATA/<CHALÉ>/` e gera `assets/images/<slug>/` + `assets/js/gallery-data.js`.

## ▶️ Rodar localmente
Qualquer servidor estático, por exemplo:
```bash
python -m http.server 4173
# abra http://localhost:4173
```

## 🗓️ Reservas — próximos passos
Hoje o botão **Reservar** abre o WhatsApp. Para reservas direto no site com **calendários do Airbnb + Booking unificados**, o caminho recomendado é um *channel manager* (Smoobu, Stays.net, Beds24) que sincroniza via iCal e oferece um widget embutível — sem backend próprio. O espaço para o widget e os links já estão previstos no código (`CDM_SITE.airbnb` / `CDM_SITE.booking`).
