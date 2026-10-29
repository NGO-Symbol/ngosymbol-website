import type { Project } from './types'

// Facts come from documents/knowledge/project-registry.md (portfolio 2026, presentation 2024, grant files).
// Donor names and credit lines still need publication approval (documents/knowledge/open-questions.md).
const entries: Project[] = [
  {
    slug: 'istoriia-moiei-vulytsi',
    title: 'Історія моєї вулиці',
    yearStart: 2026,
    yearEnd: 2027,
    city: 'Харків',
    kind: 'long',
    status: 'launching',
    role: 'organizer',
    formats: ['research'],
    directions: ['culture'],
    tone: 'violet',
    motif: 'streets',
    summary: 'Таблички з QR-кодами на вулицях Харкова й окремі сторінки вулиць: історії, які місто розповідає про себе.',
    body: [
      'Проєкт збирає **історії харківських вулиць**. На вулицях з’являться **таблички з QR-кодами**, які ведуть на сторінки вулиць на сайті проєкту.',
      'Тексти перевіряє **експертна рада**. Окремий сайт проєкту зі своєю структурою й дизайном зараз у розробці.'
    ],
    people: [
      { person: 'yurii-rassokha', role: 'Менеджер проєкту, куратор' },
      { person: 'petro-chekal', role: 'Програмний менеджер, куратор' },
      { person: 'hanna-franyk', role: 'Асистентка проєкту' },
      { person: 'maksym-rozenfeld', role: 'Голова експертної ради' },
      { person: 'larysa-chaika', role: 'Головна ілюстраторка' },
      { person: 'oleksii-chekal', role: 'Головний дизайнер' },
      { person: 'olena-mordyk', role: 'Комунікація' }
    ],
    // Archive views of Kharkiv streets from the project's Drive («Візуальні матеріали ІМВ / Будинки»), used as illustrations.
    backdrop: '/media/projects/istoriia-moiei-vulytsi/mykolaivskyi-maidan.jpg',
    gallery: [
      { src: '/media/projects/istoriia-moiei-vulytsi/sumska-1901.jpg', alt: 'Сумська вулиця, травень 1901 року: архівна світлина' },
      { src: '/media/projects/istoriia-moiei-vulytsi/mykolaivskyi-maidan.jpg', alt: 'Панорама Миколаївського майдану в 1900-х роках' },
      { src: '/media/projects/istoriia-moiei-vulytsi/moskovskyi-prospekt.jpg', alt: 'Московський проспект (нині проспект Героїв Харкова) на старій листівці' },
      { src: '/media/projects/istoriia-moiei-vulytsi/skovorody.jpg', alt: 'Будинок на вулиці Сковороди: архівна світлина' },
      { src: '/media/projects/istoriia-moiei-vulytsi/chychybabina-1.jpg', alt: 'Житловий будинок на вулиці Чичибабіна: архівна світлина' },
      { src: '/media/projects/istoriia-moiei-vulytsi/chychybabina-9.jpg', alt: 'Вулиця Чичибабіна: архівна панорама забудови' },
      { src: '/media/projects/istoriia-moiei-vulytsi/staromoskovska-98.jpg', alt: 'Будинок на вулиці Старомосковській, 98: фасад і план' }
    ]
    // The project site (my-street.symbol.ngo) is hidden while it is being built; add subsiteUrl back when it opens.
  },
  {
    slug: 'holosy-u-rusi',
    title: 'Голоси у русі',
    yearStart: 2026,
    city: 'Закарпаття',
    kind: 'long',
    status: 'ongoing',
    role: 'organizer',
    formats: ['playback', 'performance'],
    directions: ['art', 'mental-health'],
    tone: 'apricot',
    poster: '/media/events/holosy-u-rusi-uzhhorod/ensemble.jpg',
    motif: 'voices',
    summary: 'Плейбек-театр на Закарпатті: живі історії людей, зіграні тут і зараз.',
    body: [
      'Voices in Motion — проєкт про **плейбек-театр і живі історії на Закарпатті**. Плейбек-театр — інтерактивний театр імпровізації, у якому актори відіграють історії, розказані глядачами під час перформансу.',
      'Перформанси грає плейбек-театр «Серденьки» **в турі Закарпатською областю**: арт-простір «Станція Уж» в Ужгороді, ліцей у селищі Бакош, Берегове. Події проєкту — нижче на сторінці.',
      'Проєкт продовжує роботу «Символу» з плейбек-театром після перформансу [[project:istorii-riznykh]].'
    ],
    // Credits follow the «Culture Helps Solidarity» communication guidelines (culturehelpssolidarity.eu, 2026):
    // the programme disclaimer in every description, the EU emblem unaltered, logos in the order CHS → EU → ECF →
    // Insha Osvita → zusa → VETERANKA, and the EU funding notice on the project page. USER_CONFIRMED 2026-10-29:
    // supported by «Культура допомагає: Солідарність», co-funded by the European Union.
    partners: ['serdenky-playback', 'uzh-station', 'zdybanka', 'khust-theatre'],
    donors: ['culture-helps-solidarity', 'eu', 'ecf', 'insha-osvita', 'zusa', 'veteranka'],
    donorCredit: 'Проєкт «Голоси у русі» реалізується в межах програми «Culture Helps Solidarity / Культура допомагає: Солідарність». «Culture Helps Solidarity / Культура допомагає: Солідарність» — проєкт, що співфінансується Європейським Союзом і реалізується European Cultural Foundation (Амстердам), «Іншою Освітою» (Київ), zusa (Берлін) і рухом VETERANKA (Київ).',
    fundingNotice: 'Фінансується Європейським Союзом. Висловлені погляди та думки належать виключно автору(ам) і не обов’язково відображають позицію Європейського Союзу або Європейського виконавчого агентства з питань освіти та культури (EACEA). Ані Європейський Союз, ані EACEA не несуть відповідальності за них.',
    related: ['istorii-riznykh']
  },
  {
    slug: 'pokazhit-svoi-dokumenty',
    title: 'Покажіть свої документи…',
    yearStart: 2025,
    city: 'Харків',
    kind: 'long',
    status: 'completed',
    role: 'organizer',
    formats: ['exhibition', 'tour', 'discussion'],
    directions: ['art'],
    tone: 'cream',
    motif: 'documents',
    theme: 'documents',
    poster: '/media/projects/pokazhit-svoi-dokumenty/poster.jpg',
    // Served at symbol.ngo/documentsart/ until documentsart.symbol.ngo is connected (deployment.md §4a).
    subsiteUrl: 'https://symbol.ngo/documentsart/',
    summary: 'Виставка про документ як мистецький феномен: 20 митців у ЄрміловЦентрі.',
    body: [
      'Виставка досліджує **документ як мистецький феномен**, що виходить за межі його функціональної ролі. Документ тут — не лише механізм бюрократичного контролю, а й естетичний, ритуальний та соціальний артефакт.',
      'Учасники працювали з фотографією, текстом, живописом, колажем та перформативними практиками. У виставці взяли участь **20 митців**, серед них [[person:pavlo-makov]], [[person:oleh-tistol]] і [[person:roman-piatkovka]].',
      'Це **перший проєкт молодих кураторів** [[person:petro-chekal]] і [[person:yurii-rassokha]] у ЄрміловЦентрі. Виставку супроводжувала програма подій: екскурсії, лекція та дискусії з Центром прав людини ZMINA, артісток і плейбек-перформанс.',
      '**ЄрміловЦентр, Харків, 17 жовтня — 7 грудня 2025 року.**'
    ],
    concept: [
      'У сучасному світі неможливо обійтися без роботи з документами. Документи супроводжують людину фактично від народження і до смерті. Ми звикли сприймати їх як самоочевидну складову соціуму, але документація знаходиться в культурно-історичному контексті, і її варто розглядати як щось плинне та варте критики.',
      'Офіційні документи — це інструменти влади. Вони не просто фіксують реальність, а й конструюють її, визначаючи, хто і як може бути представленим у соціальному просторі.'
    ],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' },
      { person: 'hanna-franyk', role: 'Менеджерка проєкту' },
      { person: 'oleksii-chekal', role: 'Дизайн айдентики та шрифт EXDocument' },
      { person: 'nataliia-ivanova', role: 'Координація від ЄрміловЦентру' },
      { person: 'sofiia-hurilova', role: 'Координація від ЄрміловЦентру' },
      { person: 'pavlo-makov', role: 'Митці' },
      { person: 'oleh-tistol', role: 'Митці' },
      { person: 'roman-piatkovka', role: 'Митці' },
      { person: 'serhii-melnychenko', role: 'Митці' },
      { person: 'oleksii-sai', role: 'Митці' },
      { person: 'volodymyr-kuznietsov', role: 'Митці' },
      { person: 'alina-prokopenko', role: 'Митці' },
      { person: 'andrii-skrypka', role: 'Митці' },
      { person: 'anna-hareieva', role: 'Митці' },
      { person: 'anton-kariuk', role: 'Митці' },
      { person: 'vira-pakosh', role: 'Митці' },
      { person: 'dara-sholokh', role: 'Митці' },
      { person: 'hanna-franyk', role: 'Митці' },
      { person: 'yeva-fomitski', role: 'Митці' },
      { person: 'kinich-azla', role: 'Митці' },
      { person: 'kostiantyn-hlyvlias', role: 'Митці' },
      { person: 'mariia-matiashova', role: 'Митці' },
      { person: 'mariia-prokopenko', role: 'Митці' },
      { person: 'nataliia-okhman', role: 'Митці' },
      { person: 'senora-serpiente', role: 'Митці' }
    ],
    partners: ['yermilov-centre', 'karazin-university', 'zmina', 'nema-playback'],
    donors: ['mincult', 'grynyov-art-foundation'],
    donorCredit: 'Організатори: ГО «Символ», ЄрміловЦентр і Харківський національний університет імені В. Н. Каразіна. Виставка відбулася за фінансової підтримки Міністерства культури України в межах Гранту Президента України для молодих митців та за підтримки Grynyov Art Collection.',
    gallery: [
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-024.jpg', alt: 'Інсталяція: розлітні аркуші документів над кріслом і килимом', credit: 'Олександр Осіпов' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-128.jpg', alt: 'Світлова інсталяція «Документ» Костянтина Гливляса в темному залі', credit: 'Олександр Осіпов' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-104.jpg', alt: 'Глядачка біля манекена в сукні з проєкту «Сучасна мода»', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-176.jpg', alt: 'Виставка в ЄрміловЦентрі — вигляд згори', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/carpet.jpg', alt: 'Інсталяція: килим на стіні, крісло й розлітні аркуші документів', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/plates.jpg', alt: 'Паспорти на тарілках уздовж довгого столу' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/light.jpg', alt: 'Світлова інсталяція в темному залі', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/viewers.jpg', alt: 'Глядачі перед стіною з чорно-білими фотографіями', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/passports-wall.jpg', alt: 'Ряди червоних паспортів на стіні', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/sealed.jpg', alt: 'Бетонний блок із замурованими документами' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/strips.jpg', alt: 'Підвішені прозорі смуги зі світлом і тінями', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/tv.jpg', alt: 'Два телевізори з відеороботами', credit: 'Петро Чекаль' }
    ]
  },
  {
    slug: 'istorii-riznykh',
    title: 'Історії різних',
    yearStart: 2025,
    city: 'Київ',
    kind: 'single',
    status: 'completed',
    role: 'organizer',
    formats: ['playback', 'performance'],
    directions: ['art', 'mental-health'],
    tone: 'plum',
    gallery: [
      { src: '/media/projects/istorii-riznykh/ensemble.jpg', alt: 'Актори плейбек-перформансу «Історії різних» у спільному русі' },
      { src: '/media/projects/istorii-riznykh/ensemble-stage.jpg', alt: 'Актори відіграють історію глядача на сцені «Арсеналу ідей»' },
      { src: '/media/projects/istorii-riznykh/conductor.jpg', alt: 'Кондукторка перформансу біля мікрофона' },
      { src: '/media/projects/istorii-riznykh/reach.jpg', alt: 'Акторки тягнуться одна до одної в сцені' },
      { src: '/media/projects/istorii-riznykh/care.jpg', alt: 'Сцена турботи між акторами' },
      { src: '/media/projects/istorii-riznykh/performance.jpg', alt: 'Плейбек-перформанс «Історії різних»: акторка відіграє історію глядача, решта акторів на сцені' },
      { src: '/media/projects/istorii-riznykh/bow.jpg', alt: 'Актори плейбек-театру і ведуча після перформансу в Арсеналі ідей', people: true },
      { src: '/media/projects/istorii-riznykh/stage.jpg', alt: 'Сцена перформансу: актори в чорному на тлі білої стіни' },
      { src: '/media/projects/istorii-riznykh/scene.jpg', alt: 'Актори відіграють історію глядача' },
      { src: '/media/projects/istorii-riznykh/actress.jpg', alt: 'Акторка в момент гри', people: true },
      { src: '/media/projects/istorii-riznykh/actors-mic.jpg', alt: 'Актор розповідає біля мікрофона, поруч партнерки по сцені', people: true },
      { src: '/media/projects/istorii-riznykh/gesture.jpg', alt: 'Акторка й рухомі фігури позаду неї', people: true }
    ],
    motif: 'curtain',
    summary: 'Плейбек-перформанс, у якому актори відіграли історії глядачів.',
    body: [
      'Плейбек-перформанс **для підлітків і молоді (12–21 рік)** на фестивалі **«Арсенал ідей. Різні разом»** у Мистецькому арсеналі. Плейбек-театр — інтерактивний театр імпровізації: актори грають розповіді глядачів у художній і символічній формі. Це **простір безпеки й діалогу**, де важливим є кожен голос.',
      'Плейбек-театр з 2014 року активно застосовується в Україні як **інструмент психосоціальної підтримки**.',
      'Роботу з плейбек-театром продовжує проєкт [[project:holosy-u-rusi]].'
    ],
    start: '2025-09-20T17:20',
    venue: { name: 'Мистецький арсенал, фестиваль «Арсенал ідей»', city: 'Київ' },
    people: [
      { person: 'yurii-rassokha', role: 'Актор' },
      { person: 'petro-chekal', role: 'Музика' },
      { person: 'hanna-franyk', role: 'Менеджерка' },
      { person: 'olena-mordyk', role: 'Команда проєкту' }
    ],
    related: ['holosy-u-rusi']
  },
  {
    slug: 'mhgap-kyiv',
    title: 'Тренінги mhGAP на Київщині',
    yearStart: 2025,
    city: 'Київська область',
    kind: 'long',
    status: 'completed',
    role: 'organizer',
    formats: ['training'],
    directions: ['mental-health'],
    tone: 'lilac',
    motif: 'breath',
    summary: 'Навчання медпрацівників первинної ланки за програмою ВООЗ з психічного здоров’я.',
    body: [
      'mhGAP — **програма дій ВООЗ** з подолання прогалин у галузі психічного здоров’я на первинній ланці охорони здоров’я.',
      '**З лютого по травень 2025 року** «Символ» провів **чотири тренінги** — три п’ятиденні й один чотириденний — для **медпрацівників первинної ланки Київщини** — сімейних лікарів, медсестер, педіатрів, фельдшерів, терапевтів — з проживанням, харчуванням і посібниками для учасників. Після навчання учасники отримували **онлайн-супервізію** від кваліфікованих спеціалістів.',
      'В Україні досі поширена стигма щодо звернення до фахівців з психічного здоров’я, тож значна частина допомоги людям із психічними, неврологічними розладами та розладами через вживання психоактивних речовин лягає на інших медиків. mhGAP дає їм **навички діагностики й ведення таких станів**.',
      'Кожен тренінг вели **двоє тренерів mhGAP**: [[person:olena-lemeshko]] і [[person:nataliia-opryshko]], [[person:yurii-sich]] і [[person:viktoriia-myroniuk-danko]], [[person:alesia-lysenko]] і [[person:ivan-kutchak]], [[person:ivan-kutchak]] і [[person:olha-klymovska]]. Після тренінгів **усі тренери вели онлайн-супервізії** для своїх учасників. Фотографував [[person:petro-chekal]].',
      'Це **перший грантовий проєкт «Символу»**. Організація — **офіційний партнер ініціативи mhGAP в Україні**. Останній тренінг, на прохання учасників, охопив другу частину програми й відбувся в книгарні-кав’ярні «Сенс» на Хрещатику.'
    ],
    // Trainers by training from Symbol's service contracts and acts (2025); team as credited in the @symbol.ngo post of 26.06.2025.
    partners: ['bila-tserkva-library', 'sens'],
    people: [
      { person: 'yurii-rassokha', role: 'Менеджер проєкту' },
      { person: 'olena-lemeshko', role: 'Тренери' },
      { person: 'nataliia-opryshko', role: 'Тренери' },
      { person: 'yurii-sich', role: 'Тренери' },
      { person: 'viktoriia-myroniuk-danko', role: 'Тренери' },
      { person: 'alesia-lysenko', role: 'Тренери' },
      { person: 'ivan-kutchak', role: 'Тренери' },
      { person: 'olha-klymovska', role: 'Тренери' },
      { person: 'petro-chekal', role: 'Фотограф' }
    ],
    donors: ['mh4u'],
    donorCredit: 'Проєкт реалізовано за донорської підтримки українсько-швейцарського проєкту «Психічне здоров’я для України».',
    programLogo: { src: '/media/projects/mhgap-kyiv/mhgap-logo.svg', name: 'Програма дій ВООЗ із подолання прогалин у сфері психічного здоров’я (mhGAP)' }
  },
  {
    slug: 'ti-khto-pobachyly-svit',
    title: 'Ті, хто побачили світ',
    yearStart: 2026,
    city: 'Мілан',
    country: 'Італія',
    kind: 'single',
    status: 'completed',
    role: 'organizer',
    formats: ['exhibition'],
    directions: ['art'],
    tone: 'apricot',
    gallery: [
      // Mostly Петро Чекаль's exhibited photographs (his archive «Milan/Photo/1. A2»), a few graphic works by Юрій Рассоха
      // (Drive «Мілан (Ті, що побачили світ)», attributed by «Опис робіт Мілан 2026») and photos of the exhibition itself.
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-1.jpg', alt: 'Силуети військових на тлі синього неба', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-4.jpg', alt: 'Постать із прапором України в нічній темряві', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-5.jpg', alt: 'Зграя птахів над деревом', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/work-04.jpg', alt: 'Чорно-біла фотографія: вікно крізь сплетіння гілок', credit: 'Юрій Рассоха' },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-7.jpg', alt: 'Річка з висоти: графічний чорно-білий візерунок', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-8.jpg', alt: 'Багатоповерхівка й люди на стежці серед зелені', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/exhibition.jpg', alt: 'Роботи виставки на стендах у залі в Мілані' },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-2.jpg', alt: 'Засніжений пейзаж із деревами й будинком', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-3.jpg', alt: 'Бірюзова вода крупним планом', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/work-14.jpg', alt: 'Графічна фотографія: силует на тлі місяця', credit: 'Юрій Рассоха' },
      { src: '/media/projects/ti-khto-pobachyly-svit/talk.jpg', alt: 'Розмова на відкритті виставки в Мілані', people: true },
      { src: '/media/projects/ti-khto-pobachyly-svit/petro-9.jpg', alt: 'Степовий пагорб під хмарним небом', credit: 'Петро Чекаль' },
      { src: '/media/projects/ti-khto-pobachyly-svit/audience.jpg', alt: 'Глядачі на відкритті', people: true },
      { src: '/media/projects/ti-khto-pobachyly-svit/work-label.jpg', alt: 'Фотографія Петра Чекаля з підписом трьома мовами' }
    ],
    motif: 'aperture',
    summary: 'Фотовиставка Петра Чекаля та Юрія Рассохи на Фестивалі української книги в Мілані.',
    body: [
      'The Ones Who Saw the World / Coloro che hanno visto il mondo — **довге й уважне спостереження за Україною** в часі змін. Світлини зроблені майже в усіх регіонах країни: у містах, селах, на околицях, у просторах повсякдення й у місцях, позначених війною. Разом вони складають не географічну мапу, а **внутрішній портрет країни**.',
      'Проєкт водночас досліджує саму фотографію: колір, ритм, фактуру й композицію — як фотографічна мова може не лише фіксувати реальність, а й інтерпретувати її. На фестивалі показали **20 робіт**.',
      '**Фестиваль української книги в Мілані**, Villa Scheibler, **30–31 травня 2026 року**, на запрошення асоціації Ucraina Più – Milano APS. Виставку **вперше показали за кордоном**, роботи можна було придбати.',
      'На виставці роботи двох авторів представлені на рівних: професійного фотографа [[person:petro-chekal]], члена Української асоціації професійних фотографів і школи фотографії MYPH, та мистецького куратора й проєктного менеджера [[person:yurii-rassokha]], який лише відкриває для себе фотографію. Обидва спостерігають за світом навколо: війною, людьми, природою та побутом.'
    ],
    people: [
      { person: 'petro-chekal', role: 'Автори фотографій' },
      { person: 'yurii-rassokha', role: 'Автори фотографій' }
    ],
    partners: ['ucraina-piu'],
    start: '2026-05-30',
    end: '2026-05-31',
    venue: { name: 'Villa Scheibler', city: 'Мілан', country: 'Італія' }
  },
  {
    slug: '2-10-300',
    title: '2, 10, 300 років потому',
    yearStart: 2024,
    city: 'Балашадьярмат',
    country: 'Угорщина',
    kind: 'single',
    status: 'completed',
    role: 'organizer',
    formats: ['exhibition'],
    directions: ['art'],
    tone: 'apricot',
    poster: '/media/projects/2-10-300/cover.jpg',
    motif: 'time',
    summary: 'Виставка просто неба з роботами митців зі сходу України.',
    body: [
      '**Перша виставка «Символу»** — просто неба на площі Civitas Fortissima в **Балашшадьярматі, Угорщина**, приурочена до **десятиліття окупації Донецька**. Роботи митців зі сходу України, насамперед Харківщини й Донеччини, розповідали жителям містечка про **незламність українського мистецтва** часів війни.',
      'Ми помітили, що в невеликих угорських містах мало знають про Україну, але цікавляться українським мистецтвом; контакт з українською культурою — важлива підтримка євроінтеграції України.',
      'Кураторка — [[person:hanna-franyk]]. Митці: [[person:alla-pasichnyk]] (акварелі, ікона святого Миколая), [[person:olena-mordyk]] (ескізи «вихід ні»), [[person:magran-tata]] (піксель-арт), [[person:petro-chekal]] (фотосерії «Між тінню і світлом» та «Інші світи» — з кладовища розстріляних автомобілів у Бучі), [[person:ruslana-kliuchko]] (суха голка «Розмиваючи межу»), [[person:yurii-rassokha]] (фотографії «За мотивами Г. Крюдсона», «Сутінки»).',
      'Виставка відбулася в межах волонтерства **Європейського корпусу солідарності** у співпраці з ГО «Символ».'
    ],
    partners: ['egyesek', 'arteria', 'union-forum'],
    people: [
      { person: 'hanna-franyk', role: 'Кураторка' },
      { person: 'petro-chekal', role: 'Співавтор проєкту' },
      { person: 'yurii-rassokha', role: 'Асистент кураторки' },
      { person: 'alla-pasichnyk', role: 'Митці' },
      { person: 'olena-mordyk', role: 'Митці' },
      { person: 'magran-tata', role: 'Митці' },
      { person: 'petro-chekal', role: 'Митці' },
      { person: 'ruslana-kliuchko', role: 'Митці' },
      { person: 'yurii-rassokha', role: 'Митці' }
    ],
    start: '2024-04-26',
    end: '2024-04-28',
    venue: { city: 'Балашадьярмат', country: 'Угорщина' }
  },
  {
    slug: 'kharkivske-more',
    title: 'Харківське море 2024',
    yearStart: 2024,
    city: 'Харків',
    kind: 'long',
    status: 'completed',
    role: 'partner',
    formats: ['festival'],
    directions: ['culture', 'art'],
    tone: 'plum',
    cardBanner: { src: '/media/projects/kharkivske-more/banner.jpg', name: 'Айдентика фестивалю «Харківське море»: риба, хвилі й човни', background: 'linear-gradient(#b1d6d3, #96cad7)' },
    motif: 'sea',
    summary: 'Незалежний мультидисциплінарний фестиваль локальної культури. «Символ» — партнер фестивалю.',
    body: [
      'Фестиваль досліджує **ідентичність Харкова в умовах війни** й працює з темами міської ідентичності, пам’яті та досвіду через мистецькі практики.',
      '«Символ» — **партнер фестивалю**, не організатор. Про фестиваль 2026 року — [[project:kharkivske-more-2026]].'
    ]
  },
  {
    // Facts from the festival's 2026 folder on the Symbol Drive (contracts and the SMM plan); not a Symbol project.
    slug: 'kharkivske-more-2026',
    title: 'Харківське море 2026',
    yearStart: 2026,
    start: '2026-08-14',
    end: '2026-08-23',
    city: 'Харків',
    kind: 'single',
    status: 'completed',
    role: 'partner',
    formats: ['festival'],
    directions: ['culture', 'art'],
    tone: 'violet',
    cardBanner: { src: '/media/projects/kharkivske-more/banner.jpg', name: 'Айдентика фестивалю «Харківське море»: риба, хвилі й човни', background: 'linear-gradient(#b1d6d3, #96cad7)' },
    motif: 'sea',
    summary: 'Фестиваль локальної культури 2026 року. Партнерський проєкт: організатор — ГО «Платформа театральних ініціатив».',
    body: [
      '**Фестиваль локальної культури «Харківське море»** 2026 року — виставки, воркшопи, вистави, плейбек-перформанси, лекції й концерти в Харкові в **серпні 2026**.',
      'Це **не проєкт «Символу»**, а партнерський: фестиваль організовує **ГО «Платформа театральних ініціатив»** за гранту European Cultural Foundation у межах проєкту «Культура допомагає: Солідарність», що співфінансується Європейським Союзом. «Символ» — партнер фестивалю.',
      'Попередній фестиваль, у якому «Символ» був партнером, — [[project:kharkivske-more]].'
    ],
    donors: ['culture-helps-solidarity', 'eu', 'ecf', 'insha-osvita', 'zusa', 'veteranka']
  },
  {
    slug: 'zbyrach-konvalii',
    title: 'Збирач конвалій',
    yearStart: 2023,
    city: 'Харків',
    kind: 'long',
    status: 'completed',
    role: 'organizer',
    formats: ['film'],
    directions: ['art'],
    tone: 'plum',
    gallery: [
      { src: '/media/projects/zbyrach-konvalii/title.jpg', alt: 'Титр фільму «Збирач конвалій» на кадрі з квартири фотографа' },
      { src: '/media/projects/zbyrach-konvalii/archive.jpg', alt: 'Кадр із фільму: фотограф гортає свої знімки' },
      { src: '/media/projects/zbyrach-konvalii/silhouette.jpg', alt: 'Кадр із фільму: силует у кімнаті з червоним світлом' },
      { src: '/media/projects/zbyrach-konvalii/room.jpg', alt: 'Кадр із фільму: стіна з фотографіями й предметами' },
      { src: '/media/projects/zbyrach-konvalii/newspapers.jpg', alt: 'Кадр із фільму: газети й знімки з архіву' }
    ],
    motif: 'film',
    summary: 'Документальний фільм про фотографа Харківської школи фотографії Олександра Супруна.',
    body: [
      'Фільм розповідає про **Олександра Супруна** — одного з найвизначніших представників **Харківської школи фотографії**, пенсіонера, викладача й митця, який мешкає у спальному районі Харкова. Його буденність — перевірка лічильників, дистанційні заняття зі студентами й новини про війну. Та він вирішує поділитися мистецьким досвідом: як обирав героїв своїх робіт, як творив у часи радянської цензури, що робить мистецтво довговічним.',
      'Мета фільму — **популяризація харківського мистецтва** та його творців. **90% фільму знято ручною камерою**.',
      'Нагорода: **найкраща операторська робота** на практичному курсі зі створення документального кіно від Media Development Foundation.'
    ],
    // Supporters as credited in «Опис проєкту Збирач конвалій» (Drive): Gwara Media, Media Development Foundation (the film was made in its programme), Grynyov Art Collection, MOKSOP.
    partners: ['moksop', 'gwara-media'],
    donors: ['media-development-foundation', 'grynyov-art-foundation'],
    people: [
      { person: 'petro-chekal', role: 'Продюсер, оператор' },
      { person: 'vero-yuzepchuk', role: 'Режисерка' },
      { person: 'ivan-samoilov', role: 'Оператор' },
      { person: 'maksym-koval', role: 'Звукорежисер' },
      { person: 'diana-horbenko', role: 'Дизайнерка' }
    ]
  }
]

// Order everywhere on the site: newest year first; within a year, donor-funded projects lead, then long projects,
// then one-off events (USER_CONFIRMED 2026-10-29).
const weight = (project: Project) => (project.donors?.length ? 0 : 2) + (project.kind === 'single' ? 1 : 0)
export const projects: Project[] = entries.sort((a, b) => b.yearStart - a.yearStart || weight(a) - weight(b))
