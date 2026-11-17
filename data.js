/* ===== Dados do Laboratório de Infoproduto ===== */
const TIPOS=[
 {id:'ebook',n:'E-book / guia',ic:'EB',esf:1,tk:'R$ 17–97',tempo:'1–3 semanas',d:'Guia, manual ou apostila em PDF, lido no celular ou computador.',
  ideal:'Primeiro produto, isca paga, temas práticos e objetivos.',pros:['Mais rápido de produzir','Custo quase zero','Ótimo produto de entrada'],contras:['Ticket baixo','Percepção de valor menor'],
  ferr:'Google Docs, Canva, Amazon KDP',entrega:'PDF + capa + mockup 3D',unid:'Capítulo'},
 {id:'curso',n:'Curso em vídeo',ic:'CV',esf:3,tk:'R$ 197–2.000',tempo:'1–3 meses',d:'Aulas gravadas e organizadas em módulos, em uma área de membros.',
  ideal:'Métodos completos do ponto A ao B; carro-chefe da esteira.',pros:['Ticket médio/alto','Escala sem limite de alunos','Alta percepção de valor'],contras:['Produção trabalhosa','Exige equipamento mínimo e edição'],
  ferr:'OBS Studio, Loom, área de membros',entrega:'Vídeos + materiais de apoio + certificado',unid:'Módulo'},
 {id:'mini',n:'Minicurso',ic:'MC',esf:2,tk:'R$ 37–197',tempo:'1–3 semanas',d:'De 1 a 3 horas de vídeo focadas em um único resultado.',
  ideal:'Validar um tema em vídeo antes do curso completo.',pros:['Rápido','Bom para tráfego pago','Porta de entrada para o curso'],contras:['Ticket limitado'],
  ferr:'Loom, OBS Studio, Canva',entrega:'3 a 7 aulas curtas + checklist',unid:'Aula'},
 {id:'screencast',n:'Screencast',ic:'SC',esf:2,tk:'R$ 47–497',tempo:'2–4 semanas',d:'Gravação da tela com narração, ideal para ensinar ferramentas e softwares.',
  ideal:'Excel, Canva, programação, design, sistemas.',pros:['Não precisa aparecer','Fácil de atualizar por aula'],contras:['Desatualiza com novas versões da ferramenta'],
  ferr:'Loom, OBS Studio',entrega:'Vídeos de tela + arquivos de exercício',unid:'Aula'},
 {id:'audio',n:'Podcast / audiobook',ic:'AU',esf:2,tk:'R$ 27–197',tempo:'2–6 semanas',d:'Conteúdo em áudio para ouvir em deslocamentos ou exercícios.',
  ideal:'Público com pouco tempo de tela; temas reflexivos e de desenvolvimento.',pros:['Consumo em qualquer lugar','Produção simples'],contras:['Difícil ensinar coisas visuais'],
  ferr:'Audacity, microfone USB, plataformas de áudio',entrega:'Episódios MP3 + resumo em PDF',unid:'Episódio'},
 {id:'mentoria',n:'Mentoria (1:1 ou grupo)',ic:'MT',esf:2,tk:'R$ 997–15.000',tempo:'Imediato',d:'Acompanhamento ao vivo, individual ou em grupo, por um período definido.',
  ideal:'Validar o método, ticket alto, resultados que exigem correção.',pros:['Maior ticket','Valida o método com casos reais','Gera depoimentos'],contras:['Não escala (vende seu tempo)'],
  ferr:'Zoom, Google Meet, WhatsApp',entrega:'Encontros + plano individual + suporte',unid:'Encontro'},
 {id:'assinatura',n:'Assinatura / clube',ic:'AS',esf:3,tk:'R$ 29–197/mês',tempo:'Contínuo',d:'Conteúdo novo todo mês com cobrança recorrente.',
  ideal:'Temas que se renovam: receitas, treinos, investimentos, tendências.',pros:['Receita previsível','Aumenta o LTV'],contras:['Exige constância','Combater cancelamento todo mês'],
  ferr:'Área de membros, pagamento recorrente',entrega:'Conteúdos mensais + encontros + comunidade',unid:'Mês'},
 {id:'webinar',n:'Webinar / workshop',ic:'WB',esf:1,tk:'Grátis–R$ 297',tempo:'1 semana',d:'Aula ao vivo ou gravada, pontual, sobre um tema específico.',
  ideal:'Gerar leads, vender o produto principal no final, testar temas.',pros:['Muito rápido','Converte bem ao vivo'],contras:['Depende de presença ao vivo'],
  ferr:'Zoom, YouTube Live, StreamYard',entrega:'Aula + replay + material de apoio',unid:'Bloco'},
 {id:'planilha',n:'Planilhas e modelos',ic:'PL',esf:1,tk:'R$ 19–147',tempo:'1–2 semanas',d:'Ferramentas prontas que o cliente preenche e usa no dia a dia.',
  ideal:'Finanças, gestão, planejamento, precificação.',pros:['Valor imediato','Vende bem como bônus ou order bump'],contras:['Fácil de copiar'],
  ferr:'Google Planilhas, Excel',entrega:'Planilha + vídeo tutorial curto',unid:'Aba'},
 {id:'template',n:'Templates digitais',ic:'TP',esf:1,tk:'R$ 27–197',tempo:'1–3 semanas',d:'Pacotes editáveis de Canva, Notion, apresentações, contratos, roteiros.',
  ideal:'Criadores, social media, prestadores de serviço.',pros:['Economiza tempo do cliente','Fácil de expandir em packs'],contras:['Mercado concorrido'],
  ferr:'Canva, Notion, Figma',entrega:'Links de templates + guia de uso',unid:'Pack'},
 {id:'comunidade',n:'Comunidade paga',ic:'CM',esf:2,tk:'R$ 29–297/mês',tempo:'2–4 semanas',d:'Grupo fechado com troca entre membros, encontros e desafios.',
  ideal:'Nichos de identidade forte e networking.',pros:['Retenção alta','Membros geram conteúdo'],contras:['Moderação constante'],
  ferr:'Discord, Circle, grupos fechados',entrega:'Acesso + rituais semanais + eventos',unid:'Ritual'},
 {id:'desafio',n:'Desafio (challenge)',ic:'DS',esf:1,tk:'Grátis–R$ 97',tempo:'1–2 semanas',d:'Programa curto (5 a 21 dias) com uma tarefa por dia.',
  ideal:'Gerar engajamento e aquecer para uma oferta maior.',pros:['Engajamento altíssimo','Gera resultados rápidos e depoimentos'],contras:['Exige presença diária'],
  ferr:'WhatsApp, Telegram, e-mail, lives',entrega:'Tarefas diárias + aulas curtas + grupo',unid:'Dia'},
 {id:'newsletter',n:'Newsletter paga',ic:'NL',esf:2,tk:'R$ 9–49/mês',tempo:'Contínuo',d:'Conteúdo exclusivo por e-mail, com curadoria ou análise.',
  ideal:'Análises de mercado, curadoria, tendências.',pros:['Produção enxuta','Relacionamento direto'],contras:['Ticket baixo, depende de volume'],
  ferr:'Plataformas de newsletter',entrega:'Edições semanais + arquivo',unid:'Edição'},
 {id:'kit',n:'Kit / bundle',ic:'KT',esf:2,tk:'R$ 47–497',tempo:'Depende',d:'Pacote que combina formatos: e-book + planilha + aulas + templates.',
  ideal:'Aumentar ticket e percepção de valor juntando o que você já tem.',pros:['Reaproveita materiais','Alta percepção de valor'],contras:['Pode confundir se mal organizado'],
  ferr:'Os mesmos dos itens do kit',entrega:'Página com todos os itens organizados',unid:'Item'}
];

