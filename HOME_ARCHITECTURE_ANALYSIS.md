# HOME ARCHITECTURE ANALYSIS — ELLEVA

Relatório técnico de auditoria arquitetural, análise de densidade de conteúdo, jornada de usuário institucional e recomendação de desacoplamento em rotas independentes.

---

# Recomendação

**Número recomendado de páginas: 5**

1. **Home** (`/`) — Síntese executiva e institucional de conversão
2. **Platform** (`/platform`) — Produto, ciclo operacional e terminal interativo
3. **Markets** (`/markets`) — Conectividade global, liquidez e oportunidade de mercado
4. **Technology** (`/technology`) — Arquitetura de sistemas, infraestrutura determinística e stack
5. **Company** (`/company`) — Modelo de negócio, tese operacional, governança e ecossistema

### Justificativa da Decisão
A Home atual da Elleva renderiza simultaneamente **21 seções verticais consecutivas**, totalizando mais de 4.500 linhas de JSX, 4 instâncias completas de diagramas interativos via React Flow, 1 mapa mundi geoespacial interativo D3/SVG com 7 hubs financeiros globais, 1 simulador completo de terminal operacional com 10 visões analíticas profundas e 5 gráficos Recharts.

Isso gera três problemas críticos:
1. **Sobrecarga Cognitiva e Ruptura da Jornada**: O tomador de decisão institucional (CIO, gestor de Family Office, tesouraria bancária ou CTO) é forçado a percorrer uma tese de venture capital, gráficos de AUM, diagramas técnicos de microsserviços e tabelas de conformidade regulatória na mesma página de aterrissagem.
2. **Performance e Consumo de Recursos no DOM**: Carregar 4 árvores do React Flow e um SVG geoespacial de alta resolução simultaneamente na primeira rota prejudica o First Contentful Paint (FCP), Cumulative Layout Shift (CLS) e a taxa de quadros (FPS) durante o scroll.
3. **Desalinhamento com a Própria Navegação (Navbar e Footer)**: O `nav-links.ts` e o `Footer.tsx` já estão categorizados estruturalmente em 5 eixos temáticos (*Platform*, *Markets*, *Technology*, *Ecosystem*, *Company*), porém hoje todos os links apontam para âncoras locais (`#hash`) empilhadas na rota raiz (`/`).

---

# 1. Auditoria do Projeto Real

### Configuração e Entry Points
- **Framework & Runtime**: React 19 com TypeScript, Vite e Tailwind CSS v4.
- **Roteamento**: `react-router-dom` com `createBrowserRouter` em `src/App.tsx`.
- **Rotas Existentes**:
  - Somente `/` (`HomeView`) e `*` (`NotFoundView`), replicadas dinamicamente com prefixos de idiomas através de `allPrefixes` em `src/i18n/langs.ts`.
  - Constante de rotas em `src/constants/routes/routes.constants.ts` contém apenas `PATH_PAGE.home = "/"`.
- **Internacionalização**: Camada i18n completa via `react-i18next` com suporte a múltiplos idiomas e namespaces (`home.json`, `nav.json`, `common.json`).
- **Design System & Estilo**: Paleta institucional escura (`#050607`, `#0A0D0F`, acentos em `#189890` e `#0C5F5A`), tipografia institucional de alta legibilidade (`type-hero-title`, `type-section-title`, `type-metric`).

### Mapeamento das 21 Seções Existentes em `src/pages/Home/view.tsx`
A renderização atual é sequencial e envolta por `SectionBackdrop`:

