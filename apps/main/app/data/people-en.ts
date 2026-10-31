import type { CvSection } from './types'

export interface PersonEn { name: string; shortBio?: string; bio?: string[]; teamRole?: string; cv?: CvSection[] }

// English public-facing names and concise biographies for profiles not covered by the approved PSD catalogue copy.
export const peopleEn: Record<string, PersonEn> = {
  'yurii-rassokha': { name: 'Yurii Rassokha', teamRole: 'Chair of the organisation', shortBio: 'Chair of NGO Symbol; cultural project manager, cultural studies specialist, curator, and photographer from Kharkiv.' },
  'petro-chekal': { name: 'Petro Chekal', teamRole: 'Deputy Chair', shortBio: 'Documentary and conceptual photographer, curator, cinematographer, and producer (born 2001 in Kharkiv); member of the Ukrainian Association of Professional Photographers.' },
  'hanna-franyk': { name: 'Ana Franyk (Alina Voitiuk)', shortBio: 'Art manager, interdisciplinary artist, and facilitator of peer-support groups.' },
  'olena-mordyk': { name: 'Olena Mordyk', shortBio: 'Playback theatre actor, performer, cultural project manager, and interdisciplinary artist. At Symbol, she leads communications for The Story of My Street.' },
  'andrii-skrypka': { name: 'Andrii Skrypka', shortBio: 'Interdisciplinary artist and designer born in Kerch, Crimea.' },
  'vira-pakosh': { name: 'Vira Pakosh', shortBio: 'Interdisciplinary artist working with perceptions of reality, memory, and recollection.' },
  'nataliia-ivanova': { name: 'Nataliia Ivanova', shortBio: 'Curator and educator; founder and director of YermilovCentre in Kharkiv and recipient of the 2026 Igor Zabel Award.' },
  'sofiia-hurilova': { name: 'Sofiia Hurilova', shortBio: 'YermilovCentre coordinator for May I See Your Documents?..' },
  'oleksii-chekal': { name: 'Oleksii Chekal', shortBio: 'Graphic designer, type designer, and calligrapher; co-author of the national typeface Zakon and creator of the exhibition identity and EXDocument typeface for May I See Your Documents?..' },
  'larysa-chaika': { name: 'Larysa Chaika', teamRole: 'Co-founder and Board member', shortBio: 'Graphic artist, graphic designer, and lecturer at the Kharkiv State Academy of Design and Arts; lead illustrator for The Story of My Street.' },
  'maksym-rozenfeld': { name: 'Maksym Rozenfeld', shortBio: 'Architect, architectural historian, Kharkiv researcher, author of Facades: Kharkiv, and chair of the expert council for The Story of My Street.' },
  'vero-yuzepchuk': { name: 'Veronika Yuzepchuk', shortBio: 'Director of the 2023 documentary The Lily of the Valley Collector.' },
  'ivan-samoilov': { name: 'Ivan Samoilov', shortBio: 'Documentary photographer and videographer from Kharkiv (born 2002); cinematographer of The Lily of the Valley Collector.' },
  'maksym-koval': { name: 'Maksym Koval', shortBio: 'Sound engineer of the 2023 documentary The Lily of the Valley Collector.' },
  'diana-horbenko': { name: 'Diana Horbenko', shortBio: 'Designer and researcher; production designer of The Lily of the Valley Collector.' },
  'alla-pasichnyk': { name: 'Alla Pasichnyk', shortBio: 'Artist from Dnipro working in watercolour, oil painting, and icon painting.' },
  'magran-tata': { name: 'Magran Tata', shortBio: 'Pixel-art artist.' },
  'ruslana-kliuchko': { name: 'Ruslana Kliuchko', shortBio: 'Multidisciplinary artist (born 2002) working with artist’s books, printmaking, photography, objects, and installation.' },
  'ivan-kutchak': { name: 'Ivan Kutchak', shortBio: 'Trainer and supervisor for the WHO mhGAP programme.' },
  'olha-klymovska': { name: 'Olha Klymovska', shortBio: 'Psychologist, trainer, and supervisor for the WHO mhGAP programme.' },
  'olena-lemeshko': { name: 'Olena Lemeshko', shortBio: 'Trainer and supervisor for the WHO mhGAP programme.' },
  'nataliia-opryshko': { name: 'Nataliia Opryshko', shortBio: 'Trainer and supervisor for the WHO mhGAP programme.' },
  'yurii-sich': { name: 'Yurii Sich', shortBio: 'Trainer and supervisor for the WHO mhGAP programme.' },
  'viktoriia-myroniuk-danko': { name: 'Viktoriia Myroniuk-Danko', shortBio: 'Trainer and supervisor for the WHO mhGAP programme.' },
  'alesia-lysenko': { name: 'Alesia Lysenko', shortBio: 'Trainer and supervisor for the WHO mhGAP programme.' }
}