const ESTRUTURAS={
 ebook:[['Introdução — por que isso importa',['A promessa do livro','Como usar este guia']],['Capítulo 1 — Diagnóstico',['Onde você está hoje','Os 3 erros mais comuns']],['Capítulo 2 — O método',['Princípio central','Passo a passo']],['Capítulo 3 — Aplicação',['Exemplo real','Exercício prático']],['Capítulo 4 — Obstáculos',['Quando der errado','Perguntas frequentes']],['Conclusão e próximos passos',['Checklist final','Convite para o próximo nível']]],
 curso:[['Módulo 0 — Boas-vindas',['Como aproveitar o curso','Acesso à comunidade']],['Módulo 1 — Fundamentos',['Conceito-chave','Mitos que travam você']],['Módulo 2 — Método, parte 1',['Etapa 1','Etapa 2']],['Módulo 3 — Método, parte 2',['Etapa 3','Etapa 4']],['Módulo 4 — Aplicação guiada',['Estudo de caso','Mão na massa']],['Módulo 5 — Erros e ajustes',['Erros comuns','Como corrigir a rota']],['Módulo 6 — Próximos passos',['Plano de 30 dias','Encerramento e certificado']]],
 mini:[['Aula 1 — O problema real',['Por que não funciona hoje']],['Aula 2 — A virada',['O princípio que muda tudo']],['Aula 3 — Passo a passo',['Aplicação prática']],['Aula 4 — Plano de ação',['Checklist e próximos passos']]],
 screencast:[['Aula 1 — Configuração inicial',['Instalação','Interface']],['Aula 2 — Funções essenciais',['As 5 funções mais usadas']],['Aula 3 — Projeto prático',['Do zero ao pronto']],['Aula 4 — Atalhos e produtividade',['Atalhos','Automação']],['Aula 5 — Projeto final',['Desafio guiado']]],
 audio:[['Episódio 1 — Ponto de partida',['História e contexto']],['Episódio 2 — O primeiro princípio',['Conceito + exemplo']],['Episódio 3 — O segundo princípio',['Conceito + exemplo']],['Episódio 4 — Na prática',['Rotina sugerida']],['Episódio 5 — Fechamento',['Resumo e desafio']]],
 mentoria:[['Encontro 1 — Diagnóstico',['Mapeamento da situação','Meta dos próximos 90 dias']],['Encontro 2 — Plano de ação',['Prioridades','Tarefas da semana']],['Encontro 3 — Execução',['Revisão das tarefas','Destravando bloqueios']],['Encontro 4 — Ajuste de rota',['O que está funcionando']],['Encontro 5 — Escala',['Próximo nível']],['Encontro 6 — Encerramento',['Resultados e plano contínuo']]],
 assinatura:[['Mês 1 — Fundamentos',['Aula do mês','Encontro ao vivo','Material bônus']],['Mês 2 — Tema avançado',['Aula do mês','Encontro ao vivo']],['Mês 3 — Estudo de caso',['Análise real','Q&A']],['Mês 4 — Desafio do mês',['Tarefas semanais']]],
 webinar:[['Abertura (5 min)',['Promessa da aula','Quem sou eu']],['História (10 min)',['Minha virada']],['Conteúdo (30 min)',['Segredo 1','Segredo 2','Segredo 3']],['Transição (5 min)',['Onde você pode chegar']],['Oferta (15 min)',['Apresentação do produto','Bônus e garantia']],['Perguntas (15 min)',['Q&A e quebra de objeções']]],
 planilha:[['Aba Instruções',['Como usar em 3 passos']],['Aba Entrada de dados',['Campos editáveis']],['Aba Cálculos',['Fórmulas protegidas']],['Aba Painel',['Gráficos e indicadores']],['Aba Exemplo preenchido',['Caso de referência']]],
 template:[['Pack 1 — Essenciais',['10 modelos básicos']],['Pack 2 — Avançados',['10 modelos para conversão']],['Guia de uso',['Como editar','Boas práticas']],['Bônus',['Paleta e fontes sugeridas']]],
 comunidade:[['Ritual semanal 1 — Live temática',['Aula curta + debate']],['Ritual semanal 2 — Desafio',['Tarefa e prestação de contas']],['Ritual mensal — Convidado',['Entrevista']],['Onboarding de novos membros',['Boas-vindas','Regras']]],
 desafio:[['Dia 1 — Diagnóstico',['Tarefa do dia']],['Dia 2 — Primeiro passo',['Tarefa do dia']],['Dia 3 — Aceleração',['Tarefa do dia']],['Dia 4 — Superando o bloqueio',['Tarefa do dia']],['Dia 5 — Resultado e próximo passo',['Live final + oferta']]],
 newsletter:[['Edição tipo 1 — Análise',['Contexto','O que fazer']],['Edição tipo 2 — Curadoria',['5 links comentados']],['Edição tipo 3 — Caso prático',['Passo a passo']],['Edição especial mensal',['Resumo e tendências']]],
 kit:[['Item 1 — E-book guia',['Leitura base']],['Item 2 — Planilha',['Ferramenta de aplicação']],['Item 3 — Aulas curtas',['Demonstração']],['Item 4 — Templates',['Modelos prontos']],['Item 5 — Checklist',['Plano de ação']]]
};

