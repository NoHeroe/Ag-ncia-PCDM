/* ═══════════════════════════════════════════════════════════════════════
   CANTOS DA MATA — content data (file://-safe, no fetch).
   Real business data sourced from the pousada's own documents/flyers.
   Edit here to update copy across the whole site.
   ═══════════════════════════════════════════════════════════════════════ */

window.CDM_SITE = {
  name: 'Cantos da Mata',
  tagline: 'Um santuário na Chapada dos Guimarães',
  whatsapp: '5565998019517',
  whatsappMsg: 'Olá! Vim pelo site e gostaria de verificar disponibilidade e fazer uma reserva na Cantos da Mata.',
  email: 'info@cantosdamata.com',
  phoneLabel: '+55 65 99801 9517',
  address: 'Vale do Jamacá — 78195-000, Chapada dos Guimarães, MT',
  region: 'Chapada dos Guimarães · Mato Grosso',
  // TODO: trocar pelos links reais quando você enviar (vazio = ícone escondido)
  instagram: '',
  airbnb: '',
  booking: '',
  mapEmbed: 'https://www.google.com/maps?q=Chapada+dos+Guimar%C3%A3es+MT+Brasil&z=11&output=embed',
};

/* ─── CHALÉS (4 reais com fotos + Esconderijo com placeholder) ──────── */
window.CDM_LODGES = [
  {
    slug: 'caracol', gallery: 'caracol', name: 'Caracol', num: '01',
    tagline: 'Uma espiral de conforto aberta para a mata',
    paragraphs: [
      'Inspirada no movimento orgânico do caracol, esta acomodação envolve o hóspede em curvas suaves que conduzem o olhar — e o corpo — para um descanso profundo. O desenho privilegia a privacidade e a contemplação da vegetação ao redor.',
      'Luz natural, ventilação cruzada e materiais que conversam com o cerrado tornam o Caracol um refúgio para quem quer desacelerar sem abrir mão do conforto.',
    ],
    amenities: ['Café da manhã incluso', 'Wi-Fi gratuito', 'Banheiro privativo', 'Roupa de cama e toalhas', 'Varanda com vista', 'Estacionamento gratuito'],
  },
  {
    slug: 'casinha', gallery: 'casinha', name: 'Casinha na Mata', num: '02',
    tagline: 'Imersa na floresta, a um passo das trilhas',
    paragraphs: [
      'A Casinha na Mata é para quem quer viver a natureza de dentro para fora. Cercada pela vegetação nativa e com acesso fácil às trilhas, oferece um conforto rústico e sofisticado.',
      'Ao amanhecer, o canto dos pássaros é o despertador; ao entardecer, o sussurro das folhas embala o descanso. Simplicidade elevada ao seu melhor.',
    ],
    amenities: ['Café da manhã incluso', 'Wi-Fi gratuito', 'Banheiro privativo', 'Acesso às trilhas', 'Varanda', 'Estacionamento gratuito'],
  },
  {
    slug: 'casa-de-pedra', gallery: 'casa-de-pedra', name: 'Casa de Pedra', num: '03',
    tagline: 'Construída em diálogo com a rocha da Chapada',
    paragraphs: [
      'A Casa de Pedra celebra a geologia milenar do cerrado. Erguida em harmonia com a rocha viva, suas texturas brutas e o frescor natural das paredes criam uma atmosfera única e atemporal.',
      'É a escolha de quem busca o encontro entre o bruto e o elegante — um abrigo que parece ter nascido da própria paisagem.',
    ],
    amenities: ['Café da manhã incluso', 'Wi-Fi gratuito', 'Banheiro privativo', 'Frescor natural', 'Roupa de cama e toalhas', 'Estacionamento gratuito'],
  },
  {
    slug: 'abrigo', gallery: 'abrigo', name: 'Abrigo na Mata', num: '04',
    tagline: 'Uma cabana integrada à vegetação nativa',
    paragraphs: [
      'O Abrigo na Mata é o convite mais íntimo ao cerrado. Integrado à vegetação nativa, propõe uma estadia de silêncio e presença, onde os sons da floresta são a trilha sonora.',
      'Conforto essencial, vista para o verde e a sensação de estar verdadeiramente abrigado pela natureza.',
    ],
    amenities: ['Café da manhã incluso', 'Wi-Fi gratuito', 'Banheiro privativo', 'Vista para a mata', 'Roupa de cama e toalhas', 'Estacionamento gratuito'],
  },
  {
    slug: 'esconderijo', gallery: null, name: 'Esconderijo', num: '05',
    tagline: 'Seu refúgio privado para a introspecção',
    paragraphs: [
      'O Esconderijo é reservado a quem procura solitude e contemplação profunda. Posicionado estrategicamente, oferece um horizonte aberto da Chapada e o sossego absoluto.',
      'Em breve, novas fotos deste refúgio. Fale conosco para conhecer a disponibilidade.',
    ],
    amenities: ['Café da manhã incluso', 'Wi-Fi gratuito', 'Banheiro privativo', 'Privacidade total', 'Vista da Chapada', 'Estacionamento gratuito'],
    photosComing: true,
  },
];