| # | Seção no Código | ID Âncora | Tipo de Componente Principal |
|---|---|---|---|
| 01 | `Hero` | `#hero` | Tipografia assimétrica, métricas de abertura e acento gradiente |
| 02 | `TheProblem` | `#problem` | Comparativo institucional (Tradicional vs. Elleva) e Recharts |
| 03 | `NewCategory` | `#new-category` | Diagrama interativo React Flow (`NewCategoryFlow`) |
| 04 | `MarketOpportunity` | `#market-opportunity` | Gráfico Recharts de projeção de AUM (2025-2030) e 4 métricas |
| 05 | `TheProduct` | `#product` | 4 abas interativas do ciclo *Pesquisar → Decidir → Executar → Monitorar* |
| 06 | `InvestmentIntelligence`| `#investment-intelligence` | Estudo de caso institucional com distribuição probabilística Recharts |
| 07 | `Architecture` | `#architecture` | Diagrama complexo React Flow (`ArchitectureFlow` com nós e arestas customizados) |
| 08 | `InvestmentExperience` | `#investment-experience` | Simulador de terminal com 10 visões analíticas completas (`Overview`, `Positions`, `Allocation`, etc.) |
| 09 | `GlobalMarkets` | `#global-markets` | Mapa mundial interativo D3/SVG com hubs (NYC, LON, FRA, TYO, SGP, HKG, SAO) |
| 10 | `TheNewSoftware` | `#new-software` | Sequência em 3 etapas da transformação do trabalho intelectual em software |
| 11 | `BusinessModel` | `#business-model` | Fontes de receita e curva de alavancagem operacional Recharts |
| 12 | `EllevaLoop` | `#elleva-loop` | Diagrama topológico cíclico React Flow (`EllevaLoopFlow`) |
| 13 | `Defensibility` | `#defensibility` | 4 camadas de fosso competitivo (*Moat*) |
| 14 | `StrategicPillars` | `#strategic-pillars` | 4 pilares: Segregação, Determinismo, Auditoria e Governança |
| 15 | `Technology` | `#technology` | Especificações de infraestrutura: Kafka, Transformers, FIX 4.4, Ledger |
| 16 | `ModernFinancialInfrastructure` | `#financial-infrastructure` | Diagrama em 3 camadas React Flow (`ModernFinancialInfrastructureFlow`) |
| 17 | `OperationalAdvantage` | `#operational-advantage` | Gráfico de barras comparativo de eficiência operacional Recharts |
| 18 | `Trust` | `#trust` | 3 garantias fiduciárias e matriz de conformidade regulatória (CVM, SOC 2, ISO) |
| 19 | `Ecosystem` | `#ecosystem` | Redes de custodiantes, brokers DMA, market data e protocolos FIX |
| 20 | `FAQ` | `#faq` | Accordion com perguntas institucionais frequentes |
| 21 | `FinalCTA` | `#final-cta` | Bloco final de aterrissagem institucional para contato/acesso |

---

# 2. Análise de Conteúdo e Diagnóstico de Redundância

### Seções com Sobreposição Direta
1. **`TheProblem` vs. `OperationalAdvantage`**:
   Ambas utilizam as exatas mesmas 4 métricas conceituais (`2.8x` ativos acompanhados, `3.6x` velocidade de resposta, `-62%` custo por análise, `2.4x` capacidade por analista). Manter ambas na mesma página gera repetição de argumentos.
2. **`Architecture` vs. `Technology` vs. `ModernFinancialInfrastructure`**:
   As três seções expõem a infraestrutura tecnológica. `Architecture` foca no fluxo de dados lógico; `Technology` especifica os protocolos (Kafka, FIX 4.4, Transformers); e `ModernFinancialInfrastructure` apresenta um diagrama de 3 camadas conceituais.
3. **`StrategicPillars` vs. `Trust`**:
   `StrategicPillars` trata de segregação de custódia, auditoria e determinismo. `Trust` reapresenta as mesmas garantias adicionando certificações (SOC 2, ISO 27001, CVM 175).
4. **`TheNewSoftware`, `BusinessModel`, `EllevaLoop` e `Defensibility`**:
   Este bloco inteiro é uma apresentação de tese corporativa e modelo de alavancagem econômica típica de relacionamento institucional com investidores (IR/Company), destoando do fluxo de produto ou infraestrutura técnica.

---

# 3. Decisão de Divisão de Rotas e Jornadas

### Critérios de Distribuição

