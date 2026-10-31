export interface ProjectEn {
  title: string
  summary: string
  body: string[]
  concept?: string[]
  donorCredit?: string
  fundingNotice?: string
  programName?: string
}

// English project copy is kept separate so both language versions remain editorially independent.
export const projectsEn: Record<string, ProjectEn> = {
  'istoriia-moiei-vulytsi': {
    title: 'The Story of My Street',
    summary: 'Plaques with QR codes on Kharkiv streets and a page for every street: the stories the city tells about itself.',
    body: [
      'The project collects the **stories of Kharkiv streets**. **Plaques with QR codes** will appear in the city and lead to individual street pages on the project website.',
      'All texts are reviewed by an **expert council**. A dedicated project website with its own structure and visual identity is currently in development.'
    ],
    donorCredit: 'The project won the competitive selection of the President of Ukraine’s Tysiachovesna initiative. Donors: Ministry of Culture of Ukraine, Tysiachovesna, and the Centre for the Protection of Ukraine’s Information Space.'
  },
  'holosy-u-rusi': {
    title: 'Voices in Motion',
    summary: 'Playback theatre in Zakarpattia: real people’s stories, played back here and now.',
    body: [
      'Voices in Motion is a project about **playback theatre and lived stories in Zakarpattia**. Playback theatre is an interactive form of improvisational theatre in which actors perform stories shared by audience members during the event.',
      'The Serdenky playback theatre company presents the performances during a **tour of Zakarpattia Oblast**: at Station Uzh art space in Uzhhorod, a lyceum in Bakosh, and in Berehove. The project events are listed below.',
      'The project continues Symbol’s work with playback theatre following [[project:istorii-riznykh|Stories of Different People]].'
    ],
    donorCredit: 'Voices in Motion is implemented within Culture Helps Solidarity. Culture Helps Solidarity is co-funded by the European Union and implemented by the European Cultural Foundation (Amsterdam), Insha Osvita (Kyiv), zusa (Berlin), and the VETERANKA movement (Kyiv).',
    fundingNotice: 'Funded by the European Union. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.'
  },
  'pokazhit-svoi-dokumenty': {
    title: 'May I See Your Documents?..',
    summary: 'An exhibition about the document as an artistic phenomenon: 20 artists at YermilovCentre.',
    body: [
      'The exhibition explores the **document as an artistic phenomenon** that extends beyond its functional role. Here, a document is not merely a mechanism of bureaucratic control, but also an aesthetic, ritual, and social artefact.',
      'The participants worked with photography, text, painting, collage, and performative practices. The exhibition brought together **20 artists**, including [[person:pavlo-makov]], [[person:oleh-tistol]], and [[person:roman-piatkovka]].',
      'This was the **first project by young curators** [[person:petro-chekal]] and [[person:yurii-rassokha]] at YermilovCentre. The exhibition was accompanied by tours, a lecture and discussions with the ZMINA Human Rights Centre, an artist talk, and a playback performance.',
      '**YermilovCentre, Kharkiv, 17 October — 7 December 2025.**'
    ],
    concept: [
      'In the contemporary world, it is impossible to avoid dealing with documents. They accompany a person from birth to death. We are used to seeing them as a self-evident part of society, yet documentation exists within a cultural and historical context and should be understood as fluid and open to criticism.',
      'Official documents are instruments of power. They do not simply record reality; they construct it, determining who can be represented in social space and how.'
    ],
    donorCredit: 'Organisers: NGO Symbol, YermilovCentre, and V. N. Karazin Kharkiv National University. Donors: Ministry of Culture of Ukraine (President of Ukraine Grant for Young Artists) and Grynyov Art Collection.'
  },
  'istorii-riznykh': {
    title: 'Stories of Different People',
    summary: 'A playback performance in which actors played back the audience’s own stories.',
    body: [
      'A playback performance **for teenagers and young people aged 12–21** at the Arsenal of Ideas: Different Together festival at Mystetskyi Arsenal. Playback theatre is an interactive form of improvisational theatre: actors transform audience members’ stories into artistic and symbolic scenes. It creates a **space of safety and dialogue** where every voice matters.',
      'Since 2014, playback theatre has been actively used in Ukraine as a **tool for psychosocial support**.',
      'This work with playback theatre continues in [[project:holosy-u-rusi|Voices in Motion]].'
    ]
  },
  'mhgap-kyiv': {
    title: 'mhGAP Trainings in Kyiv Region',
    summary: 'Training primary care workers in the WHO mental health programme.',
    body: [
      'mhGAP is the **World Health Organization’s Mental Health Gap Action Programme** for addressing gaps in mental health care at the primary-care level.',
      '**From February to May 2025**, Symbol delivered **four training courses**—three five-day courses and one four-day course—for **primary health-care workers from Kyiv Region**, including family doctors, nurses, paediatricians, paramedics, and general practitioners. Accommodation, meals, and training manuals were provided. After the courses, participants received **online supervision** from qualified specialists.',
      'Stigma around seeking mental health support remains widespread in Ukraine, so much of the care for people with mental, neurological, and substance-use conditions falls to other health professionals. mhGAP equips them with **skills to identify and manage these conditions**.',
      'Each course was led by **two mhGAP trainers**: [[person:olena-lemeshko]] and [[person:nataliia-opryshko]], [[person:yurii-sich]] and [[person:viktoriia-myroniuk-danko]], [[person:alesia-lysenko]] and [[person:ivan-kutchak]], and [[person:ivan-kutchak]] and [[person:olha-klymovska]]. Following the courses, **all trainers provided online supervision** for their groups. The Bila Tserkva sessions were photographed by [[person:yurii-rassokha]], and the Kyiv sessions by [[person:petro-chekal]].',
      'This was **Symbol’s first grant-funded project**. The organisation is an **official partner of the mhGAP initiative in Ukraine**. At participants’ request, the final course covered the programme’s second part and took place at the Sens bookshop-café on Khreshchatyk Street.'
    ],
    donorCredit: 'Donor: the Swiss-Ukrainian project Mental Health for Ukraine.',
    programName: 'WHO Mental Health Gap Action Programme (mhGAP)'
  },
  'ti-khto-pobachyly-svit': {
    title: 'Those Who Have Seen the World',
    summary: 'A photo exhibition by Petro Chekal and Yurii Rassokha at the Festival of Ukrainian Books in Milan.',
    body: [
      'The Ones Who Saw the World / Coloro che hanno visto il mondo is a **long and attentive observation of Ukraine** through a period of change. The photographs were made in almost every region of the country—in cities, villages, outskirts, everyday spaces, and places marked by war. Together they form not a geographical map but an **inner portrait of the country**.',
      'The project also examines photography itself: colour, rhythm, texture, and composition—and how photographic language can interpret reality rather than merely record it. The festival presented **20 works**.',
      '**Festival of Ukrainian Books in Milan**, Villa Scheibler, **30–31 May 2026**, at the invitation of Ucraina Più – Milano APS. This was the exhibition’s **first presentation abroad**, and the works were available for purchase.',
      'Works by both authors were presented on equal terms: professional photographer [[person:petro-chekal]], a member of the Ukrainian Association of Professional Photographers and the MYPH photography school, and art curator and project manager [[person:yurii-rassokha]], who is only beginning to explore photography. Both observe the world around them: war, people, nature, and everyday life.'
    ]
  },
  '2-10-300': {
    title: '2, 10, 300 Years Later',
    summary: 'An open-air exhibition of works by artists from eastern Ukraine.',
    body: [
      '**Symbol’s first exhibition** took place outdoors in Civitas Fortissima Square in **Balassagyarmat, Hungary**, and marked **ten years since the occupation of Donetsk**. Works by artists from eastern Ukraine—particularly Kharkiv and Donetsk regions—told local residents about the **resilience of Ukrainian art** during wartime.',
      'We noticed that people in smaller Hungarian cities knew little about Ukraine but were interested in Ukrainian art. Contact with Ukrainian culture is an important contribution to Ukraine’s European integration.',
      'Curator: [[person:hanna-franyk|Ana Franyk]]. Artists: [[person:alla-pasichnyk]] (watercolours and an icon of Saint Nicholas), [[person:olena-mordyk]] (sketches from No Exit), [[person:magran-tata]] (pixel art), [[person:petro-chekal]] (the photo series Between Shadow and Light and Other Worlds, made at the cemetery of shot civilian cars in Bucha), [[person:ruslana-kliuchko]] (the drypoint Blurring the Boundary), and [[person:yurii-rassokha]] (the photographs After G. Crewdson and Twilight).',
      'The exhibition was produced within a **European Solidarity Corps** volunteering project in cooperation with NGO Symbol.'
    ]
  },
  'kharkivske-more': {
    title: 'Kharkiv Sea 2024',
    summary: 'An independent multidisciplinary festival of local culture. Symbol is a partner of the festival.',
    body: [
      'The festival explores **Kharkiv’s identity during wartime**, working with urban identity, memory, and lived experience through artistic practices.',
      'Symbol is a **festival partner**, not the organiser. See also the [[project:kharkivske-more-2026|2026 festival]].'
    ]
  },
  'kharkivske-more-2026': {
    title: 'Kharkiv Sea 2026',
    summary: 'The 2026 festival of local culture. A partner project organised by the NGO Platform of Theatre Initiatives.',
    body: [
      'The **Kharkiv Sea local culture festival** returned in August 2026 with exhibitions, workshops, theatre productions, playback performances, lectures, and concerts across Kharkiv.',
      'This is **not a Symbol project**, but a partnership project organised by the **NGO Platform of Theatre Initiatives** with a European Cultural Foundation grant through Culture Helps Solidarity, co-funded by the European Union. Symbol is a festival partner.',
      'The previous festival in which Symbol participated as a partner is [[project:kharkivske-more|Kharkiv Sea 2024]].'
    ]
  },
  'zbyrach-konvalii': {
    title: 'The Lily of the Valley Collector',
    summary: 'A documentary about Oleksandr Suprun, a photographer of the Kharkiv School of Photography.',
    body: [
      'The film tells the story of **Oleksandr Suprun**, one of the most prominent representatives of the **Kharkiv School of Photography**—a retired teacher and artist living in a residential district of Kharkiv. His everyday life consists of checking utility meters, teaching students remotely, and following the news of the war. He decides to share his artistic experience: how he chose the subjects of his works, how he created under Soviet censorship, and what makes art endure.',
      'The film aims to **promote Kharkiv art** and its creators. **Ninety per cent of the film was shot handheld.**',
      'Award: **Best Cinematography** at the Media Development Foundation’s practical documentary filmmaking course.'
    ]
  }
}