/* ─── PASSEIOS (conteúdo real extraído dos flyers da pousada) ───────── */
window.CDM_TOURS = [
  {
    slug: 'aroe-jari', badge: 'Caverna · Lagoa Azul', ph: 'ph--rock',
    title: 'Aroe Jari, Kiogo Brado & Lagoa Azul',
    summary: 'A maior caverna de arenito do Brasil, uma lagoa de águas calmas e um circuito de beleza rara.',
    paragraphs: [
      'Após o café da manhã, viagem de cerca de 46 km até a Fazenda Água Fria, onde fica a Caverna Aroe Jari. O percurso atravessa floresta e cerrado até a entrada, com visita ao primeiro salão — onde uma cachoeira se forma caindo do teto.',
      'A caminhada segue por fora rumo à Boca do Buritizal, passando pela Pedra das Três Pontas até a Lagoa Azul, ponto perfeito para um piquenique e contemplação. Mais adiante, a impressionante caverna Kiogo Brado, com paredes enormes e teto a mais de 20 m. O retorno pode ser a pé ou de trator.',
    ],
    meta: [
      { k: 'Distância', v: '~46 km da pousada' },
      { k: 'Duração', v: 'Dia inteiro' },
      { k: 'Nível', v: 'Moderado' },
      { k: 'Destaque', v: 'Maior caverna de arenito do Brasil' },
    ],
  },
  {
    slug: 'parque-nacional', badge: 'Parque Nacional', ph: 'ph--water',
    title: 'Parque Nacional da Chapada dos Guimarães',
    summary: 'O cartão-postal da região: a cachoeira Véu de Noiva e o circuito de cachoeiras do Parque.',
    paragraphs: [
      'Visita ao mirante da Véu de Noiva, a maior cachoeira da região, com mais de 80 m de queda. De lá se avista o vale do rio Coxipozinho, com cerrado, paredões e floresta amazônica entremeados.',
      'A trilha percorre veredas e campos rupestres até o Circuito de Cachoeiras do Parque — Pulo, Degrau, Prainha e Andorinhas — com banhos nas águas mais puras do centro do Brasil. O passeio passa pela própria Casa de Pedra, uma caverna de arenito esculpida pelo córrego, e pela cachoeira 7 de Setembro.',
    ],
    meta: [
      { k: 'Destaque', v: 'Véu de Noiva (+80 m)' },
      { k: 'Duração', v: 'Dia inteiro' },
      { k: 'Nível', v: 'Moderado' },
      { k: 'Leve', v: 'Lanche reforçado para piquenique' },
    ],
  },
  {
    slug: 'cidade-de-pedra', badge: 'Mirantes & Rio', ph: 'ph--sunset',
    title: 'Cidade de Pedra, Rio Claro & Crista de Galo',
    summary: 'Formações rochosas fantásticas esculpidas por milênios de erosão e um banho gostoso no Rio Claro.',
    paragraphs: [
      'O cerrado cobre cerca de 2 milhões de km² do Brasil, boa parte no planalto do Mato Grosso. A longa erosão deixou aqui formações rochosas fantásticas e cavernas de arenito.',
      'A Cidade de Pedra revela esse espetáculo geológico de visual espetacular, com um cerrado baixo e um verdadeiro tesouro de plantas medicinais. No Rio Claro, a recompensa: um mergulho e um banho refrescante em meio à paisagem.',
    ],
    meta: [
      { k: 'Destaque', v: 'Formações rochosas + Rio Claro' },
      { k: 'Duração', v: 'Dia inteiro' },
      { k: 'Nível', v: 'Leve a moderado' },
      { k: 'Banho', v: 'Sim, no Rio Claro' },
    ],
  },
  {
    slug: 'aguas-do-cerrado', badge: 'Cachoeiras · Mirante', ph: 'ph--forest',
    title: 'Águas do Cerrado & Morro São Jerônimo',
    summary: 'Um circuito de 9 cachoeiras e o ponto mais alto do Parque, com vista panorâmica de 360º.',
    paragraphs: [
      'Localizado a cerca de 10 km depois da Fazenda Água Fria, a 56 km da cidade da Chapada, o circuito Águas do Cerrado reúne 9 cachoeiras maravilhosas e de fácil acesso, numa caminhada por um cerrado diversificado.',
      'O Morro São Jerônimo é um dos pontos mais altos do Parque Nacional, com 836 metros de altitude. Do alto, a visão panorâmica de 360º revela morros, paredões de arenito e a imensa planície cuiabana.',
    ],
    meta: [
      { k: 'Distância', v: '~56 km da cidade' },
      { k: 'Altitude', v: 'São Jerônimo · 836 m' },
      { k: 'Cachoeiras', v: 'Circuito de 9' },
      { k: 'Vista', v: 'Panorâmica 360º' },
    ],
  },
  {
    slug: 'aventura', badge: 'Aventura', ph: 'ph--water',
    title: 'Aventura: Canoagem, Rapel & Arvorismo',
    summary: 'Para quem quer adrenalina: descida de duck no rio, rapel, arvorismo e biking com parceiros locais.',
    paragraphs: [
      'A descida de duck (caiaque inflável) no Rio Coxipó do Ouro dura cerca de 2 a 3 horas, com paradas para descanso e banhos em águas transparentes. É um passeio agradável e tranquilo, ideal também para iniciantes.',
      'Rapel, arvorismo, biking e outros passeios são organizados com operadores parceiros da região. Pergunte na recepção que montamos o seu roteiro de aventura.',
    ],
    meta: [
      { k: 'Duck / Canoagem', v: 'Rio Coxipó do Ouro · 2–3h' },
      { k: 'Também', v: 'Rapel · Arvorismo · Biking' },
      { k: 'Nível', v: 'Para iniciantes' },
    ],
    partners: [
      'Canoagem: Tribo do Remo (Lino)',
      'Rapel & aventura: R8 Aventura',
      'Arvorismo: Chapada Aventura',
    ],
  },
];