| Página Proposta | Rota | Seções Alocadas | Perfil de Visitante | Objetivo Principal |
|---|---|---|---|---|
| **Home** | `/` | 1. Hero<br>2. TheProblem<br>3. NewCategory<br>4. TheProduct (Overview)<br>5. GlobalMarkets (Resumo)<br>6. Trust<br>7. FAQ<br>8. FinalCTA | Decisores C-Level, Alocadores de Capital, Visitantes Gerais | Apresentação rápida da tese, geração de credibilidade e direcionamento para páginas de aprofundamento. |
| **Platform** | `/platform` | 1. Platform Hero<br>2. TheProduct (Ciclo 4 Fases completo)<br>3. InvestmentIntelligence (Case TSMC)<br>4. InvestmentExperience (Terminal 10 abas)<br>5. Platform CTA | Gestores de Portfólio, CIOs, Analistas de Investimento | Demonstração tangível da ferramenta, da governança das ordens e da capacidade de execução. |
| **Markets** | `/markets` | 1. Markets Hero<br>2. GlobalMarkets (Mapa interativo completo com hubs e latências)<br>3. MarketOpportunity (Gráfico AUM 2025-2030)<br>4. Liquidity & Execution (Ecosystem brokers DMA)<br>5. Markets CTA | Traders, Diretores de Mesa, Gestores Globais | Compreensão da cobertura de ativos mundiais, conectividade FIX e profundidade de liquidez. |
| **Technology** | `/technology` | 1. Tech Hero<br>2. Architecture (React Flow interativo)<br>3. Technology (Stack Kafka/FIX/Ledger)<br>4. ModernFinancialInfrastructure (Diagrama 3 camadas)<br>5. Security & Governance (Garantias criptográficas)<br>6. Tech CTA | CTOs, Engenheiros Financeiros, Auditores de Risco | Validação técnica da segurança, redundância multi-região e determinismo algorítmico. |
| **Company** | `/company` | 1. Company Hero<br>2. TheNewSoftware (Tese do software cognitivo)<br>3. BusinessModel (Fontes de receita e escala)<br>4. EllevaLoop (Flywheel operacional)<br>5. Defensibility (4 camadas de fosso)<br>6. OperationalAdvantage (Benchmark de alavancagem)<br>7. Ecosystem & StrategicPillars<br>8. Company CTA | Investidores Institucionais, Partners, Candidatos Executivos | Apresentação da viabilidade institucional, crescimento e visão de longo prazo. |

---

# 4. Ordem de Exibição Detalhada por Página

## Página 01 — Home
**URL**: `/`
**Objetivo**: Porta de entrada concisa, institucional, elegante e direta.

```text
01. Hero
    ├── HeroEyebrow
    ├── HeroTitle (Acento gradiente)
    ├── HeroDescription
    └── HeroStatsGrid (3 métricas fundamentais de tração)

02. TheProblem
    ├── ProblemHeader
    ├── ComparisonGrid (Modelo Tradicional vs. Modelo Elleva)
    └── OperationalBenchmarkSummary

03. NewCategory
    ├── CategoryHeader
    ├── NewCategoryFlow (React Flow simplificado da categoria)
    └── PeripheralModulesOverview

04. TheProductSummary
    ├── ProductHeadline
    └── FourPhasesGrid (Pesquisar → Decidir → Executar → Monitorar)

05. GlobalMarketsSummary
    ├── GlobalReachHighlight
    └── ActiveHubsTicker (NYC, LON, FRA, TYO, SGP, HKG, SAO)

06. Trust & Governance
    ├── ThreeGuaranteesGrid (Segregação, Determinismo, Auditabilidade)
    └── RegulatoryBadges (CVM, SOC 2, ISO 27001)

07. FAQ
    └── InstitutionalAccordion (5 perguntas essenciais sobre custódia e risco)

08. FinalCTA
    └── InstitutionalAccessPrompt
```

---

## Página 02 — Platform
**URL**: `/platform`
**Objetivo**: Imersão completa no sistema operacional de alocação de capital e no terminal de software.

```text
01. PlatformHero
    ├── PlatformBreadcrumb
    ├── PlatformHeroHeader ("O Sistema Operacional do Capital Autônomo")
    └── OperatingCycleBadge

02. TheProduct
    ├── PhaseSelector (Tabs interativas: Pesquisar | Decidir | Executar | Monitorar)
    ├── PhaseTelemetryMetrics (Latência, capacidade e throughput)
    └── ActiveProcessesInspector

03. InvestmentIntelligence
    ├── InvestmentCaseHeader
    ├── QuantitativeThesisPanel (Exemplo prático de alocação institucional)
    ├── ProbabilityDistributionChart (Recharts com cenários Base/Alto/Baixo)
    └── RiskConstraintsMatrix

04. InvestmentExperience
    ├── TerminalHeader & AccountSelector
    ├── TerminalTabBar (10 abas funcionais: Overview, Positions, Allocation, Performance, Risk, Liquidity, Intelligence, Attribution, Alerts, Compliance)
    └── ActiveTerminalViewContainer

05. PlatformCTA
    └── RequestEnvironmentDemoCTA
```

