Да — это уже не лендинг, а dashboard / private platform UI для AlphaForge. Ниже дам тебе полное подробное описание интерфейса, чтобы ты смог по нему собрать такой дашборд через Codex.

Сразу отмечу важную вещь: как и в прошлом макете, часть мелких надписей на изображении декоративная и местами выглядит как AI-generated filler text. Поэтому для реального проекта нужно брать структуру, layout, стиль, типы виджетов и визуальную иерархию, а тексты и данные заменить на нормальные.

⸻

Общая концепция дашборда

Это премиальный private investment dashboard для команды, которая работает с:
	•	крипторынком
	•	фондовым рынком
	•	quant analysis
	•	AI market insights
	•	scam detection / risk alerts
	•	venture scouting
	•	watchlists
	•	portfolio intelligence

По стилю это:
	•	dark premium fintech dashboard
	•	AI-powered investment terminal
	•	смесь Bloomberg / private hedge fund terminal / luxury SaaS

Основное ощущение интерфейса:
	•	дорого
	•	технологично
	•	системно
	•	статусно
	•	безопасно
	•	ориентировано на принятие решений

⸻

Общая структура интерфейса

Макет можно разделить на 5 крупных зон:
	1.	Верхняя браузерная/системная зона
	2.	Верхний header внутри продукта
	3.	Левый sidebar
	4.	Главная контентная сетка dashboard
	5.	Нижняя служебная строка статуса

⸻

1. Верхняя внешняя зона

На картинке сверху показан как будто браузер.

Что видно
	•	вкладка с названием Alpha Forge
	•	адресная строка alphaforge.dashboard.com
	•	стандартные элементы браузера
	•	аватар справа

Для реального продукта

Это не часть сайта, а просто подача макета.
В actual app это можно не делать.
Но если хочешь стилизовать, можно в hero-превью лендинга показать dashboard inside browser frame.

⸻

2. Product Header / верхняя панель дашборда

Под браузерной строкой начинается уже реальный интерфейс продукта.

Структура header

Header разделен на три смысловые части:

Слева
	•	логотип AlphaForge
	•	wordmark ALPHA FORGE
	•	subtitle Investment Intelligence

По центру
	•	крупный брендовый знак AlphaForge
	•	под ним wordmark ALPHAFORGE
	•	подзаголовок Investment Intelligence

Это необычное решение: бренд дублируется и занимает центральную часть header.
Для реального приложения это можно оставить, если хочешь luxury feel, либо упростить и сделать просто search + actions справа.

Справа
	•	поисковая строка
	•	иконка уведомлений
	•	индикатор новых alert’ов
	•	avatar/profile circle

Что должен делать header
	•	Search по тикерам, проектам, стартапам, токенам
	•	Notifications по AI signals, risk alerts, portfolio changes
	•	User profile / team member menu

Стиль header
	•	очень темный navy фон
	•	легкое золотое свечение по границам
	•	тонкие золотые линии
	•	стеклянно-металлический вид
	•	rounded search field
	•	маленькие премиальные кнопки/иконки

⸻

3. Sidebar / левая боковая панель

Это важный элемент продукта.

Что видно в sidebar

Пункты меню:
	•	Dashboard
	•	Portfolio View
	•	AI Tools
	•	Quant Analysis
	•	Ventures
	•	Scam Check
	•	Settings

И внизу еще отдельный Settings.

Логика

Скорее всего:
	•	верхний Settings — основной пункт в навигации
	•	нижний Settings — footer-action
Но в реальном продукте надо оставить только один Settings.

Как должна быть устроена панель

Верх
	•	логотип/бренд
	•	можно добавить workspace switcher или team name

Основная навигация
	•	Dashboard
	•	Portfolio
	•	Signals
	•	AI Tools
	•	Quant Lab
	•	Ventures
	•	Scam Detector
	•	Watchlists
	•	Reports
	•	Settings

Низ
	•	user/team info
	•	API status
	•	logout
	•	settings

Активный пункт

На макете активен Dashboard:
	•	темно-золотой фон
	•	светящийся контур
	•	иконка и текст выделены

Иконки