const CRITS=[
 ['dorUrg','A dor é urgente','As pessoas querem resolver isso agora, não "um dia"'],
 ['pagam','Já pagam por soluções','Existem cursos, livros ou serviços vendendo para esse público'],
 ['acesso','Você alcança esse público','Tem audiência, rede ou orçamento para chegar até eles'],
 ['autor','Você tem autoridade','Resultados próprios ou de clientes que comprovam o método'],
 ['diferen','Há um diferencial claro','Seu ângulo é diferente do que já existe'],
 ['poder','Público com poder de compra','Conseguem pagar o preço que você precisa cobrar'],
 ['ensin','O resultado é ensinável','Dá para transformar em passos que outra pessoa replica'],
 ['demanda','Sinais de demanda','Perguntas frequentes, buscas, comentários pedindo isso'],
 ['lacuna','Existe uma lacuna','Reclamações e perguntas sem resposta nos conteúdos atuais'],
 ['paixao','Você aguenta falar disso por 2 anos','Energia de longo prazo para o tema']];
const VALCHK=['Pesquisar o tema no Google Trends e no AnswerThePublic','Ler reclamações nos comentários e avaliações de 5 concorrentes','Conversar com 10 pessoas do avatar (entrevista de 20 min)','Publicar 3 conteúdos sobre a dor e medir o engajamento','Criar lista de espera e captar 100 interessados','Fazer pré-venda da versão beta com desconto','Fechar pelo menos 5 vendas antes de produzir tudo'];