---

## Página 03 — Markets
**URL**: `/markets`
**Objetivo**: Exibição da infraestrutura de mercado, ativos negociados, cobertura geográfica e volume de mercado.

```text
01. MarketsHero
    ├── MarketsEyebrow ("Mercados Globais & Conectividade")
    └── MarketsHeadline ("Execução em Milissegundos nos Maiores Polos Financeiros do Mundo")

02. GlobalMarkets
    ├── FinancialMapContainer (ComposableMap D3 com projeção mundial)
    ├── HubMarkersLayer (Pinos georreferenciados interativos)
    ├── LatencyTelemetryPanel (Métricas de rota FIX direta por cidade)
    └── ExchangeCoverageDetails (NYSE, NASDAQ, CME, LSE, B3, etc.)

03. MarketOpportunity
    ├── OpportunityHeader
    ├── AUMProjectionChart (Gráfico de área Recharts 2025-2030)
    └── InstitutionalTAMMetrics (US$ 147T Global AUM, Family Offices AUM)

04. LiquidityRoutes
    ├── CustodianIntegrationMatrix
    └── DirectMarketAccessSpecs

05. MarketsCTA
    └── ConnectCustodyCTA
```

---

## Página 04 — Technology
**URL**: `/technology`
**Objetivo**: Validação para auditores técnicos, CTOs e gestores de segurança fiduciária.

```text
01. TechHero
    ├── TechEyebrow ("Infraestrutura de Engenharia Determinística")
    └── TechHeadline ("Arquitetura Resiliente para Alocação Autônoma")

02. Architecture
    ├── ArchitectureOverview
    └── ArchitectureFlow (React Flow com nós de ingestão, motores de inteligência e conectores FIX)

03. TechnologyStack
    ├── LayerCards (Data Stream, AI Transformers, Engine de Decisão, Ledger)
    └── SystemSpecifications (Disponibilidade, criptografia, redundância)

04. ModernFinancialInfrastructure
    ├── InfrastructureFlow (React Flow 3-Tier: Conectividade, Motor Central, Aplicações)
    └── TierSummaryCards

05. SecurityAndCompliance
    ├── CryptographicLedgerVerification
    └── PreTradeComplianceEnforcement

06. TechCTA
    └── TechnicalWhitepaperCTA
```

---

## Página 05 — Company
**URL**: `/company`
**Objetivo**: Tese corporativa, modelo de negócio sustentável, expansão e governança fiduciária.

```text
01. CompanyHero
    ├── CompanyEyebrow ("Sobre a Elleva")
    └── CompanyHeadline ("Construindo a Próxima Geração da Gestão de Ativos")

02. TheNewSoftware
    ├── IntellectualWorkEvolution (Etapa 01, 02 e 03)
    └── ProductivityMultipliers

03. BusinessModel
    ├── RevenueStreamsGrid (Plataforma, Volume Operado, Desempenho)
    └── OperatingLeverageChart (Recharts de escala operacional sem aumento de custos)

04. EllevaLoop
    ├── FlywheelHeader
    ├── EllevaLoopFlow (React Flow com ciclo contínuo de aprendizado e dados)
    └── FlywheelProgressionSteps

05. Defensibility
    ├── MoatLayersGrid (4 camadas de proteção competitiva)
    └── NetworkEffectsStatement

06. EcosystemPartners
    ├── CustodiansGrid (BTG, Itaú BBA, BNY Mellon, State Street)
    ├── MarketDataFeeds (Bloomberg, Refinitiv, FactSet, S&P)
    └── RegulatoryEntities (CVM, ANBIMA, SOC 2)

07. CompanyCTA
    └── InstitutionalContactCTA
```

---

# 5. Componentes Compartilhados vs. Componentes Específicos

### Componentes Compartilhados (`src/components/`)
Estes componentes atendem ao critério de **reutilização real entre múltiplas páginas** (seguindo a regra do `ARCHITECTURE.md`):