У каждого пункта своя иконка:
	•	Dashboard → grid/panel
	•	Portfolio → wallet / folder
	•	AI Tools → chip / brain / bot
	•	Quant Analysis → chart bars
	•	Ventures → rocket
	•	Scam Check → shield
	•	Settings → gear

Стиль sidebar
	•	темный semi-transparent panel
	•	border gold glow
	•	rounded corners
	•	тонкие divider lines
	•	menu items с hover highlight
	•	иконки gold outline
	•	текст warm white / muted gold

⸻

4. Main dashboard content / основная сетка

Контент организован как панель карточек с равномерными отступами.

Основная область разбита на несколько виджетов:
	1.	Portfolio Overview
	2.	AI Powered Insights
	3.	Quant Lab
	4.	Risk Alerts
	5.	Ventures
	6.	Active Watchlist

Это grid-layout, примерно 2 колонки:
	•	левая колонка шире
	•	правая чуть уже
	•	каждая карточка самостоятельна

⸻

5. Подробный разбор карточек

⸻

A. Portfolio Overview (Invest)

Это верхняя левая и самая важная карточка.

Название

PORTFOLIO OVERVIEW (INVEST)

Назначение

Показывает общую картину портфеля:
	•	total value
	•	daily change
	•	allocation
	•	sectors / asset classes
	•	growth

Внутренняя структура

Карточка делится на 3 смысловые зоны:

Левая зона

Основные метрики:
	•	Total Value
	•	сумма портфеля
	•	изменение в деньгах
	•	изменение в процентах
	•	Daily Change
	•	еще одно изменение/прирост

Пример метрик:
	•	Total Value: $145,891.87
	•	Change: +$3,900 (+12.86%)
	•	Daily Change: +1,764 (1.19%)

Центральная зона

Круговая/донат диаграмма распределения активов.

Правая зона

Легенда распределения:
	•	Technology
	•	Crypto
	•	Commodities
	•	Bits
	•	etc.

Для реального продукта лучше использовать нормальные категории:
	•	Crypto
	•	Equities
	•	Startups
	•	Cash
	•	Commodities
	•	Alternatives

Что должен уметь этот виджет
	•	показывать allocation %
	•	total equity
	•	pnl
	•	24h / 7d / 30d toggle
	•	hover tooltips
	•	filters by account/team/member

Визуал
	•	золотой donut chart
	•	темный panel background
	•	тонкий gold border
	•	glowing section label
	•	большие числа слева
	•	справа аккуратная легенда

⸻

B. AI Powered Insights

Это верхняя правая карточка.

Название

AI POWERED INSIGHTS

Назначение

Показывает:
	•	текущий market sentiment
	•	AI-generated signals
	•	свежие выводы моделей
	•	actionable insights

Внутренняя структура

Карточка разделена на 2 части:

Левая часть

Большой gauge / speedometer:
	•	стрелка
	•	статус Very Bullish
	•	подпись типа “current market sentiment”

Это виджет общего настроения рынка.

Правая часть

Список AI-generated signals:
	•	Signal 1
	•	Signal 2
	•	Signal 3
	•	время публикации: 19h ago, 20h ago и т.д.
	•	краткий summary текста

Для реального продукта здесь лучше сделать
	•	sentiment score from 0 to 100
	•	Bullish / Neutral / Bearish
	•	list of latest signals
	•	each signal has:
	•	title
	•	category
	•	market
	•	confidence
	•	timestamp
	•	brief summary
	•	click to details

Стиль
	•	gauge с золотыми и зелеными акцентами
	•	текстовые карточки справа
	•	тонкие divider lines
	•	small tag “AI”

⸻

C. Quant Lab (Quant)

Это большая средняя левая карточка.

Название

QUANT LAB (QUANT)

Назначение

Показывает quantitative analysis:
	•	historical chart
	•	model comparison
	•	algorithm performance
	•	candidate assets

Внутренняя структура

Левая большая часть

Большой свечной график / market chart:
	•	candlestick chart
	•	volume bars
	•	time axis Jan-Jun
	•	price label справа

Правая верхняя часть

Line chart:
	•	model performance comparison
	•	2 линии
	•	небольшая аналитика

Правая нижняя часть

Algorithm performance table:
	•	Algorithm 1
	•	Algorithm 2
	•	returns / accuracy / score