/* Arquétipos de marca */
const ARQ=[
 {id:'inocente',n:'Inocente',des:'Felicidade, simplicidade, otimismo',medo:'Fazer algo errado',voz:'Leve, positiva, honesta',cor:'#7cc4e8',nichos:'Bem-estar, maternidade, alimentação natural',ex:'Dove, Natura'},
 {id:'explorador',n:'Explorador',des:'Liberdade, descoberta, autenticidade',medo:'Ficar preso ou entediado',voz:'Aventureira, inspiradora, direta',cor:'#5a7d3a',nichos:'Viagem, nômade digital, esportes outdoor',ex:'The North Face, Jeep'},
 {id:'sabio',n:'Sábio',des:'Conhecimento, verdade, clareza',medo:'Ser enganado, ignorância',voz:'Analítica, fundamentada, didática',cor:'#1e3a8a',nichos:'Educação, investimentos, ciência, concursos',ex:'Google, TED'},
 {id:'heroi',n:'Herói',des:'Superação, coragem, conquista',medo:'Fraqueza, desistir',voz:'Motivadora, intensa, desafiadora',cor:'#c81e1e',nichos:'Fitness, alta performance, vendas',ex:'Nike, Gatorade'},
 {id:'foradalei',n:'Fora-da-lei',des:'Ruptura, revolução, liberdade das regras',medo:'Ser irrelevante, conformismo',voz:'Provocadora, ousada, sem filtro',cor:'#111111',nichos:'Empreendedorismo disruptivo, finanças alternativas',ex:'Harley-Davidson, Diesel'},
 {id:'mago',n:'Mago',des:'Transformação, fazer o impossível acontecer',medo:'Consequências negativas não previstas',voz:'Visionária, encantadora, misteriosa',cor:'#6d28d9',nichos:'Desenvolvimento pessoal, espiritualidade, tecnologia',ex:'Disney, Apple'},
 {id:'comum',n:'Pessoa comum',des:'Pertencimento, conexão, ser gente como a gente',medo:'Ser excluído',voz:'Próxima, simples, sem pose',cor:'#2563eb',nichos:'Finanças pessoais, organização da casa, culinária',ex:'IKEA, Havaianas'},
 {id:'amante',n:'Amante',des:'Intimidade, prazer, beleza',medo:'Não ser desejado',voz:'Sensorial, calorosa, elegante',cor:'#be185d',nichos:'Beleza, moda, relacionamentos, gastronomia',ex:'Chanel, Victoria\'s Secret'},
 {id:'bobo',n:'Bobo da corte',des:'Diversão, leveza, viver o momento',medo:'Tédio',voz:'Bem-humorada, irreverente, criativa',cor:'#f59e0b',nichos:'Entretenimento, idiomas, criatividade',ex:'Skol, M&M\'s'},
 {id:'cuidador',n:'Cuidador',des:'Proteger e cuidar dos outros',medo:'Egoísmo, ingratidão',voz:'Acolhedora, empática, paciente',cor:'#0d9488',nichos:'Saúde, maternidade, terapia, educação infantil',ex:'Johnson\'s, Unicef'},
 {id:'criador',n:'Criador',des:'Criar algo de valor duradouro, expressão',medo:'Mediocridade',voz:'Inventiva, inspiradora, estética',cor:'#ea580c',nichos:'Design, artesanato, fotografia, escrita',ex:'Lego, Adobe'},
 {id:'governante',n:'Governante',des:'Controle, estabilidade, liderança',medo:'Caos, ser derrubado',voz:'Autoritativa, refinada, segura',cor:'#854d0e',nichos:'Gestão, liderança, mercado de luxo, advocacia',ex:'Rolex, Mercedes-Benz'}];
const ARQQUIZ=[
 {q:'O que seu aluno mais quer sentir?',o:[['Segurança e acolhimento',['cuidador','inocente','comum']],['Poder e conquista',['heroi','governante','foradalei']],['Clareza e entendimento',['sabio','mago','criador']],['Liberdade e prazer',['explorador','amante','bobo']]]},
 {q:'Como você fala com o público?',o:[['Como amigo(a) próximo(a)',['comum','cuidador','bobo']],['Como professor(a) ou especialista',['sabio','governante','criador']],['Como treinador(a) que cobra',['heroi','foradalei','explorador']],['Como guia que inspira',['mago','amante','inocente']]]},
 {q:'Qual frase combina mais com sua marca?',o:[['"Você é capaz de muito mais"',['heroi','mago','explorador']],['"Vamos fazer juntos, sem complicação"',['comum','cuidador','inocente']],['"Esqueça tudo que te ensinaram"',['foradalei','bobo','mago']],['"Excelência nos detalhes"',['governante','amante','criador','sabio']]]},
 {q:'Que tipo de transformação você entrega?',o:[['Conhecimento profundo',['sabio','criador']],['Mudança de vida radical',['mago','foradalei','heroi']],['Bem-estar e paz',['cuidador','inocente','amante']],['Status e resultado visível',['governante','heroi','explorador']]]}];