1. **`src/components/layout/Navbar/`**: Barra de navegação global, unificada, responsiva, com suporte a troca de idioma e tema.
2. **`src/components/layout/Footer/`**: Rodapé institucional unificado com colunas de links institucionais e dados corporativos.
3. **`src/components/backdrop/SectionBackdrop/`**: Grid e iluminação de fundo utilizada para padronizar o visual das seções.
4. **`src/components/ui/`**: Botões institucionais, tooltips, modais e alertas padronizados via shadcn.
5. **`src/components/ThemeToggle.tsx` & `LanguageSwitcher.tsx`**: Controles de internacionalização e tema visual.
6. **`src/components/common/SectionHeader.tsx`**: Componente utilitário reutilizável para renderizar `Eyebrow`, `H2` e descrição com espaçamento padronizado.

### Componentes Específicos (Colocados dentro de cada Página e Seção)
Componentes com regra de negócio estrita que **NÃO devem ser globalizados**:

- **Home**:
  - `pages/Home/sections/Hero/components/HeroStats.tsx`
  - `pages/Home/sections/TheProblem/components/ProblemComparisonCard.tsx`
  - `pages/Home/sections/NewCategory/components/Flow/`
- **Platform**:
  - `pages/Platform/sections/InvestmentExperience/views/*` (Todas as 10 visões do simulador: `AlertsView`, `PositionsView`, etc.)
  - `pages/Platform/sections/TheProduct/components/PhaseTabButton.tsx`
  - `pages/Platform/sections/InvestmentIntelligence/components/ProbabilityBarChart.tsx`
- **Markets**:
  - `pages/Markets/sections/GlobalMarkets/components/WorldMapSVG.tsx`
  - `pages/Markets/sections/GlobalMarkets/components/HubTelemetryCard.tsx`
  - `pages/Markets/sections/MarketOpportunity/components/AUMChart.tsx`
- **Technology**:
  - `pages/Technology/sections/Architecture/components/Flow/*` (Nós, arestas e wrappers do React Flow)
  - `pages/Technology/sections/ModernFinancialInfrastructure/components/Flow/*`
  - `pages/Technology/sections/Technology/components/StackCard.tsx`
- **Company**:
  - `pages/Company/sections/BusinessModel/components/LeverageChart.tsx`
  - `pages/Company/sections/EllevaLoop/components/Flow/*`
  - `pages/Company/sections/Defensibility/components/MoatLayerCard.tsx`

---

# 6. Estrutura de Pastas Recomendada (Planejamento Futuro)

Seguindo estritamente a convenção estabelecida no documento `./agents/ARCHITECTURE.md`:

```text
src/
├── pages/
│   ├── Home/
│   │   ├── view.tsx
│   │   └── sections/
│   │       ├── Hero/
│   │       │   ├── components/
│   │       │   │   └── HeroStats.tsx
│   │       │   └── index.tsx
│   │       ├── TheProblem/
│   │       │   ├── components/
│   │       │   └── index.tsx
│   │       ├── NewCategory/
│   │       ├── Trust/
│   │       ├── FAQ/
│   │       └── FinalCTA/
│   │
│   ├── Platform/
│   │   ├── view.tsx
│   │   └── sections/
│   │       ├── PlatformHero/
│   │       ├── TheProduct/
│   │       ├── InvestmentIntelligence/
│   │       └── InvestmentExperience/
│   │           ├── views/
│   │           │   ├── OverviewView.tsx
│   │           │   ├── PositionsView.tsx
│   │           │   └── ...
│   │           └── index.tsx
│   │
│   ├── Markets/
│   │   ├── view.tsx
│   │   └── sections/
│   │       ├── MarketsHero/
│   │       ├── GlobalMarkets/
│   │       └── MarketOpportunity/
│   │
│   ├── Technology/
│   │   ├── view.tsx
│   │   └── sections/
│   │       ├── TechHero/
│   │       ├── Architecture/
│   │       │   ├── components/Flow/
│   │       │   └── index.tsx
│   │       ├── ModernFinancialInfrastructure/
│   │       └── TechnologyStack/
│   │
│   └── Company/
│       ├── view.tsx
│       └── sections/
│           ├── CompanyHero/
│           ├── TheNewSoftware/
│           ├── BusinessModel/
│           ├── EllevaLoop/
│           ├── Defensibility/
│           └── Ecosystem/
```

---

# 7. Análise de Navegação: Navbar e Footer

### Recomendações para o Navbar
O arquivo atual `src/layout/constants/nav-links.ts` já possui os 5 grupos perfeitos, mas deve ser adaptado de links locais de âncora (`#hash`) para rotas reais (`/rota#sub-ancora`):