Что реально должно быть здесь
	•	backtest chart
	•	strategy comparison
	•	quant model leaderboard
	•	factor scores
	•	asset screener candidates

Возможные элементы управления
	•	timeframe: 1D / 1W / 1M / 1Y
	•	strategy selector
	•	market selector
	•	“Run model”
	•	“Export”

Стиль
	•	professional terminal-like grid chart
	•	amber/gold lines
	•	muted axes
	•	data-first layout
	•	premium glow border

⸻

D. Risk Alerts (Scam Detector)

Это средняя правая карточка.

Название

RISK ALERTS (SCAM DETECTOR)

Назначение

Одна из главных фишек платформы:
	•	scam screening
	•	risk classification
	•	flagged projects
	•	project rating

Внутренняя структура

Верхняя левая часть

Summary cards:
	•	Critical: 3 projects
	•	High risk: 2 projects
	•	Low risk: 1 project

Нижняя левая часть

Горизонтальные risk bars:
	•	Critical
	•	High risk
	•	Low risk
	•	количественные значения

Правая часть

Список recent scanned projects:
	•	project name
	•	category
	•	risk rating
	•	High Risk labels

Для реального продукта здесь лучше сделать
	•	risk score 0–100
	•	categories:
	•	Smart Contract Risk
	•	Team Verification Risk
	•	Liquidity Risk
	•	Tokenomics Risk
	•	Legal/Compliance Risk
	•	flagged reasons
	•	recent scans
	•	click into project report

Стиль
	•	warning colors аккуратно встроены в темную палитру
	•	red/orange/green только внутри статусов
	•	без дешевой яркости
	•	shield icon in header

⸻

E. Ventures

Это нижняя левая карточка.

Название

VENTURES

Назначение

Раздел для поиска перспективных стартапов, сделок и high-growth opportunities.

Внутренняя структура

На макете это 4 карточки:
	•	New Investments
	•	Crypto Investments
	•	Meta Investments
	•	Ventures Investments

Каждая карточка содержит:
	•	иконку
	•	название
	•	короткий текст
	•	кнопку Learn more

Для реального продукта лучше переосмыслить

Сделай это как startup opportunity cards:

Card 1
AI Infrastructure
Seed / Series A
Score: 89/100

Card 2
Web3 Analytics
Token + equity exposure
Score: 76/100

Card 3
Fintech API
Revenue traction
Score: 84/100

Card 4
Defense / special situations / deep tech
High upside
Score: 91/100

Что еще можно добавить
	•	funding stage
	•	sector
	•	traction
	•	geography
	•	risk score
	•	founder verification
	•	due diligence status

Стиль
	•	компактные gold-framed cards
	•	dark background
	•	subtle glow
	•	small CTA button

⸻

F. Active Watchlist

Это нижняя правая карточка.

Название

ACTIVE WATCHLIST

Назначение

Отслеживание активов и проектов.

Структура таблицы

Колонки:
	•	Ticker
	•	Price
	•	Price / second metric
	•	Sparkline
	•	Change
	•	Target

Строки:
	•	AVDK
	•	ALDN
	•	CRYPO
	•	etc.

Для реального проекта

Сделать watchlist table с:
	•	asset symbol
	•	current price
	•	24h %
	•	7d sparkline
	•	score
	•	target
	•	AI signal
	•	risk flag

Возможные рынки
	•	Crypto
	•	Stocks
	•	ETF
	•	Startup deal pipeline
	•	OTC / special situations

Функции
	•	сортировка по любому столбцу
	•	фильтр
	•	добавить тикер
	•	star/favorite
	•	click to details
	•	alert thresholds

Стиль
	•	compact premium data table
	•	soft row hover
	•	green/red accents for change
	•	sparklines in gold or muted green

⸻

6. Нижняя строка статуса

Внизу макета видны мелкие служебные надписи:

Слева:
	•	Last Updated: Time 17 13:52 AM

Справа:
	•	API Status: Online

Для реального продукта

Сделать footer-status bar:

Слева:
	•	Last sync: 2 min ago
	•	Data source status

Справа:
	•	API: Online
	•	AI Engine: Healthy
	•	Risk Scanner: Active

Это очень хорошая деталь для terminal-feel.

⸻

Визуальный стиль всего dashboard