const TOM=[['formal','Formal','Casual'],['serio','Sério','Divertido'],['tecnico','Técnico','Simples'],['reservado','Reservado','Entusiasmado'],['respeitoso','Respeitoso','Provocador']];

/* Psicologia das cores */
const PSICO=[
 ['#dc2626','Vermelho','Urgência, paixão, energia, ação','Botões de compra, ofertas, fitness, alimentação','Em excesso transmite agressividade e alerta'],
 ['#ea580c','Laranja','Entusiasmo, criatividade, acessibilidade','CTAs, produtos para iniciantes, criatividade','Pode parecer barato se mal combinado'],
 ['#eab308','Amarelo','Otimismo, alegria, atenção','Destaques, selos, público jovem, infantil','Pouco contraste com fundo branco: cuidado com texto'],
 ['#16a34a','Verde','Crescimento, saúde, dinheiro, equilíbrio','Finanças, saúde, sustentabilidade, agro','Verde-limão saturado cansa a vista'],
 ['#0d9488','Turquesa','Clareza, frescor, calma comunicativa','Bem-estar, terapia, tecnologia amigável','Pode parecer frio em nichos emocionais'],
 ['#2563eb','Azul','Confiança, segurança, profissionalismo','Educação, finanças, tecnologia, corporativo','Muito usado: diferencie com tom ou combinação'],
 ['#7c3aed','Roxo','Sabedoria, luxo, espiritualidade, imaginação','Desenvolvimento pessoal, espiritualidade, premium','Tons muito escuros podem pesar'],
 ['#db2777','Rosa','Afeto, cuidado, feminilidade, diversão','Beleza, maternidade, relacionamentos','Evite estereótipos: nem todo público feminino quer rosa'],
 ['#92400e','Marrom','Estabilidade, natureza, artesanal, conforto','Gastronomia, artesanato, café, rural','Pode parecer datado sem contraste'],
 ['#111827','Preto','Sofisticação, poder, exclusividade','Premium, moda, mentorias high ticket','Pesado em textos longos; equilibre com respiro'],
 ['#9ca3af','Cinza / branco','Neutralidade, equilíbrio, limpeza','Fundos, minimalismo, tecnologia','Sozinho fica sem personalidade']];

const HARMONIAS=[
 ['mono','Monocromática','Variações de luz e saturação de uma só cor. Elegante e coesa.'],
 ['analoga','Análoga','Cores vizinhas no círculo (±30°). Harmônica e natural.'],
 ['comp','Complementar','Cores opostas (180°). Máximo contraste: ótima para CTAs.'],
 ['split','Complementar dividida','A cor base + as duas vizinhas da complementar. Contraste com menos tensão.'],
 ['triade','Triádica','Três cores equidistantes (120°). Vibrante e equilibrada.'],
 ['tetra','Tetrádica (quadrado)','Quatro cores a 90°. Rica, exige uma cor dominante.']];

/* Tipografia */
const FONTES=[
 {id:'p1',t:'Playfair Display',b:'Source Sans 3',tag:'Elegante · editorial',arq:['amante','governante','sabio']},
 {id:'p2',t:'Montserrat',b:'Merriweather',tag:'Moderno · confiável',arq:['comum','sabio','governante']},
 {id:'p3',t:'Poppins',b:'Lora',tag:'Amigável · acolhedor',arq:['cuidador','inocente','comum']},
 {id:'p4',t:'Bebas Neue',b:'Open Sans',tag:'Impacto · energia',arq:['heroi','foradalei','explorador']},
 {id:'p5',t:'DM Serif Display',b:'DM Sans',tag:'Sofisticado · contemporâneo',arq:['amante','criador','mago']},
 {id:'p6',t:'Space Grotesk',b:'Inter',tag:'Tecnológico · direto',arq:['sabio','foradalei','criador']},
 {id:'p7',t:'Fraunces',b:'Work Sans',tag:'Autoral · caloroso',arq:['criador','cuidador','mago']},
 {id:'p8',t:'Archivo Black',b:'Roboto',tag:'Forte · prático',arq:['heroi','comum','governante']},
 {id:'p9',t:'Cormorant Garamond',b:'Raleway',tag:'Luxo · delicado',arq:['amante','governante','inocente']},
 {id:'p10',t:'Oswald',b:'Lato',tag:'Esportivo · objetivo',arq:['heroi','explorador','comum']},
 {id:'p11',t:'Abril Fatface',b:'Nunito',tag:'Expressivo · divertido',arq:['bobo','criador','amante']},
 {id:'p12',t:'Quicksand',b:'Nunito',tag:'Leve · gentil',arq:['inocente','cuidador','bobo']}];