| Categoria no Navbar | Destino Principal | Sub-Itens Recomendados |
|---|---|---|
| **Platform** | `/platform` | Visão Geral, Ciclo Operacional, Estudo de Inteligência, Terminal Interativo |
| **Markets** | `/markets` | Cobertura Global, Mapa de Latência, Oportunidade de Mercado (AUM) |
| **Technology** | `/technology` | Arquitetura de Sistemas, Stack Tecnológico, Camadas de Infraestrutura, Segurança |
| **Company** | `/company` | Tese de Software, Modelo de Negócio, Flywheel (Elleva Loop), Defensibilidade, Parceiros |

*Páginas acessadas exclusivamente via CTAs ou Footer:*
- `/terms` (Termos de Serviço)
- `/privacy-policy` (Política de Privacidade)
- `/risk-disclosures` (Avisos Legais de Risco)
- Portal do Cliente / Acesso Restrito: `https://app.elleva.me`

### Recomendações para o Footer
O `Footer.tsx` atual já possui colunas bem categorizadas:
- **Coluna 01 (Platform)**: Links para `/platform` e âncoras internas relevantes.
- **Coluna 02 (Markets)**: Links para `/markets`.
- **Coluna 03 (Technology)**: Links para `/technology`.
- **Coluna 04 (Company)**: Links para `/company`.
- **Coluna 05 (Legal)**: Páginas de compliance e termos.

---

# 8. Análise de Scroll Snap e Animações

### Análise de Scroll Snap
- **Container Principal (`html` / `body`)**:
  - **NÃO utilizar** `snap-mandatory` ou `snap-y` no container global de páginas com conteúdo de altura variável, diagramas do React Flow ou o mapa interativo. O snap forçado em telas desktop ou laptops trava o scroll suave do usuário quando ele tenta interagir com zoom ou arrastar nós no React Flow.
- **Hero Interno**:
  - Caso o Hero utilize uma cena narrativa expandida (ex: 300dvh de scroll interno), este controle deve ser realizado via **CSS Sticky** (`sticky top-0 h-screen`) com transições de frames gerenciadas pelo percentual de scroll do container pai, e **não** via scroll snap CSS nativo.
- **Seções da Home**:
  - Se for desejado o alinhamento de seções, deve-se adotar `snap-proximity` exclusivamente em viewports grandes (`lg:`), permitindo que seções com tabelas ou gráficos grandes não fiquem cortadas verticalmente.

### Análise de Bibliotecas de Animação
- **Motion (`motion/react`)**:
  - O projeto utiliza de forma exemplar `motion.div`, `AnimatePresence`, variantes coordenadas e atrasos escalonados (`delay: i * 0.09`).
  - **Impacto da Divisão em Páginas**: Altamente positivo. Ao carregar menos nós simultâneos na memória, os observadores de interseção do Framer Motion entram em ação com maior fluidez e sem quedas de framerate no scroll.
- **React Flow**:
  - Hoje há 4 nós do React Flow carregados no mesmo ciclo de renderização. Ao movê-los para suas respectivas páginas (`Platform`, `Technology`, `Company`), o overhead de processamento SVG/Canvas é drasticamente reduzido.

---

# 9. Riscos e Pontos de Atenção para Futura Refatoração

1. **Internacionalização (i18n)**:
   - Atualmente grande parte das chaves reside em `public/internationalization/{lang}/home.json`.
   - Ao criar as páginas `/platform`, `/markets`, etc., será necessário manter o namespace `home.json` ou criar namespaces dedicados (`platform.json`, `markets.json`) para evitar quebras em traduções ativas.
2. **Scroll Restoration**:
   - Ao transicionar entre rotas com React Router (`/` para `/platform`), deve-se garantir um componente de `ScrollToTop` para que a nova página não inicie na posição de rolagem da anterior.
3. **Navegação Híbrida (Rota + Hash)**:
   - Links no Navbar que apontam de `/` para `/platform#investment-case` precisarão de um utilitário para aguardar o carregamento do DOM antes de invocar o `scrollIntoView`.
4. **React Flow Wrapper Dimensions**:
   - Componentes React Flow exigem altura fixa ou `h-full` com container pai delimitado. Ao transferi-los de pasta, as classes de grid/flexbox devem ser preservadas integralmente.

---

# 10. Plano de Alterações Sugerido (Passo a Passo Futuro)