// Full English biographies and CVs: translations of the Ukrainian texts in people.ts, kept in step with them
// (the sync check compares the two versions of every page). Only facts present in the Ukrainian original.
const peopleBioEn: Record<string, { bio?: string[]; cv?: CvSection[] }> = {
  'yurii-rassokha': {
    bio: [
      'Yurii Rassokha is a co-founder of NGO Symbol and has chaired it since October 2023. A manager of cultural projects and events, a cultural studies specialist, a curator and a photographer from Kharkiv. He has run donor-funded projects through the full cycle — from the grant application and budget to procurement, reporting and a successful external audit — and coordinates work with state institutions, NGOs and international donors.',
      'He holds a bachelor’s degree in Cultural Project Management and Visual Art (2024) and a master’s degree in Cultural Studies (2025) from V. N. Karazin Kharkiv National University. He completed the basic course of the Ukrainian School of Playback Theatre with a module for trainers of teenage groups (2024) and International Organization for Migration training in community-based mental health and psychosocial support (2025).',
      'Co-curator and manager of the exhibition [[project:pokazhit-svoi-dokumenty]] — 20 artists and 21 works in photography, installation, video, text, food and textile; the exhibition grew out of his research “Record-keeping as a Ritual: a Cultural Analysis”. Project manager of the [[project:mhgap-kyiv|mhGAP trainings in Kyiv Region]]: four trainings of four to five days each; 121 primary health-care workers received certificates.',
      'Before Symbol he worked as an assistant on donor projects of the NGO Proliska — mhGAP trainings with supervision support and psychological first aid (2022–2023). With the NGO Troubadours he gave online lectures for participants of the open call of the exhibition Say Tree in Warsaw (2023) and co-organised the festival A Day at the Sviatopolk-Mirsky Estate in Liubotyn (2024); he took part in organising the [[project:kharkivske-more]] festival (2024). As a teenager he led the Winter Film School, a video course for children from Donetsk and Luhansk regions (2017). Since 2026 he has been an events manager at the Kyiv Global Government Technology Centre.',
      'As a photographer, together with [[person:petro-chekal]], he showed the exhibition [[project:ti-khto-pobachyly-svit]] in Milan (2026). He took part in the exhibitions Fleuraison de Kharkiv at the CAPV gallery in Lille (2024) and [[project:2-10-300]] in Hungary (2024).'
    ],
    cv: [
      { title: 'Education', items: [
        { period: '2024–2025', text: 'Master’s degree, Cultural Studies programme, V. N. Karazin Kharkiv National University' },
        { period: '2020–2024', text: 'Bachelor’s degree, Cultural Project Management and Visual Art, V. N. Karazin Kharkiv National University' }
      ] },
      { title: 'Experience', items: [
        { period: 'since 10/2023', text: 'Chair of NGO Symbol' },
        { period: '06–12/2025', text: 'Project manager and co-curator of the exhibition May I See Your Documents?.., YermilovCentre, Kharkiv (Grant of the President of Ukraine for Young Artists)' },
        { period: '12/2024–09/2025', text: 'Project manager of the mhGAP trainings in Kyiv Region (supported by the Mental Health for Ukraine project): four in-person trainings, 121 certified participants' },
        { period: '08/2024', text: 'Co-organiser of the festival A Day at the Sviatopolk-Mirsky Estate, Liubotyn (NGO Troubadours)' },
        { period: '04–06/2024', text: 'Took part in organising the local culture festival Kharkiv Sea (NGO Symbol was a festival partner)' },
        { period: '03/2022–04/2023', text: 'Project assistant for mhGAP and psychological first aid trainings, NGO Proliska' },
        { period: '03/2023', text: 'Online lecturer for participants of the open call of the exhibition Say Tree, Warsaw (NGO Troubadours)' },
        { period: '01/2017', text: 'Instructor at the Winter Film School for teenagers from Donetsk and Luhansk regions (NGO Ukrainian Frontiers)' }
      ] },
      { title: 'Exhibitions', items: [
        { period: '05/2026', text: 'Those Who Have Seen the World, Villa Scheibler, Festival of Ukrainian Books in Milan — photographer' },
        { period: '10–12/2025', text: 'May I See Your Documents?.., YermilovCentre, Kharkiv — co-curator, project manager' },
        { period: '04/2024', text: '2, 10, 300 Years Later, Balassagyarmat, Hungary — participant' },
        { period: '03/2024', text: 'Fleuraison de Kharkiv, CAPV gallery, Lille, France — participant (curated by Yevseviia Ziakina)' }
      ] },
      { title: 'Training', items: [
        { period: '01/2025', text: 'IOM: community-based mental health and psychosocial support' },
        { period: '09–11/2024', text: 'Ukrainian School of Playback Theatre, basic course (54 hours)' }
      ] }
    ]
  },
  'petro-chekal': {
    bio: [
      'Petro Chekal (born 2001, Kharkiv) is a Ukrainian photographer, artist, musician, curator and cultural studies scholar. He works with documentary and conceptual photography and documentary film, combining visual practice with theoretical research into culture, photography and literature. Since 2023 he has been Deputy Chair of NGO Symbol. Member of the [Ukrainian Association of Professional Photographers](https://www.ukrainianphotographers.com/en/photographers/petro-chekal) (UAPP).',
      'He has been taking photographs since 2013; he began as a street photographer and wrote a study of patterns of seeing in street photography. He holds a bachelor’s degree in Cultural Studies (Visual Art and Cultural Project Management) and a master’s degree in Cultural Studies from V. N. Karazin Kharkiv National University. He studied at Chekachkov Academy and at the MYPH School of Conceptual and Art Photography with Serhii Melnychenko.',
      'In the first weeks of the full-scale invasion he stayed with his family in Kharkiv and photographed their life under shelling; the series was published by Ukraїner as [“The First 42 Days of the Full-Scale War. A Photographer’s Diary”](https://www.ukrainer.net/shchodennyk-fotohrafa/) (2022). As a photographer he has worked for Ukraїner, New York Magazine, the BBC, UNICEF and the Council of Europe; among other things, he photographed the protests in Kyiv in summer 2025.',
      'His work has been shown at PinchukArtCentre (Kyiv), Kunstraum Kreuzberg/Bethanien (Berlin), YermilovCentre (Kharkiv), the Dzyga gallery (Lviv), the Ukrainian House (Kyiv, the exhibition Spalakh, 2022), Hudprom (Kharkiv), and in Palermo, Lille, Paris and New York. His solo exhibition Looking for Home took place at Dzyga (2022). The project RUKH, about movement, balance and rhythm, grew out of courses at the Khvylia art association.',
      'Curatorial projects: The Ceramist (Hudprom, 2021), Roots (Dzyga, 2022), an exhibition at the Khvylia space (Lviv, 2024), co-organisation of PHOTORUKH (2024), [[project:pokazhit-svoi-dokumenty]] (2025). Producer and cinematographer of the film [[project:zbyrach-konvalii]] — best cinematography award from the Media Development Foundation (2023); co-author of the project [[project:2-10-300]]. Recipient of the 2024 Grant of the President of Ukraine for Young Artists.'
    ],
    cv: [
      { title: 'Education', items: [
        { text: 'Master’s degree in Cultural Studies, V. N. Karazin Kharkiv National University' },
        { period: '2020–2023', text: 'Bachelor’s degree, Cultural Studies: Visual Art and Cultural Project Management, V. N. Karazin Kharkiv National University' },
        { text: 'Chekachkov Academy; MYPH educational programme; ArtHub cinematography course' }
      ] },
      { title: 'Curating', items: [
        { period: '2025', text: 'May I See Your Documents?.., YermilovCentre, Kharkiv' },
        { period: '2024', text: 'Co-organisation of PHOTORUKH, Lviv; exhibition at the Khvylia space, Lviv' },
        { period: '2022', text: 'Roots, Dzyga, Lviv — debut of the Roots photographers’ association; Looking for Home' },
        { period: '2021', text: 'The Ceramist, Hudprom, Kharkiv — about Volodymyr Shapovalov, with the premiere of a documentary film' }
      ] },
      { title: 'Photography and film', items: [
        { period: '2026', text: 'Those Who Have Seen the World, Milan — photographer (with Yurii Rassokha)' },
        { period: '2023', text: 'The Lily of the Valley Collector — producer and cinematographer; best cinematography award from the Media Development Foundation' },
        { text: 'Exhibitions in Palermo, Lille, Paris, New York; publications in New York Magazine, Spalakh, Uncommon' }
      ] },
      { title: 'Awards', items: [
        { period: '2024', text: 'Grant of the President of Ukraine for Young Artists — for the project May I See Your Documents?..' }
      ] }
    ]
  },
  'olena-mordyk': {
    bio: [
      'Actor and musician of the Nema playback theatre (since 2023), previously an actor of the More Nocturne (2020–2021) and Nomads (2022–2025) theatres. Organiser of the local culture festival [[project:kharkivske-more]] (2024–2025) and curator of an exhibition within it. A graduate of the Kharkiv State Academy of Design and Arts (Faculty of Graphic Arts, 2021); as an illustrator she worked with the ASSA publishing house on the collections Outstanding Ukrainians and Myths of Ukraine.',
      'She took part in Symbol’s first exhibition, [[project:2-10-300]], in Balassagyarmat (Hungary, 2024) with the series of sketches “vykhid ni” (2023–2024) — a reflection on how to be at home in the absence of light and energy in every sense. The series was made during the 2023 blackout in Kyiv and completed on the eve of the 2024 blackout in Kharkiv. The title is a play on words: “vykhidni” (weekend) and “vykhid ni” (no way out).',
      'A fellow of the Goethe-Institut in Ukraine’s Cultural Resistance programme: she carried out the project For Teenagers in Kharkiv’s Districts (2025).',
      'At Symbol she works on communications for [[project:istoriia-moiei-vulytsi]]; she took part in [[project:istorii-riznykh]].'
    ],
    cv: [
      { title: 'Curatorial and organisational work', items: [
        { period: '2025', text: 'Performances for Teenagers across the Regions, a project of the Nema theatre with Codeit4Life, Kharkiv Region' },
        { period: '2024–2025', text: 'Organisation of the local culture festival Kharkiv Sea, Kharkiv' },
        { period: '2024', text: 'Curating an exhibition within the Kharkiv Sea festival, Druk, Kharkiv' },
        { period: '2024', text: 'The project Wandering the Forest, about forests as places of danger, Druk, Kharkiv' },
        { period: '2024', text: 'The project Tales of Sorcerers, a continuation of the project Tales for Bomb Shelters, Kharkiv / Kraków' },
        { period: '2023–2025', text: 'Organising performances for the Nomads (Vasenthien) and Nema (Kyiv / Kharkiv) theatres' }
      ] },
      { title: 'Nema theatre (actor and musician, 2023–2026)', items: [
        { period: '2025–2026', text: 'Playback performances at Kharkiv Pride Hub for the LGBTQ+ community, Kharkiv' },
        { period: '2025', text: 'Playback performance within the exhibition May I See Your Documents?.., YermilovCentre, Kharkiv' },
        { period: '2025', text: 'Post-documentary performance Ukraine.pov Stage version, YermilovCentre, Kharkiv' },
        { period: '2025', text: 'Playback performance The Glass Tower within the festival Kharkiv: Cultural, Municipal Gallery, Kharkiv' },
        { period: '2024–2025', text: 'A series of research performances on urban identity within the Kharkiv Sea festival, Kharkiv' },
        { period: '2024', text: 'Playback performance within the international project A Sense of Safety, YermilovCentre, Kharkiv' },
        { period: '2024', text: 'Playback performances Rave in the Bathroom, Ostriv platform, Do Not Lean, Harvest, Kyiv; for the Shcheznyk volunteer community and at the Gender Centre, Kharkiv' },
        { period: '2023–2024', text: 'Workshops at playback jams, Nafta theatre / Hub 057; performances at the festivals Potoibichchia, Pidval u shafi, Kharkiv Malanka' }
      ] },
      { title: 'Nomads (2022–2025) and More Nocturne (2020–2021) theatres', items: [
        { period: '2023–2025', text: 'Playback performances for Ukrainian communities, Hanover, Leipzig (Germany), Kraków (Poland)' },
        { period: '2023', text: 'Performative research The suitcase in the author’s project Matches, Kunstcamp Vasenthien residency, Germany' },
        { period: '2022', text: 'Red Treat festival supported by Wasmitherz, Hanover; playback performances at MDBK and GFZK, Leipzig' },
        { period: '2021', text: 'VekVak — a research performance on Kharkiv street art supported by the Kharkiv Municipal Gallery; the music performance Arrhythmia (KharkivMusikFest); the playback performance Taboo (No taboo festival)' }
      ] },
      { title: 'Independent theatre work', items: [
        { period: '2026', text: 'Blitz performances at the festival Zamova kvitka LesяLesь, Kharkiv' },
        { period: '2024', text: 'Black box educational programme of Jam Factory Art Center and the Nafta theatre; performances The Prince of Dew (festival Yabluko dobrykh vistei) and Apricot Christmas (Kut gallery, Kyiv) with the NGO Troubadours' },
        { period: '2023', text: 'Workshops for the Ukrainian community during a residency at the People’s House, Przemyśl, Poland' },
        { period: '2022', text: 'Theatre workshops for internally displaced people at HotArtHall (Lviv) and Art Storage (Kamianets-Podilskyi); the shadow theatre laboratory Tinova, Kyiv' }
      ] },
      { title: 'Education', items: [
        { period: '2017–2021', text: 'Kharkiv State Academy of Design and Arts, Faculty of Graphic Arts' },
        { period: '2014–2017', text: 'Sumy College of Arts and Culture, decorative and applied arts' }
      ] }
    ]
  },
  'nataliia-ivanova': {
    bio: [
      'Nataliia Ivanova is a curator and educator, the founder and director of YermilovCentre — the contemporary art centre of V. N. Karazin Kharkiv National University, which she has led since it opened in 2012.',
      'Co-curator and coordinator of more than 60 exhibition projects at YermilovCentre, among them the dialogue between Wolfgang Tillmans and Boris Mikhailov (2025). She teaches art management at the Faculty of Philosophy of Karazin University, co-founded the NGO YermilovCentre Art Laboratory and founded the ART KUZEMYN art residency.',
      'Recipient of the [2026 Igor Zabel Award for Culture and Theory](https://www.e-flux.com/announcements/6785872/nataliia-ivanova-receives-2026-igor-zabel-award-for-culture-and-theory) — the jury recognised how she connects the regional avant-garde heritage with contemporary practice. The ceremony will take place on 27 November 2026 at the Museum of Contemporary Art in Ljubljana.',
      'On behalf of YermilovCentre she coordinated the exhibition [[project:pokazhit-svoi-dokumenty]] (2025).'
    ]
  },
  'oleksii-chekal': {
    bio: [
      'A Ukrainian graphic designer, type designer, calligrapher and researcher of historical type systems with more than 25 years of experience. He began as a painter: he graduated from the Kharkiv Art College (1989–1994) and from the Kharkiv State Academy of Design and Arts as an art restorer and art historian (1994–2000), studied icon painting and restoration, and taught himself calligraphy. A researcher at the State Museum of Books and Printing of Ukraine, PhD, he teaches at the Kharkiv State Academy of Design and Arts. Since 2000 he has been lead designer at the Panic Design studio.',
      'One of the four designers of the national typeface Zakon, presented on 29 October 2026 in Kyiv at the forum “Ukrainian — the Language of the Free” for the Day of Ukrainian Writing and Language. The typeface was initiated by the Chair of the Verkhovna Rada and delivered by the Ministry of Culture; it is meant to gradually replace Russian typefaces in state institutions. Zakon draws on the legacy of Heorhii Narbut, Vasyl Krychevskyi, Yakiv Hnizdovskyi, Robert Lisovskyi, Vasyl Khomenko and Vasyl Chebanyk and has three typefaces: Zakon Text for official paperwork (free for everyone), Zakon Decor for state awards and ceremonial documents, and Zakon Letterpress for printing the original texts of laws. He created it together with Hennadii Zarechniuk, Dmytro Rastvortsev and Andrii Shevchenko; the project was led by Taras Ishchyk.',
      'Author of the graphic style, symbols, typefaces and lettering of the Orthodox Church of Ukraine — from the design of the 2018 Unification Council to publications and the logos of eparchies and parishes. He based the church typeface on the inscriptions of St Sophia of Kyiv, combining the Byzantine tradition with Ukrainian Baroque. For the Kyiv-Pechersk Lavra National Preserve he develops the visual style and created the logo for the 950th anniversary of the Great Church of the Lavra.',
      'He works with Cyrillic, Latin, Greek, Hebrew, Arabic and Syriac scripts. His work includes a Syriac logo for the American publisher Gorgias Press, calligraphy for Harvard University and for the Eastern calligraphy courses of the University of Lille, the design of academic conferences in Oxford, and the logo of the Department of the History of Christianity at Martin Luther University Halle-Wittenberg. He gave the lecture “Flowering Cyrillic” at Cooper Union (New York) in the Herb Lubalin Lecture Series; his work is included in the book Ukraine Rising (gestalten).',
      'Together with the Museum of Books and Printing he reconstructs the type systems of early Ukrainian printing, including that of the Kyiv-Pechersk Lavra; he designed the book Treasures of the Swedish Archives (2021). He created calligraphy and the posters “Skovoroda’s Spiritual Armour” for the museum in Skovorodynivka, destroyed by a Russian missile at the start of the full-scale war. His solo exhibition “Looking Beyond the Horizon: Letters that Speak of Freedom and Faith” took place at the Sheptytsky Centre of the Ukrainian Catholic University (2024).',
      'For the exhibition [[project:pokazhit-svoi-dokumenty]] he created the identity and the EXDocument typeface.',
      'Lead designer of the project [[project:istoriia-moiei-vulytsi]].'
    ]
  },
  'larysa-chaika': {
    bio: [
      'A graphic artist and graphic designer with more than 25 years of experience in book design, posters and book illustration. She graduated from the Kharkiv State Academy of Design and Arts (graphic arts, 2001, with distinction). Since 2016 she has taught at the Department of Graphic Arts of the Academy and leads its educational and creative workshop of book illustration.',
      'She has designed books for the publishers Shkola, Chitarium, Krokus, Assa, Mikko, Astra and Klinkom. The Good Soldier Švejk in her design received the Book of the Year distinction at the Lviv Publishers’ Forum (2006).',
      'She conceived and curated an international exhibition of art books based on the poetry of Serhiy Zhadan (Hudpromloft, Kharkiv — Kulturzentrum GOROD, Munich, 2017) and an exhibition of students of the Academy’s Department of Graphic Arts at the Brama Grodzka — Teatr NN centre in Lublin (2017). Together with the H. S. Skovoroda National Literary and Memorial Museum she carried out art and graphic projects (2019).',
      'Books by her students have been recognised at the Frankfurt Book Fair (Tashenka and the Cactus by Yaroslava Shults, 2016) and in the BaraBooka award (My Forced Holidays, 1st place in the Readers’ Choice, 2023; Ukrainians in the World: 33 True Stories, illustrated by students under her supervision — shortlist, 2022).',
      'Lead illustrator of the project [[project:istoriia-moiei-vulytsi]].'
    ]
  },
  'maksym-rozenfeld': {
    bio: [
      'An architect and researcher with a PhD in architecture: in 2003 he defended a dissertation on the techno style and high-tech in architecture, largely devoted to Norman Foster. Associate professor at the Kharkiv State Academy of Design and Arts and at V. N. Karazin Kharkiv National University. An illustrator, storyteller and popular writer on the history of architecture, design and graphic art.',
      'One of Kharkiv’s best-known guides: his project Tours of Kharkiv with Max Rozenfeld is a long-running series of street tours and lectures; he also leads routes in Berlin, Munich and Barcelona.',
      'Author of the album Facades: Kharkiv (Assa): 11 architects and 84 buildings of the city with graphic reconstructions of façades from the late 19th and early 20th centuries, in Ukrainian and English. The first edition won the Best Book of the Publishers’ Forum competition in 2017 in the category City — Kharkiv; the 2024 edition was shortlisted for BBC Book of the Year 2024 in the Essay category.',
      'Author and presenter of video projects: Kharkiv Stories (2020, 15 episodes commissioned by the city, more than 2 million views), Ukrainian Style (2021, 10 episodes on the Ukrainian style in architecture of the first half of the 20th century, supported by the Ukrainian Cultural Foundation), Medical Stories. A New Look (since 2019, more than 50 episodes). During the full-scale war he filmed 23 episodes of chronicles about Kharkiv for Kharkiv Now (2022), the documentary Reinforced Concrete about the destruction and protection of the city’s monuments (2022) and the series Liutyi life for Kharkiv Media Hub (2023).',
      'Since April 2022 he has been part of a volunteer working group of Kharkiv architects who, together with the Norman Foster Foundation, are working on a plan for rebuilding Kharkiv; together with Serhii Ilchenko he compiled a map of the city’s historic districts.',
      'Chair of the expert council of the project [[project:istoriia-moiei-vulytsi]].'
    ]
  },
  'vero-yuzepchuk': {
    bio: ['Director of the film [[project:zbyrach-konvalii]] about Oleksandr Suprun, a photographer of the Kharkiv School of Photography. The film received the best cinematography award at the Media Development Foundation’s practical documentary film course.']
  },
  'ivan-samoilov': {
    bio: [
      'Ivan Samoilov (born 2002, Kharkiv) is a Ukrainian documentary photographer and videographer. He studied journalism at V. N. Karazin Kharkiv National University and cinematography at the Kharkiv State Academy of Culture. Member of the [Ukrainian Association of Professional Photographers](https://ukrainianphotographers.com/en/photographers/ivan-samoylov) (UAPP).',
      'During the full-scale war he has stayed in Kharkiv and documents the aftermath of Russian shelling of the city; in an interview with UAPP he said he dreams of photographing the last strike on Kharkiv and knowing that peace will follow.',
      'Cinematographer of the film [[project:zbyrach-konvalii]] (2023), which received the best cinematography award at the Media Development Foundation’s practical documentary film course. “We tried to film everything that seemed important. For me this award is recognition and an incentive to keep going,” Ivan said about working on the film.',
      'He photographed the opening, curators’ tours and public programme events of the exhibition [[project:pokazhit-svoi-dokumenty]] at YermilovCentre (2025).'
    ]
  },
  'maksym-koval': { bio: ['Sound engineer of the documentary [[project:zbyrach-konvalii]] about the photographer Oleksandr Suprun.'] },
  'diana-horbenko': {
    bio: [
      'Production designer of the film [[project:zbyrach-konvalii]] (2023).',
      'In 2026, together with Symbol, she announced an open call for stories about Kharkiv for her research project — an attempt to create a portrait of the city as it is today, with its streets, faces and stories, in the form of a collection and an interactive map.'
    ]
  },
  'alla-pasichnyk': {
    bio: [
      'An artist from Dnipro. After finishing her career (including teaching at the Financial Institute) she began painting in oil, and with the start of the full-scale war she took up watercolour: “Watercolour is harder than oil, but it is like life: what has been said and done cannot be undone.”',
      'In 2023 in Uzhhorod she studied icon painting in tempera; she painted an icon of Saint Nicholas with thoughts of protection and help for Ukraine.',
      'Participant of the exhibition [[project:2-10-300]] (Hungary, 2024) with watercolours from 2022–2024 and the icon of Saint Nicholas.'
    ]
  },
  'magran-tata': {
    bio: ['Works in pixel art. At the exhibition [[project:2-10-300]] (Hungary, 2024) she showed a series of works from 2022–2023 with the inscriptions “60 days of death”, “preserve the cultural code”, “Blood flows down the Dnipro into the Black Sea”, “yellow ribbon”, “bloody wave”, “return”.']
  },
  'ruslana-kliuchko': {
    bio: [
      'A multidisciplinary artist working with artist’s books, printmaking, photography, objects and installations. Born in 2002 in Sumy Region, she lives in Kyiv. She holds a master’s degree from the National Academy of Fine Arts and Architecture (book graphics studio, 2024) and is a member of the MYPH community; she took courses with Roman Pyatkovka and Serhii Melnychenko at MYPH.',
      'Solo exhibitions: Earthbound at Nida Art Colony (Lithuania, 2023), In the Thrice-Tenth Kingdom at the KUT gallery (Kyiv, 2024), Reverse Movement. Diaries at the Small Gallery of Mystetskyi Arsenal (Kyiv, 2026). She has taken part in exhibitions at Kunstquartier Bethanien (Berlin), Ujazdowski Castle in Warsaw (Say Tree), the Academy of Fine Arts Vienna, Book Arsenal and the Ukrainian House in Kyiv, and Druk in Kharkiv.',
      'Finalist of the 11th Vilnius Triennial of Small Graphic Forms (2024) and the International Print Biennial in Varna (2025); her book Hometown received a special mention at the Bologna Children’s Book Fair (2024) and was a finalist of Book Arsenal’s Best Book Design competition (2023). The full list is in [the artist’s CV](https://ruslanakliuchko.net.ua/uk/cv-2/).',
      'At the exhibition [[project:2-10-300]] (Hungary, 2024) she showed the drypoint works Blurring the Line (2023) — about the sensitivity heightened by the war: the sounds by which you tell shelling from air defence, the sky that turned from a symbol of freedom into a threat, birds and fireworks that now make you flinch. “Birds, like us, are endangered by both fireworks and bombs — the line between celebration and destruction is blurring.”'
    ]
  },
  'ivan-kutchak': {
    bio: [
      'Trainer and supervisor of the WHO mhGAP programme. In the project [[project:mhgap-kyiv]], together with [[person:alesia-lysenko|Alesia Lysenko]], he led the training of **31 March – 4 April 2025**, and together with [[person:olha-klymovska|Olha Klymovska]] the second part of the programme on **13–16 May 2025** in Kyiv.',
      'In summer 2025 he ran **online supervision** for training participants.'
    ]
  },
  'olha-klymovska': {
    bio: [
      'A psychologist and graduate of V. N. Karazin Kharkiv National University. In the project [[project:mhgap-kyiv]], together with [[person:ivan-kutchak|Ivan Kutchak]], she led the second part of the mhGAP programme on **13–16 May 2025** in Kyiv and **online supervision** for participants.',
      'She has worked at the Kharkiv Regional Centre of Social Services for Families, Children and Youth (psychological work; the programmes Psychological Centre, Hotline and Volunteer Centre), at **UNICEF Ukraine** in child protection, education in emergencies and psychosocial support, and at the NGO Proliska as psychosocial support coordinator and mental health specialist, where she **planned and taught mhGAP trainings**, psychological first aid and community suicide prevention.'
    ]
  },
  'olena-lemeshko': {
    bio: [
      'A general practitioner in family medicine, trainer and supervisor of the WHO mhGAP programme. mhGAP is a World Health Organization action programme that teaches family doctors, paediatricians, internists, paramedics and nurses to recognise and support people with common mental, neurological and substance use disorders.',
      'Together with [[person:nataliia-opryshko]] she led Symbol’s first training — the [[event:mhgap-kyiv-trening-1|mhGAP training in Bila Tserkva]] (10–14 February 2025) for primary health-care workers within the project [[project:mhgap-kyiv]]. After the trainings she ran online supervision for participants — health workers applying mhGAP in their daily practice (until September 2025).'
    ]
  },
  'nataliia-opryshko': {
    bio: [
      'Trainer and supervisor of the WHO mhGAP programme. mhGAP is a World Health Organization action programme that teaches family doctors, paediatricians, internists, paramedics and nurses to recognise and support people with common mental, neurological and substance use disorders.',
      'Together with [[person:olena-lemeshko]] she led Symbol’s first training — the [[event:mhgap-kyiv-trening-1|mhGAP training in Bila Tserkva]] (10–14 February 2025) for primary health-care workers within the project [[project:mhgap-kyiv]]. After the trainings she ran online supervision for participants — health workers applying mhGAP in their daily practice (until September 2025).'
    ]
  },
  'yurii-sich': {
    bio: [
      'Trainer and supervisor of the WHO mhGAP programme. mhGAP is a World Health Organization action programme that teaches family doctors, paediatricians, internists, paramedics and nurses to recognise and support people with common mental, neurological and substance use disorders.',
      'Together with [[person:viktoriia-myroniuk-danko]] he led Symbol’s second training — the [[event:mhgap-kyiv-trening-2|mhGAP training in Bila Tserkva]] (24–28 February 2025) within the project [[project:mhgap-kyiv]]. After the trainings he ran online supervision for participants — health workers applying mhGAP in their daily practice (until September 2025).'
    ]
  },
  'viktoriia-myroniuk-danko': {
    bio: [
      'Trainer and supervisor of the WHO mhGAP programme. mhGAP is a World Health Organization action programme that teaches family doctors, paediatricians, internists, paramedics and nurses to recognise and support people with common mental, neurological and substance use disorders.',
      'Together with [[person:yurii-sich]] she led Symbol’s second training — the [[event:mhgap-kyiv-trening-2|mhGAP training in Bila Tserkva]] (24–28 February 2025) within the project [[project:mhgap-kyiv]]. After the trainings she ran online supervision for participants — health workers applying mhGAP in their daily practice (until September 2025).'
    ]
  },
  'alesia-lysenko': {
    bio: [
      'Trainer and supervisor of the WHO mhGAP programme. mhGAP is a World Health Organization action programme that teaches family doctors, paediatricians, internists, paramedics and nurses to recognise and support people with common mental, neurological and substance use disorders.',
      'Together with [[person:ivan-kutchak]] she led the [[event:mhgap-kyiv-trening-3|mhGAP training in Kyiv]] (31 March – 4 April 2025, Ukraine Hotel) for 33 participants within the project [[project:mhgap-kyiv]]. After the trainings she ran online supervision for participants — health workers applying mhGAP in their daily practice (until September 2025).'
    ]
  }
}

for (const [slug, extra] of Object.entries(peopleBioEn)) if (peopleEn[slug]) Object.assign(peopleEn[slug], extra)