/* Imagens */
const ESTILOS=[
 ['foto','Fotografia real','Pessoas reais, luz natural, cenas do dia a dia do avatar','authentic lifestyle photography, natural light, candid moment'],
 ['flat','Ilustração flat','Formas simples, cores chapadas, amigável e didático','flat vector illustration, simple shapes, solid colors, clean'],
 ['3d','3D suave','Objetos 3D arredondados, aspecto moderno e tecnológico','soft 3D render, rounded objects, clay style, studio lighting'],
 ['mini','Minimalista','Muito espaço em branco, poucos elementos, tipografia forte','minimalist composition, lots of negative space, clean background'],
 ['editorial','Editorial / revista','Fotografia dramática, composição sofisticada','editorial magazine photography, dramatic lighting, high-end'],
 ['colagem','Colagem / recorte','Recortes, texturas de papel, autoral e criativo','paper collage, cut-out textures, mixed media, handmade feel'],
 ['neon','Neon / futurista','Luzes vibrantes, fundo escuro, tecnologia','neon glow, dark background, futuristic, vibrant lights'],
 ['aquarela','Aquarela / orgânico','Texturas suaves, delicado, natural','watercolor illustration, soft textures, organic shapes']];
const PECAS=[
 ['capa','Capa de e-book','book cover design for a digital guide'],
 ['anuncio','Criativo de anúncio','social media ad creative'],
 ['thumb','Thumbnail de aula / YouTube','YouTube thumbnail, expressive, high contrast'],
 ['mockup','Mockup do produto','product mockup of a digital course on laptop, tablet and phone screens'],
 ['retrato','Retrato do(a) autor(a)','professional portrait of an expert, confident, approachable'],
 ['fundo','Fundo / textura de marca','abstract background texture for brand materials'],
 ['avatar','Cena do avatar','scene showing the target customer in their daily life']];
const TAMANHOS=[
 ['Instagram feed (retrato)','1080 × 1350','4:5','Posts e carrosséis'],
 ['Instagram / TikTok stories e reels','1080 × 1920','9:16','Stories, reels, vídeos verticais'],
 ['Feed quadrado / anúncio','1080 × 1080','1:1','Anúncios e posts quadrados'],
 ['Thumbnail YouTube','1280 × 720','16:9','Miniatura de vídeo e capa de aula'],
 ['Capa de curso (área de membros)','1920 × 1080','16:9','Banner do curso e módulos'],
 ['Capa de e-book','1600 × 2560','1:1,6','Capa do PDF e loja'],
 ['LinkedIn post / anúncio','1200 × 627','1,91:1','Posts com link e anúncios'],
 ['Pinterest','1000 × 1500','2:3','Pins verticais'],
 ['Capa de e-mail / header','600 × 200','3:1','Cabeçalho de newsletter'],
 ['Favicon / ícone','512 × 512','1:1','Ícone de site e perfil']];
const MOCKFMT=[['post','Post 4:5','4/5'],['story','Story 9:16','9/16'],['thumb','Thumbnail 16:9','16/9'],['ebook','Capa de e-book','10/16'],['ad','Anúncio 1:1','1/1']];
const CHECKCRIA=['Uma ideia por peça: um título, um benefício, um CTA','Título legível em 1 segundo no celular','Contraste do texto aprovado (mínimo 4,5:1)','No máximo 2 famílias de fonte','Cores dentro da paleta da marca (regra 60-30-10)','Rosto humano olhando para o texto ou para a câmera','Pouco texto sobre a imagem (anúncios)','Imagens, músicas e fontes próprias ou com licença de uso','Promessa da peça compatível com o que o produto entrega','Versões nos tamanhos de cada canal'];

/* Copywriting */
const GATILHOS=[
 ['Escassez','Quantidade limitada de vagas ou bônus.','Só use se for real. Vagas falsas destroem a confiança.'],
 ['Urgência','Prazo para decidir: carrinho fecha, bônus expira.','Cumpra o prazo anunciado.'],
 ['Prova social','Depoimentos, números de alunos, prints de resultados.','Peça autorização e mostre resultados típicos, não só os extremos.'],
 ['Autoridade','Formação, experiência, resultados, mídia.','Seja específico: números e fatos convencem mais que adjetivos.'],
 ['Reciprocidade','Entregar valor gratuito antes de vender.','Conteúdo gratuito precisa ser útil por si só.'],
 ['Compromisso e coerência','Pequenos "sins" antes do grande sim (quiz, inscrição, desafio).','Não force a decisão.'],
 ['Especificidade','Números exatos geram credibilidade: "37 alunos" e não "vários".','Números precisam ser verdadeiros.'],
 ['Antecipação','Criar expectativa antes da abertura: contagem regressiva, bastidores.','Entregue o que foi prometido no aquecimento.'],
 ['Novidade','Mecanismo novo, método próprio, abordagem diferente.','Novo de verdade, não só nome novo.'],
 ['Afinidade / inimigo comum','"Nós contra o problema", identificação com o avatar.','Ataque o problema, não pessoas.'],
 ['Garantia / reversão de risco','Garantia tira o risco das costas do cliente.','Obrigatório honrar; arrependimento de 7 dias é lei (CDC, art. 49).'],
 ['História (storytelling)','Jornada de antes e depois, sua ou de um aluno.','Histórias reais, sem exagero.']];