Este é um plano de ação estruturado para orientar execuções posteriores, sem que nenhuma alteração seja executada neste momento.

### Alta Prioridade
1. **Configuração de Rotas no Router**:
   - Adicionar as constantes de rota em `src/constants/routes/routes.constants.ts` (`PATH_PAGE.platform`, `PATH_PAGE.markets`, `PATH_PAGE.technology`, `PATH_PAGE.company`).
   - Declarar as rotas em `src/App.tsx` dentro do `Layout`.
2. **Criação das Novas Páginas e Views**:
   - Criar `src/pages/Platform/view.tsx`.
   - Criar `src/pages/Markets/view.tsx`.
   - Criar `src/pages/Technology/view.tsx`.
   - Criar `src/pages/Company/view.tsx`.
3. **Migração Gradual das Seções**:
   - Mover seções de `src/pages/Home/sections/` para suas respectivas páginas conforme o mapeamento arquitetural.
4. **Enxugamento da Home**:
   - Atualizar `src/pages/Home/view.tsx` para conter apenas as 8 seções prioritárias da narrativa de entrada.

### Média Prioridade
5. **Atualização do Navbar (`nav-links.ts`)**:
   - Alterar hrefs locais para links direcionados às rotas das páginas correspondentes.
6. **Atualização do Footer (`Footer.tsx`)**:
   - Substituir links ancorados por rotas reais.
7. **ScrollToTop Hook**:
   - Implementar listener de mudança de rota no `Layout` para redefinir o scroll ao trocar de página.

### Baixa Prioridade
8. **Divisão de Namespaces i18n**:
   - Separar `home.json` em arquivos por domínio quando o volume de chaves justificar.
9. **Eliminação de Código Duplicado**:
   - Unificar o comparativo de métricas de `TheProblem` e `OperationalAdvantage` em um componente compartilhado de estatísticas operacionais.

---

# 11. Conclusão

**Número recomendado de páginas: 5**

01. **Home (`/`)**
    - Seções: `Hero`, `TheProblem`, `NewCategory`, `TheProduct (Resumo)`, `GlobalMarkets (Destaques)`, `Trust`, `FAQ`, `FinalCTA`
02. **Platform (`/platform`)**
    - Seções: `PlatformHero`, `TheProduct (Ciclo 4 Fases)`, `InvestmentIntelligence (Case TSMC)`, `InvestmentExperience (Terminal 10 Abas)`, `PlatformCTA`
03. **Markets (`/markets`)**
    - Seções: `MarketsHero`, `GlobalMarkets (Mapa Mundi Interativo)`, `MarketOpportunity (AUM 2025-2030)`, `LiquidityRoutes`, `MarketsCTA`
04. **Technology (`/technology`)**
    - Seções: `TechHero`, `Architecture (React Flow)`, `TechnologyStack`, `ModernFinancialInfrastructure (3 Tiers)`, `SecurityGovernance`, `TechCTA`
05. **Company (`/company`)**
    - Seções: `CompanyHero`, `TheNewSoftware`, `BusinessModel (Alavancagem)`, `EllevaLoop (Flywheel)`, `Defensibility`, `EcosystemPartners`, `CompanyCTA`

### Síntese Executiva
- **O que deve permanecer na Home?**
  Apenas a narrativa de aterrissagem essencial que responde: *O que é a Elleva? Qual o problema que resolve? Qual a nova categoria que cria? Por que confiar? Como começar?* (Redução de 21 para 8 seções focadas).
- **O que deve virar página?**
  O aprofundamento do produto e terminal interativo (`/platform`), a infraestrutura geográfica de bolsas e liquidez (`/markets`), a validação de arquitetura e tecnologia para auditores/CTOs (`/technology`) e a tese de negócios e alavancagem de modelo (`/company`).
- **Por quê?**
  Porque atende simultaneamente aos diferentes perfis de público institucional sem fadiga de rolagem, elimina duplicações de métricas, melhora o desempenho ao desacoplar 4 diagramas React Flow e o mapa mundial, e alinha perfeitamente o código à navegação já planejada no Navbar e Footer.
- **Qual arquitetura de pastas é recomendada?**
  A arquitetura modular por domínio com diretórios `sections/` colocados dentro de cada página (`src/pages/[Page]/sections/[Section]/components/`), em total conformidade com o guia `./agents/ARCHITECTURE.md`.