⸻

Цвета

Фон

Очень темный navy/black:
	•	#05070B
	•	#08111F
	•	#0A1630

Панели
	•	slightly lighter navy
	•	glass-like dark surfaces
	•	low-opacity gradients

Примеры:
	•	#0D1526
	•	#101A2D
	•	rgba(14, 22, 38, 0.88)

Золото

Основной акцент:
	•	#C89B3C
	•	#E0B85C
	•	#F4D27A
	•	#A97A2A

Текст
	•	warm white: #F2E8D5
	•	muted gold: #D2B980
	•	secondary gray-gold: #94876B

Положительные значения
	•	green accent:
	•	#51C878
	•	#72D68C

Негативные/рисковые значения
	•	red/orange accents:
	•	#D9534F
	•	#F0A34A

⸻

Типографика

Для бренда / крупных заголовков
	•	Cinzel
	•	Playfair Display
	•	Cormorant Garamond

Для UI и таблиц
	•	Inter
	•	Manrope
	•	IBM Plex Sans
	•	Sora

Практичный вариант
	•	headings: Cinzel
	•	UI/body: Inter

⸻

Стиль панелей и компонентов

Каждая карточка dashboard должна иметь:
	•	rounded corners 16–20px
	•	тонкую золотую границу
	•	subtle inner shadow
	•	dark transparent background
	•	soft glow on outer border
	•	top header strip with section title
	•	small category badge справа
	•	3-dot action menu

Header каждой карточки

Содержит:
	•	icon
	•	title
	•	optional category tag
	•	kebab menu

⸻

Layout / сетка

Desktop

Используй layout:
	•	sidebar width: 240–280px
	•	header height: 80–110px
	•	main area padding: 20–28px
	•	grid columns: 12
	•	gap: 20px

Пример сетки
	•	Portfolio Overview → col-span-7
	•	AI Powered Insights → col-span-5
	•	Quant Lab → col-span-7
	•	Risk Alerts → col-span-5
	•	Ventures → col-span-7
	•	Active Watchlist → col-span-5

Это почти повторяет композицию макета.

⸻

Responsive behavior

На планшете:
	•	sidebar collapse
	•	cards stack into 1–2 columns

На мобильном:
	•	sidebar becomes drawer
	•	header simplified
	•	search collapses to icon
	•	all cards go vertical
	•	charts full width
	•	watchlist becomes horizontally scrollable table

⸻

Какие реальные страницы должны быть у такого продукта

По одному dashboard далеко не уедешь, лучше сразу заложить структуру.

Основные страницы
	•	/dashboard
	•	/portfolio
	•	/signals
	•	/ai-tools
	•	/quant
	•	/ventures
	•	/scam-detector
	•	/watchlist
	•	/settings

⸻

Что должно быть внутри по логике продукта

Dashboard

Сводка по всему

Portfolio
	•	holdings
	•	PnL
	•	allocation
	•	rebalance suggestions

AI Tools
	•	signal engine
	•	sentiment engine
	•	summarization
	•	thesis generation

Quant
	•	backtests
	•	model comparison
	•	factor analysis
	•	signal generation

Ventures
	•	startup discovery
	•	due diligence
	•	scoring
	•	team verification

Scam Detector
	•	red flags
	•	rug risk
	•	suspicious patterns
	•	audit status
	•	scoring engine

Watchlist
	•	chosen assets/projects
	•	alert thresholds
	•	notes
	•	scoring changes

⸻

Компоненты, которые нужны Codex

Ниже список UI-компонентов, которые должны быть в проекте.

Layout components
	•	AppShell
	•	Sidebar
	•	TopHeader
	•	PageContainer
	•	StatusBar

Shared UI
	•	PanelCard
	•	SectionHeader
	•	MetricBlock
	•	Badge
	•	GlowButton
	•	SearchInput
	•	UserMenu
	•	NotificationBell

Charts
	•	DonutAllocationChart
	•	GaugeSentimentChart
	•	CandlestickChart
	•	PerformanceLineChart
	•	RiskBars
	•	Sparkline

Tables
	•	WatchlistTable
	•	SignalsList
	•	RiskProjectsList

Domain cards
	•	VentureCard
	•	RiskSummaryCard
	•	PortfolioSummaryCard