const CTAS=['Quero começar agora','Garantir minha vaga','Sim, quero {res}','Quero o método completo','Entrar para a lista de espera','Baixar o guia gratuito','Quero acessar com desconto','Começar meu teste de 7 dias','Quero parar de {dorCurta}','Liberar meu acesso imediato'];
const COMPLIANCE=['A promessa da copy é exatamente o que o produto entrega','Sem garantia de ganhos financeiros ou resultados de saúde','Depoimentos reais e autorizados','Textos, imagens e músicas próprios ou licenciados','Consentimento claro na captação de e-mails (LGPD)','Direito de arrependimento de 7 dias informado','Regras de cobrança e cancelamento claras (assinaturas e parcelamentos)','Política de privacidade e termos de uso publicados'];

/* Marketing */
const FUNIL=[
 ['Topo · atrair','Atrair desconhecidos que têm a dor','Reels, TikTok, carrosséis educativos, SEO, podcast de convidado','Alcance, seguidores, visualizações'],
 ['Meio · nutrir','Gerar confiança e capturar o contato','Isca digital, lives, e-mails, estudos de caso, desafio','Leads, abertura de e-mail, presença em live'],
 ['Fundo · converter','Transformar leads em clientes','Página de vendas, webinar de oferta, depoimentos, quebra de objeções','Conversão, CPA, faturamento'],
 ['Pós · reter','Gerar resultado, recompra e indicação','Onboarding, comunidade, upsell, programa de indicação','Conclusão, reembolso, LTV, NPS']];
const FORMATOS={'Instagram':['Reels','Carrossel','Stories','Live'],'TikTok':['Vídeo curto','Live'],'YouTube':['Vídeo longo','Shorts','Live'],'LinkedIn':['Post de texto','Carrossel PDF','Artigo'],'Lista de e-mail':['E-mail'],'WhatsApp / Telegram':['Mensagem de grupo','Áudio'],'Podcast':['Episódio'],'Blog / SEO':['Artigo'],'Pinterest':['Pin'],'Tráfego pago Meta':['Anúncio'],'Tráfego pago Google':['Anúncio de busca'],'Parcerias / afiliados':['Collab']};
const IDEIAS={
 'Educação':['Os 3 erros que fazem {avatar} {dorCurta}','Passo a passo: como {res}','Mito x verdade sobre {tema}','Checklist rápido de {tema}','O que eu faria se começasse do zero em {tema}'],
 'Autoridade':['Bastidores de como eu aplico {mec}','Meu resultado com {tema} em números','Análise de um caso real','Respondendo uma dúvida técnica sobre {tema}','O que aprendi em anos de {tema}'],
 'Prova social':['Depoimento: antes e depois de um aluno','Print de mensagem de um aluno (com autorização)','Estudo de caso: como fulano conseguiu {res}','Perguntas de alunos respondidas'],
 'Conexão':['Minha história com {tema}','Um dia na minha rotina','A vez que eu também {dorCurta}','Opinião polêmica sobre {tema}','Enquete: qual sua maior dificuldade com {tema}?'],
 'Venda':['Por que criei o {nome}','O que tem dentro do {nome}','Para quem é (e para quem não é) o {nome}','Últimas horas: bônus expirando','Resposta à objeção: "{obj}"']};
const CANAIS=Object.keys(FORMATOS);

const PHASES={
 semente:[['Pré-lançamento',-21,['Definir promessa e oferta beta','Criar página de lista de espera','Produzir 6–9 conteúdos sobre a dor','Convidar para aula ou evento ao vivo']],
          ['Lançamento',0,['Aula ao vivo com oferta no final','Abrir carrinho com bônus de fundador','Sequência de 5 e-mails / mensagens','Responder objeções em lives e stories']],
          ['Entrega e pós',7,['Gravar aulas conforme a turma avança','Coletar depoimentos e resultados','Ajustar o método com o feedback']]],
 interno:[['Aquecimento',-28,['Conteúdo diário sobre o tema','Captação de leads com isca digital','Grupo VIP de espera']],
          ['Conteúdos de pré-lançamento (CPLs)',-7,['CPL 1: oportunidade','CPL 2: transformação / método','CPL 3: experiência de posse','Página de vendas e checkout testados']],
          ['Carrinho aberto',0,['Abertura ao vivo','Bônus de ação rápida','E-mails diários com prova social','Último dia: contagem regressiva']],
          ['Pós-lançamento',7,['Onboarding dos alunos','Pesquisa com não compradores','Relatório de métricas do lançamento']]],
 perpetuo:[['Estrutura',-21,['Página de vendas com vídeo ou carta','Checkout com order bump e upsell','Área de membros pronta']],
          ['Aquisição',-7,['Isca digital + página de captura','Campanha de tráfego de captação','Remarketing para a página de vendas']],
          ['Nutrição e conversão',0,['Sequência de e-mails de 7 dias','Webinar automático (opcional)','Recuperação de carrinho abandonado']],
          ['Otimização semanal',7,['Acompanhar CPL, conversão e ROAS','Testar 3 criativos novos por semana','Ajustar a oferta com dados']]],
 aplicacao:[['Conteúdo de autoridade',-30,['Publicar estudos de caso','Mostrar bastidores do método','Convidar para aplicação nos stories e no LinkedIn']],
          ['Aplicações',-7,['Formulário de aplicação no ar','Triagem das aplicações','Agendamento das chamadas de diagnóstico']],
          ['Chamadas de diagnóstico',0,['Roteiro de diagnóstico','Apresentação da proposta','Follow-up em até 48 horas']],
          ['Onboarding',7,['Contrato e pagamento','Encontro de boas-vindas','Plano individual de cada cliente']]]};