/* ─── DEPOIMENTOS (ilustrativos) ────────────────────────────────────── */
window.CDM_TESTIMONIALS = [
  { stars: 5, text: 'Uma semana em Cantos da Mata transformou minha percepção de mundo. O contato com a natureza, os guias incríveis e o equilíbrio entre conforto e autenticidade criaram momentos que jamais vou esquecer.', name: 'Maria Santos', origin: 'São Paulo, Brasil' },
  { stars: 5, text: 'Procurava um lugar para desacelerar sem perder o conforto. Cantos da Mata entrega exatamente isso. As cachoeiras são espetaculares e a equipe é atenciosa.', name: 'Carlos Mendes', origin: 'Belo Horizonte, Brasil' },
  { stars: 5, text: 'Jamais imaginei que um lugar pudesse me fazer esquecer do tempo. A Casa de Pedra é simplesmente mágica — cada amanhecer ali é uma obra de arte.', name: 'Ana Luiza Rocha', origin: 'Cuiabá, Brasil' },
  { stars: 5, text: 'Ein wunderbarer Ort mitten in der Natur. Die Gastfreundschaft war herausragend und die Wasserfälle unvergesslich.', name: 'Klaus Bergmann', origin: 'München, Deutschland' },
];

/* ─── INFORMAÇÕES ÚTEIS (políticas reais da casa) ───────────────────── */
window.CDM_INFO = [
  { k: 'Check-in / Check-out', v: 'A partir das 13h · até as 11h. Recepção aberta 24h.' },
  { k: 'Café da manhã', v: 'Incluso na diária · servido das 7h às 9h.' },
  { k: 'Jantar', v: 'Sob encomenda (avisar 1 dia antes) · 19h · R$ 60 por pessoa. Noites de churrasco sob consulta.' },
  { k: 'Estacionamento', v: 'Gratuito para hóspedes.' },
  { k: 'Idiomas', v: 'Português · English · Deutsch.' },
  { k: 'Crianças', v: '1 criança até 6 anos não paga. Cama extra sob consulta.' },
  { k: 'Pagamento', v: 'Tarifas pagas na chegada à pousada.' },
  { k: 'Animais', v: 'Não é permitida a entrada de animais de estimação.' },
  { k: 'Wi-Fi', v: 'Disponível para hóspedes.' },
];