⸻

Как переписать текст в нормальный production-style

Вот нормальные тексты вместо декоративных.

Portfolio Overview
	•	Total Portfolio Value
	•	Daily P&L
	•	Allocation by Asset Class
	•	30-Day Performance

AI Powered Insights
	•	Market Sentiment
	•	Latest AI Signals
	•	Confidence Scores
	•	Summary Insights

Quant Lab
	•	Strategy Backtest
	•	Factor Model Comparison
	•	Signal Strength
	•	Model Leaderboard

Risk Alerts
	•	Risk Summary
	•	Flagged Projects
	•	Recent Scans
	•	Risk Classification

Ventures
	•	Featured Opportunities
	•	Stage
	•	Sector
	•	Due Diligence Status

Watchlist
	•	Asset
	•	Price
	•	24H Change
	•	Trend
	•	AI Target

⸻

Готовое описание для Codex

Ниже уже готовый промпт, который можно дать Codex.

Create a premium dark-themed investment intelligence dashboard for a product called AlphaForge. The dashboard should feel like a high-end fintech terminal for a private investment team focused on crypto, stocks, AI-driven signals, quant research, venture scouting, and scam detection.

Design direction:
Luxury fintech UI, dark navy/black background, metallic gold accents, subtle glows, cinematic contrast, premium enterprise dashboard aesthetic. The interface should feel like a blend of a hedge fund terminal, AI analytics platform, and venture intelligence system.

App layout:
- Full-screen authenticated dashboard layout
- Left sidebar navigation
- Top header with branding, search, notifications, and user profile
- Main content area with modular cards in a responsive grid
- Bottom status bar with last sync and API health

Sidebar navigation items:
- Dashboard
- Portfolio View
- AI Tools
- Quant Analysis
- Ventures
- Scam Check
- Watchlist
- Settings

Top header:
- Left: AlphaForge logo and wordmark with subtitle “Investment Intelligence”
- Center optional premium brand mark
- Right: search bar, notifications icon, profile avatar dropdown
- Sticky top bar with subtle blur and gold border glow

Main dashboard cards:
1. Portfolio Overview
- Total portfolio value
- Daily gain/loss
- Donut allocation chart
- Asset class legend
- Premium summary card styling

2. AI Powered Insights
- Gauge chart showing current market sentiment
- Label such as Bullish / Neutral / Bearish
- A list of latest AI-generated signals with timestamps and confidence summaries

3. Quant Lab
- Large candlestick chart with volume
- Smaller line chart comparing model performance
- Quant metrics or algorithm leaderboard
- Controls for timeframe and strategy selection

4. Risk Alerts / Scam Detector
- Summary counters for critical, high-risk, medium-risk, low-risk items
- Risk distribution bars
- Table/list of recently scanned projects with risk ratings
- Highlight suspicious opportunities elegantly

5. Ventures
- Grid of opportunity cards for startups or special investments
- Each card includes title, sector, stage, score, and CTA
- Premium compact card layout

6. Active Watchlist
- Data table with symbol, price, change, sparkline, target, and score
- Hover states and sortable columns

Bottom status bar:
- Last synced timestamp
- API status
- AI engine health
- Risk scanner status

Styling requirements:
- Rounded cards with subtle gold borders and soft glow
- Elegant serif font for branding headings, sans-serif for UI
- Use dark layered backgrounds with gold highlights
- Include divider lines, polished shadows, and premium spacing
- Avoid bright neon or cheap cyberpunk effects

Tech requirements:
- Next.js + React + TypeScript + Tailwind CSS
- Use reusable components for cards, charts, tables, and layout
- Use mock data
- Build responsive layout for desktop, tablet, and mobile
- Sidebar collapses on smaller screens
- Use semantic HTML and accessible interactions


⸻

Что я рекомендую сделать следующим шагом

Теперь лучше всего не останавливаться на описании, а сразу подготовить полный production-ready prompt для Codex с:
	•	файловой структурой проекта
	•	полным списком компонентов
	•	готовыми mock data
	•	цветами в Tailwind config
	•	описанием всех секций
	•	текстами для интерфейса
	•	логикой responsive layout

И тогда Codex сможет собрать тебе уже почти готовый dashboard.