const ESTR_TIPS={semente:'Ideal para o primeiro produto: vende para poucas pessoas, entrega ao vivo e só grava depois de validar. Risco baixo.',
 interno:'Funciona quando já existe audiência. Os conteúdos de pré-lançamento aquecem e o carrinho abre por poucos dias.',
 perpetuo:'Venda todo dia com funil automático. Exige oferta validada e controle de métricas de tráfego.',
 aplicacao:'Para ofertas de alto valor: o conteúdo gera aplicações, a chamada de diagnóstico qualifica e a proposta é feita individualmente.'};

const METRICAS=[
 ['ctr','CTR do anúncio','%',v=>v>=1?'g':v>=0.5?'y':'r','Bom ≥ 1% · atenção 0,5–1%','Troque o gancho e a imagem do criativo; teste 3 variações.'],
 ['cpl','Custo por lead','R$',null,'Compare com o CPL máximo da calculadora de oferta','Melhore a página de captura e a isca; segmente melhor o público.'],
 ['capt','Conversão da página de captura','%',v=>v>=30?'g':v>=20?'y':'r','Bom ≥ 30% · atenção 20–30%','Título mais específico, menos campos no formulário, isca mais desejável.'],
 ['vend','Conversão da página de vendas','%',v=>v>=1.5?'g':v>=0.7?'y':'r','Tráfego frio: bom ≥ 1,5% · atenção 0,7–1,5%','Reforce prova social, quebra de objeções e clareza da oferta.'],
 ['abert','Abertura de e-mail','%',v=>v>=30?'g':v>=20?'y':'r','Bom ≥ 30% · atenção 20–30%','Assuntos mais curiosos, limpe a lista, envie em outro horário.'],
 ['reemb','Taxa de reembolso','%',v=>v<=5?'g':v<=10?'y':'r','Bom ≤ 5% · atenção 5–10%','Alinhe promessa e entrega; melhore o onboarding da primeira semana.'],
 ['concl','Conclusão do produto','%',v=>v>=30?'g':v>=15?'y':'r','Bom ≥ 30% · atenção 15–30%','Aulas mais curtas, vitórias rápidas no início, lembretes e comunidade.'],
 ['ltvcac','LTV ÷ CAC','x',v=>v>=3?'g':v>=1.5?'y':'r','Bom ≥ 3 · atenção 1,5–3','Crie esteira de produtos (upsell, recorrência) ou reduza o custo de aquisição.'],
 ['churn','Cancelamento mensal','%',v=>v<=5?'g':v<=8?'y':'r','Bom ≤ 5% · atenção 5–8%','Reforce o onboarding, crie rituais fixos e ofereça plano anual.',['recorrente']],
 ['ativos','Membros ativos por semana','%',v=>v>=40?'g':v>=20?'y':'r','Bom ≥ 40% · atenção 20–40%','Crie motivos semanais para voltar: live, desafio, conteúdo novo.',['recorrente']],
 ['aplic','Leads que aplicam','%',v=>v>=5?'g':v>=2?'y':'r','Bom ≥ 5% · atenção 2–5%','Publique mais estudos de caso e deixe o convite para aplicar explícito.',['highticket']],
 ['compar','Comparecimento às chamadas','%',v=>v>=70?'g':v>=50?'y':'r','Bom ≥ 70% · atenção 50–70%','Confirme por mensagem no dia e envie material prévio para a chamada.',['highticket']],
 ['fech','Fechamento nas chamadas','%',v=>v>=20?'g':v>=10?'y':'r','Bom ≥ 20% · atenção 10–20%','Qualifique melhor no formulário e treine o roteiro de diagnóstico.',['highticket']],
 ['presenca','Comparecimento ao vivo','%',v=>v>=25?'g':v>=15?'y':'r','Bom ≥ 25% · atenção 15–25%','Mais lembretes (e-mail, WhatsApp) e um bônus para quem assistir ao vivo.',['webinar','desafio']]];
