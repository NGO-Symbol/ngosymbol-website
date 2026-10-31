// Approved English names, biographies and curatorial texts from KEP_8.pdf.
// The PDF supplied by the organisation is authoritative; keep this data separate from the Ukrainian originals.
export interface ApprovedWorkEn { title: string; text: string[] }
export interface ApprovedArtistEn { name: string; bio: string[]; works: ApprovedWorkEn[] }

export const psdArtistsEn: Record<string, ApprovedArtistEn> = {
  'kostiantyn-hlyvlias': {
    name: "Kostiantyn Hlyvlias",
    bio: [
      "Kostiantyn Hlyvlias lives and works in Lviv. He is a student at the Department of Contemporary Art Practices of the Lviv National Academy of Arts, a graduate of the MYPH School of Conceptual and Art Photography, and a participant in the ELIA–UAx Abakanowicz Fellowship program. He has exhibited in Ukraine and abroad, including at Asortymentna Kimnata, Svitlo Gallery, the Ukrainian House in Denmark, the Korsaks’ Museum of Contemporary Ukrainian Art, the VABAMU Museum of Occupations and Freedom, and other institutions."
    ],
    works: [
      {
        title: "Document",
        text: [
          "In his light installation Document, Hlyvlias addresses the themes of the archive and memory. The starting point for the work is official statistics—about 38,000 Ukrainian citizens reported missing from the beginning of 2022 to the moment of the work’s creation in 2024. The documentation describes the appearance, names, and place of disappearance; some have a photo portrait, and some do not. The installation questions the completeness and reliability of archives: often, we can rely only on the fragments that are illuminated, while everything left in the shadows may eventually be forgotten, as if it never existed.",
          "In Document, the artist explores the fragmentary and limited nature of archival memory, examining the boundary between what is known and what remains in the darkness of history. The project emphasizes the difficulty of recording contemporary events and the impossibility of fully grasping reality through archives, while also highlighting the importance of archiving and documenting the losses caused by war—and of preserving them within collective memory."
        ]
      }
    ]
  },
  'anton-kariuk': {
    name: "Anton Karyuk",
    bio: [
      "Anton Karyuk is a Ukrainian interdisciplinary artist from Dnipro, currently living in Vilnius, Lithuania. He is a recipient of the Polish Minister of Culture’s Gaude Polonia scholarship and of individual state grants for cultural and artistic creators from the Lithuanian Council for Culture."
    ],
    works: [
      {
        title: "Empire Collapsed",
        text: [
          "Anton writes: ‘I launched my project “Empire collapsed” on February 23, 2022, still not knowing that the next morning my country would be set on fire by the hands of nazi russia. “As a Ukrainian and an artist, I have no choice but to imagine” – the only thing I could write back then.’",
          "The project consists of covers of 81 passports created for the free lands of the former evil empire, according to the current number of territories of the Russian Federation. In this imaginary future, every subject has the right to the actual freedom of choice, and the long-lasting colonial system, which had flourished on their territory until now, has irretrievably fallen. The country which relies solely on brutal force and propaganda, imperialist aspirations and humiliation of others, is a failed country.",
          "Additional information: The project uses factitious coats of arms, written language and colors, they are not claimed to be accurate or real. Some imperialist symbols, such as royal crowns, Soviet stars and double-headed eagles, have been removed from the existing coats of arms. Besides, two cities – Moscow and St. Petersburg – are not considered separate territories, but are included in the respective regions here."
        ]
      }
    ]
  },
  'yeva-fomitski': {
    name: "Eva Fomitski",
    bio: [
      "Eva Fomitski is an artist and curator from Kharkiv, currently based in Berlin, Germany. She is a co-founder of the creative space Ziegel in Graz, Austria, dedicated to presenting Ukrainian art and fostering cultural exchange between Ukraine and Austria. In her practice, Fomitski focuses on exploring social and political discourses, paying particular attention to collective memory, archives, and postcolonial mentality."
    ],
    works: [
      {
        title: "Common Code",
        text: [
          "The installation, based on a family archive from the village of Yasnoziria (Cherkasy Oblast), combines original documents from the 1920s–1950s, photographs, light, and transparent plates. At the center of the work are material traces of totalitarian control over the body, labor, and resources: tax certificates, supply records, NKVD documents, and German receipts from the wartime period. They record how the state transformed human life into a resource and survival into a form of resistance.",
          "Through these materials, the artist reflects on trauma as a phenomenon that shapes a “common code” — behavioral patterns transmitted across generations after collective catastrophes. The central element is the projection of light through transparent plates with negatives of archival photographs: in the dark space, shadows emerge — “ghosts of the past” demanding recognition. When the light is directed properly, the viewer can see the positive image — the distinct faces that restore names to forgotten histories.",
          "The project examines postcolonial memory, mechanisms of repression and erasure, family history as a political space, and the document as both an instrument of power and a means of resistance. The work was exhibited at Raum Gallery (Graz, 2024) and Steirische Fotobiennale (Leibnitz, 2024), where for many visitors it became their first encounter with the history of Soviet repressions in Ukraine."
        ]
      }
    ]
  },
  'alina-prokopenko': {
    name: "Alina Prokopenko (Apris)",
    bio: [
      "Alina Prokopenko (Apris) is a food designer based in Paris. She creates edible art objects and collaborations with restaurants and brands. Her experience includes working with Valentino, Balenciaga, Acne, and others. Her practice merges gastronomy and visual art, blurring the boundaries between the two."
    ],
    works: [
      {
        title: "Passport Table",
        text: [
          "The installation emerged from a spontaneous moment when, instead of chewing gum, the artist found her passport in her pocket. This gesture became a starting point for reflecting on the document as an extension of the body — an object that simultaneously affirms presence and alienation. In this project, Apris contemplates her personal experience of emigration.",
          "The work features a “passport of the fictional country Candyland,” made of edible sugar paper. The name references the film Django Unchained, where Candyland is a place of slavery, evoking questions of belonging, control, and the right to exist. The viewer is invited to participate — to take a bite of the passport or leave it intact. In this way, the document becomes temporary and vulnerable, merging with the body or disappearing — like memory or identity in the process of displacement.",
          "In her curatorial concept, the artist refers to Pavlo Makov and his notion of utopia as “a place that does not exist.” Within this framework, Candyland emerges as an imaginary territory — a space between reality and fiction — where the document loses its legitimacy and transforms into a poetic act of presence."
        ]
      }
    ]
  },
  'anna-hareieva': {
    name: "Anny Gareeva",
    bio: [
      "Anny Gareeva is a photographer from Kharkiv, currently based in Chernivtsi. In her artistic practice, she explores the inner worlds of her subjects — their experiences, associations, and emotions."
    ],
    works: [
      {
        title: "Housing and Communal Eternity",
        text: [
          "In this work, Anny steps away from her usual medium of photography and turns to installation to tell the story of her grandmother. Anny’s grandmother, born in 1941, owned an apartment in Kharkiv but spent the final years of her life in russia’s Belgorod region. She passed away six months before the beginning of the full-scale invasion in 2022. Due to the war, the family was unable to formalize the inheritance, and thus, for nearly four years, the grandmother has continued to “live” within the Ukrainian legal system — utility bills for her Kharkiv apartment are still issued in her name.",
          "The project examines how bureaucracy extends a person’s “life” beyond physical death. Even from the other world, the grandmother remains an active figure within the system — receiving bills, accumulating debts, and appearing as a registered consumer of services. The work raises questions about what it means to be “alive” within digital and paper-based state systems, and where the boundary lies between the body and its bureaucratic shadow. It is a study of the mechanical memory of the state — of how documents can outlive a human being — as well as a reflection on the role of memory and everyday life in sustaining the presence of the dead among the living."
        ]
      }
    ]
  },
  'kinich-azla': {
    name: "Kinich Azla (Veronika Lipatova)",
    bio: [
      "Kinich Azla (Veronika Lipatova) is an astronomer currently studying and teaching as a PhD candidate at Heidelberg University, Germany. This is her first art exhibition, though Azla has been drawing and participating in live-action role-playing games for many years. Notably, a day before the opening of “Show Your Documents…”, she released her debut music album titled “Captain of the Schooner ‘The Last Way.’”"
    ],
    works: [
      {
        title: "Mimic",
        text: [
          "The project is an application assembled from documents generated by a specially trained artificial intelligence model programmed in Python.",
          "The training of the AI model is an integral part of the work. The dataset for training consists of “all the forms, acts, certificates, and regulations I can get my hands on,” as the artist explains. The installation creates a chaotic collage of AI-generated documents of unknown purpose: “You look at them and seem to recognize an act, but can’t understand a single word, a single meaning of what was intended to be conveyed.”",
          "The work seeks to convey a sense of artificiality and otherworldliness — a state similar to that of a stroke, when you look at an object and seem to recognize it, but cannot grasp or define what it is. It reflects attempts of something with a different logic to mimic what even we, humans, already understand only with difficulty. A bringing of this incomprehension to its extreme. The uncanny valley effect in a bureaucratic queue — waiting for a certificate for another certificate — when you’ve already forgotten why you’re here at all. Something tries to mimic, to understand whether it can take form and pass for something real. This AI model knows only documents; its entire world consists of Ukrainian bureaucracy."
        ]
      },
      {
        title: "Modern Fashion",
        text: [
          "The mannequin presents a dress from a new collection. All your papers cover you, shaping your image, your character, your presence. “Without them, you are nobody,” — society seems to whisper. Your “clothing” is who you are. If you remove the documents, there is nothing left underneath. Just a naked human being. But is that person still a person without documents? Isn’t that true? Or perhaps it is the documents that make you human? Maybe you need a certificate of your humanity?",
          "The mannequin here serves as a symbolic imprint of a human being — neutral, stripped of individual traits. The meaning of the work lies not only in the outward appearance but in the tension between the documents and the human nakedness that remains beneath them. The artist poses a question: “Who are you without your documents?”"
        ]
      }
    ]
  },
  'dara-sholokh': {
    name: "Dara Sholokh and Ana Franyk",
    bio: [
      "Dara Sholokh and Hanna Franyk form an artistic duo. Both were born in Donetsk and have seen checkpoints since childhood.",
      "Ana Franyk — artist, cultural manager, and exhibition manager of “Show Your Documents…”. Born in Donetsk, after 2014 she lived in Dobropillia, where she joined the “RePost” community space. Studied cultural management at Karazin University. Resident of the Her Gaze program (2023, Truskavets), participant of the exhibition “No One Is Superfluous” (2023, Lviv), curator of “2, 10, 300 years later” (2024, Hungary), and performance “An Air Alert in Ukraine” (2023, Tbilisi).",
      "Dara Sholokh — Ukrainian artist. After the start of the war in 2014, she moved to Zaporizhzhia, and in 2022 to Kyiv. She studies at the Mykhailo Boichuk Academy of Arts. In her practice, Dara works with the theme of the loss of home and explores human relationships. For her, home is found in familiar smells, sounds, and objects, while art becomes a way to preserve it despite change. She works mainly with painting, installation, and mosaic, and has participated in group and exhibition projects in Kyiv, including Ukraïnka Gallery and the M17 Contemporary Art Center."
    ],
    works: [
      {
        title: "Checkpoint",
        text: [
          "A checkpoint is a control and inspection post whose main function is to verify identity and documents, ensuring security in a territory under martial law. During a prolonged war, many people no longer feel surprise or fear when encountering a checkpoint — it has become part of daily life. “In a state of long war, a checkpoint becomes an everyday thing, as ordinary as a morning cup of tea,” the artists note.",
          "The artists invite visitors to interact with the checkpoint. On the table in front of you is a prototype of a passport that you can fill in and decorate as you wish. By engaging with the checkpoint and turning to routine objects (like teacups), artists reflect on how document checks and heightened security measures have become normalized in today’s reality."
        ]
      }
    ]
  },
  'roman-piatkovka': {
    name: "Roman Pyatkovka",
    bio: [
      "Roman Pyatkovka is a Ukrainian photographer, born in Kharkiv, and one of the most prominent representatives of the Kharkiv School of Photography. His works combine documentary and experimental approaches, eroticism and irony. In the 1980s and 1990s, Pyatkovka was a member of the art group Vremya, together with Boris Mikhailov, Yevgeniy Pavlov, and others, who developed an alternative, often provocative, view of Soviet reality through intellectual photography. In his practice, he merges analog techniques with painterly and graphic elements, turning photography into a means of philosophical and corporeal expression."
    ],
    works: [
      {
        title: "Schemes",
        text: [
          "Pyatkovka overlays hand-drawn mechanical diagrams with “technical comments” onto his own photographs of nude women or fragments of their bodies. The work operates at the intersection of technical documentation and human corporeality. How is the visual aesthetic of mechanical schematics connected to the aesthetics of the human body?",
          "The artist draws a parallel between two utopian human desires — the constant perfection of technology and the pursuit of the ideal body. The characteristics of machines are standardized and regulated, and society likewise strives to control and normalize our corporeality. At the same time, the act of drawing schematics also carries an element of nudity — it reveals the inner structure of the mechanism."
        ]
      }
    ]
  },
  'serhii-melnychenko': {
    name: "Serhii Melnychenko",
    bio: [
      "Serhii Melnychenko is a Ukrainian photographer, dancer, international-class ballroom dance master, founder of the conceptual and art photography platform MYPH, and a member of the creative association Ukrainian Photographic Alternative. In 2017, he became the first Ukrainian to receive the German Leica Oskar Barnack Award Newcomer."
    ],
    works: [
      {
        title: "Passengers",
        text: [
          "The project “Passengers” had hardly been exhibited before and exists in the form of a photobook. The book depicts a journey on a Chinese train, where passengers travel for dozens of hours even in the absence of comfortable conditions — some seats are sitting, while others are standing. At the same time, there is no price difference between the different types of tickets.",
          "The entire series was shot with an action camera, after which Melnychenko “passportized” some of the passengers by overlaying their images with photographs of ID cards. In the book, these passports are printed on separate transparent pages, and the reader can combine them with the images, creating their own interactions between people and documents.",
          "The photographer raises the question — who are all these people, what are their stories? Where are they going, and why do they overpay for an uncomfortable standing place? Couldn’t they wait for a ticket on the next train? Who knows. Here — they are passengers."
        ]
      }
    ]
  },
  'volodymyr-kuznietsov': {
    name: "Volodymyr Kuznetsov",
    bio: [
      "Volodymyr Kuznetsov is a Ukrainian artist originally from Lutsk, currently living and working in Kyiv. He has participated in numerous solo and group exhibitions in Ukraine and abroad. In his work, Kuznetsov explores the aesthetics of everyday life and the presence of the archaic in contemporary contexts. He considers memory a type of experience and generates new concepts through personal and collective knowledge. Kuznetsov has also been an active participant in self-organized initiatives and assemblies of the Maidan and post-Maidan periods."
    ],
    works: [
      {
        title: "Koliivshchyna: The Last Judgment. Open Archive",
        text: [
          "The Open Archive “Koliivshchyna: Judgement Day” brings together the processes and situations surrounding the destruction of Volodymyr Kuznetsov’s wall painting at Mystetskyi Arsenal in 2013, shortly before the opening of the exhibition Great and Grand. The archive includes court documents, official statements, correspondence, videos, sketches, and recordings of public discussions that reconstruct the context of the event and society’s reaction to it.",
          "This long-term artistic work structures actions related to censorship while simultaneously challenging society, institutions, and the legal system. The transfer of the archive to the National Art Museum of Ukraine is viewed as an attempt to rethink the role of the museum as a living institution capable of engaging with the conflicting events of the present. In his practice, the artist creates a situation in which Ukraine’s cultural community has the opportunity to rethink how it defends its rights and interacts within both legal and public frameworks."
        ]
      }
    ]
  },
  'nataliia-okhman': {
    name: "Nataliia Okhman",
    bio: [
      "Nataliia Okhman is a Ukrainian artist based in Kyiv, working in analog collage, land art, and photography. Her main research themes include the individual in social culture, humans in their environment, and ecological issues. “It is important for me to analyze the environment we inhabit and how we affect it. When I create a collage, it is as if I am having a dialogue with myself, analyzing what is happening around me,” writes Okhman."
    ],
    works: [
      {
        title: "Closed Case",
        text: [
          "History knows countless instances when documents were hidden, bricked in, encased in concrete, embedded in floors, or stored in safes or metal containers—to protect them from destruction during occupation, to conceal compromising information, to safeguard oneself or others, or to leave a trace “for later” in the hope of a different future.",
          "This installation is an attempt to approach the experience of a document that exists but cannot be read because it was deliberately hidden, lost, or physically vanished along with the space that held it. Closed Case does not claim access to the forbidden. On the contrary, it offers a perspective from the outside—someone without authority, without the “key,” confronted with something intentionally removed from circulation. Unlike an open archive that invites study, a hidden document is a refusal to communicate; it is silence. Yet it is precisely in this silence that the most questions arise.",
          "When a document is hidden, it does not disappear, but it also does not live. It freezes, becoming a trace—tangible, yet unreadable. This is a state between being and non-being. The document becomes an object of time, having lost its communicative function but retaining the function of reminding: something existed. Something important. But we can no longer know what exactly."
        ]
      }
    ]
  },
  'mariia-prokopenko': {
    name: "Mariia Prokopenko",
    bio: [
      "Mariia Prokopenko is a graphic designer and artist from Kharkiv. Her experience of living in the KhTZ district shaped her attention to themes of everyday madness and the poetics of decay. She works at the intersection of painting and graphic thinking."
    ],
    works: [
      {
        title: "91",
        text: [
          "The project is based on an investigation from 1991, the events of which take place in a small hamlet of the Zmiiv community, where local residents find the body of a local drunkard in a haystack, exactly one month before the declaration of Ukraine’s independence. From fragments of the criminal case, a bizarre portrait of the main character and his surroundings can be assembled. We do not know what they looked like or what their voices sounded like — and it is precisely this that creates a space for artistic work. The plots from the criminal case are transformed into images on sheets drying on a clothesline. This image is well known in our region — it can be seen in every yard. But what story do they hold? Every word and event remains on their linens — and here they already turn into new witnesses of the reality of that time."
        ]
      }
    ]
  },
  'andrii-skrypka': {
    name: "Andrii Skrypka",
    bio: [
      "Andrii Skrypka is an interdisciplinary artist and designer, born in Kerch, Crimea. In 2013, he graduated from the Kharkiv State Academy of Design and Arts. He works in urban sketching, photography, video art, painting, graphics, and sculpture. He observes and documents the urban environment and everyday life of Kharkiv in projects such as Sketching the City and Noise. Silence. Flow (2025).",
      "Since 2022, he has participated in over 30 exhibitions in Ukraine and abroad — in the USA, Canada, the UK, and Germany — and has also worked as a curator. His works combine urban sketches, scenography, illustrations, and installations, including Portraits of the Ukrainian City Kharkiv (2025), Memory. Dialogues (2025), and the solo exhibition Path of the Gaze (2023)."
    ],
    works: [
      {
        title: "Tickets of Kharkiv",
        text: [
          "The project is based on a personal collection of approximately 1,500 transport tickets, which the artist unconsciously collected from 2009 to 2022 — from the time he moved to Kharkiv to study, and later as a resident of the city. Tickets are the city’s most common documents, traces of its changes, material evidence of time, reflecting both economic processes (price changes, fluctuations of the dollar exchange rate) and the gradual transformation of urban space. For the artist, this is not a collection in the traditional sense, but the result of observing how the city leaves an imprint in small, everyday things. After 2022, when the artist was evacuated to Lviv, this archive gained new significance.",
          "The artist’s return to Kharkiv revealed changes in the city’s transport during wartime — from paper tickets to free travel. These observations led to the idea of translating the archive into an artistic plane: enlarging its scale, printing tickets as stickers and posters, creating copies using linocut techniques, and later — in the form of a carpet. The exhibition presents seven tickets of different colors: originals, linocuts, and a textile carpet. The installation is complemented by drivers’ logs and unused tickets displayed under glass."
        ]
      }
    ]
  },
  'oleksii-sai': {
    name: "Oleksiy Sai",
    bio: [
      "Oleksiy Sai is a Ukrainian artist and public figure. He graduated from the Graphic Design Department of the Kyiv Art and Industrial Technical School and the Printmaking Department of the National Academy of Fine Arts and Architecture. Since 2004, he has worked with Excel as a visual language, transforming the office interface into an artistic instrument. His authorial concept of Excel-Art has become a landmark phenomenon in contemporary Ukrainian art, with the first exhibition under this title held at the TSEKH Gallery in 2007. He was a nominee for the PinchukArtCentre Prize in 2009."
    ],
    works: [
      {
        title: "Excel-Art",
        text: [
          "In Oleksiy Sai’s works, the spreadsheet takes on qualities of painting, but instead of an intuitive gesture, strict Excel logic prevails. The artist reproduces the routine of an office worker, where keystrokes and formula copying become a kind of meditation. This systematization reveals the hidden poetics of monotony.",
          "The Excel-Art series (since 2004) demonstrates complex digital compositions created from colored Excel cells, forming abstract landscapes, post-Soviet office scenes, architectural objects, and urban landscapes. The familiar office document in Sai’s practice transforms into a tool for artistic thinking. In the series Urban Growth, Undone, Office Plant, as well as in works Traffic, Clouds, the Smile! series, and Crowd, presented in the exhibition, the artist explores themes of urbanism, information overload, and corporate culture. Concrete frameworks of cities, flows of people, or clouds of digital data in his works emerge as new “natural landscapes” of the present — spaces where alienation and the shared human experience coexist."
        ]
      },
      {
        title: "Statements",
        text: [
          "Oleksiy Sai’s Statements project continues his interest in bureaucratic and administrative practices as artistic material, but now the focus shifts from the digital tool Excel to simple physical media — ballpoint pen and A4 sheets of paper. Each work in the series is a “statement” beginning with the word “I request…”, featuring fields for “to” and “from”, a signature and date, and repeating the same phrase multiple times, creating a textured “weaving” of lines where individual words can sometimes be discerned, but overall forming a dense and bizarre field of written appeals. Sai uses this simple form to capture intangible, undefined human experiences and emotions, to sense the alienation and fatigue that accompany an individual’s interaction with administrative structures and large groups of people.",
          "At the same time, Statements serve as social reflection: they record tension, humiliation, patience, and the impersonality of the bureaucratic system, demonstrating how forced human interaction within administrative processes transforms into a collection of rituals and formalities. Sai refrains from judging these phenomena as good or bad, offering the viewer the opportunity to experience this “social structure” through their own body and attention. The works combine individual experience with collective order, reflect the everyday mechanics of state processes, and transform them into an artistic object that is simultaneously a reflection of social reality and a tool for aesthetic contemplation of bureaucracy."
        ]
      }
    ]
  },
  'vira-pakosh': {
    name: "Vira Pakosh",
    bio: [
      "Vira Pakosh is a multidisciplinary artist working with painting, drawing, textiles, silkscreen, installation, photography, video, and performance. She studied at the Lviv National Academy of Arts (2020–2024, Faculty of Monumental Painting) and since 2022 at the Warsaw Academy of Arts. After the start of the full-scale invasion, she moved to Warsaw, which shaped her life between two cities and countries. In projects such as Plasticity of Movement, RozwalonyJ, Shukai, Ne, and Hiding, the artist explores memory, safety, threat, and the internal limitations of the artistic environment. Her first solo exhibition, Content In A Transparent Box, took place at the Goethe-Institut in Krakow."
    ],
    works: [
      {
        title: "Life in a Folder",
        text: [
          "The starting point for Vira Pakosh’s project Life in a Folder was a chance discovery — a folder found by the artist in a dumpster in Krakow, inside which were three documents: birth, marriage, and death certificates. These sheets represent a condensed life of a single person, a story reduced to formal confirmations of existence. Opening this folder becomes, for the artist, not an archival gesture, but an act of encounter — between the one who was and the one who now observes.",
          "Pakosh considers the document as a witness that simultaneously records and suppresses. It certifies an event, but silences what cannot be formalized. In the work, there is a palpable tension between the materiality of the document and the immateriality of memory, between the physicality of the folder and the bodilessness of the person it represents. The artist becomes a chance heir to the memory of a person she never knew, but whose life she encountered in the dumpster."
        ]
      }
    ]
  },
  'mariia-matiashova': {
    name: "Maria Matiashova",
    bio: [
      "Maria Matiashova is a Ukrainian artist. She received a legal education at the Kyiv-Mohyla Academy but left legal practice in 2020 to pursue an artistic career. She works with video, text, performance, and installation, exploring social relations, institutions, language, and collective memory. Her works have been exhibited in Ukraine, Poland, Germany, Switzerland, Austria, and Lithuania. Among her projects are Repacking (a 10-hour performance involving suitcase assembly), Rules of the Game (a performance exploring changes in children’s games after February 24, 2022), and Svitlodil (a board game about adapting to blackouts)."
    ],
    works: [
      {
        title: "Vain Words, Loud Sounds",
        text: [
          "In Maria Matiashova’s work Vain Words, Loud Sounds (2022), the artist addresses the impotence of international humanitarian law in the face of war. To do this, she prints out the main treaties systematically violated by the Russian Federation — the four Geneva Conventions and two international documents prohibiting certain types of weapons and ammunition. These documents are not merely presented as texts; they are transformed into paper airplanes, which are thrown against a black paper wall, and the rhythmic sound of their impacts becomes a symbol of the futility of legal declarations that cannot resist the violence of war.",
          "The 1-minute 18-second video expresses the artist’s reflections on the effectiveness of humanitarian law: norms exist not only to punish but primarily to prevent crimes, as it is better to prevent than to punish. However, when one party disregards the system of rules, the law becomes powerless — “paper,” childlike, and easily crumpled amid military aircraft. The work combines visual and auditory elements, demonstrating the paradox of modern war: the law exists, but its effect is limited, and all that remains is to record its presence and raise questions about justice."
        ]
      }
    ]
  },
  'oleh-tistol': {
    name: "Oleh Tistol",
    bio: [
      "Oleh Tistol is a leading Ukrainian artist based in Kyiv, widely recognized for helping shape the Ukrainian New Wave. He works in painting, graphic art, installation, and object-based media, often exploring national myths, visual stereotypes, simulacra, and the interplay between the local and the global. A co-founder of the Natsprom group with Mykola Matsenko, Tistol is known for aesthetic strategies that question propaganda, historical clichés, and cultural identity. He is a member of the National Union of Artists of Ukraine, and his works are held in major Ukrainian and international collections, such as the PinchukArtCentre and the Stedelijk Museum."
    ],
    works: [
      {
        title: "Works from the Series “Money”",
        text: [
          "The exhibition presents four works from Oleh Tistol’s ongoing series «Money». According to the artist, “Money” was created as part of his “struggle for the beauty of the stereotype.” The works employ familiar visual strategies of banknote design and reflect on the narrative clichés of Ukrainian historiography. The series began in 1984, in anticipation of Ukraine’s independence. Although some pieces from the series now hang in the National Bank of Ukraine, the artist notes that he would not want to design real currency.",
          "“Poltava” (1996) — based on a 1991 painting created and exhibited at the Stedelijk Museum in Amsterdam. The theme of the Battle of Poltava is used as an example of an event stereotypically referenced in Ukrainian history and, therefore, imagined as belonging on Ukrainian money from the perspective of 1991.",
          "“Baryshivka Motifs” (1998) — created on paper from the Molniya factory in Baryshivka. In the project’s concept, money is not only currency but also a form of valuable paper. The portrait depicts the artist’s daughter.",
          "“Money No. 10B” (1998) — based on visual stereotypes of banknote design: “there must be some person and some building.” Here, the person is the artist’s grandmother, and the building is a store in Baryshivka, her hometown.",
          "“Reunification” (1997–2010) — an ironic play on the Russian-Soviet propaganda cliché about “constant reunifications.” The figures depicted are the artist’s wife and his kum (godfather of his children), humorously referencing a Ukrainian folk stereotype about a kum courting the kuma (godmother of kum’s children)."
        ]
      }
    ]
  },
  'pavlo-makov': {
    name: "Pavlo Makov",
    bio: [
      "Pavlo Makov is a Ukrainian artist, a full member of the National Academy of Arts of Ukraine. Since 1988, he has been a member of the National Union of Artists of Ukraine, and in 1994 he became a member of the Royal Society of Painters and Graphic Artists of the United Kingdom. Winner of the National Taras Shevchenko Prize (2018). He lives and works in Kharkiv. Since 1992, he has been working on artist books, including Book of Water, Fountain of Exhaustion. April Wars (1996), and Book of Roses, all part of the cycle Utopia. Chronicles 1992–2005. In 2022, Pavlo Makov represented Ukraine at the Venice Biennale with the project Fountain of Exhaustion. High Water."
    ],
    works: [
      {
        title: "Utopia. Chronicles",
        text: [
          "In the project Utopia. Chronicles, Pavlo Makov reinterprets the concept of utopia, understanding it not as an image of an impossible future, but as the experience of what has already been lived — as a specific mode of reality that existed and continues to exist. The book is the result of a long-term engagement by the artist, which began in the early 1990s, as an attempt to preserve evidence of the presence of Ukrainian art, to create a document that proves: “We were here.”",
          "The starting point for the project was the realization, during a 2003 exhibition, that most of the works presented were already held in collections abroad. According to Makov, today we are in the process of recognizing the losses of the 1920s and 1930s, but we barely notice what we are losing in contemporary Ukrainian art. Over the last thirty years, three generations of artists have emerged, yet there is no framework to trace their development. Visual art is more vulnerable than literature: books can be reprinted, texts preserved, while visual works disappear or end up outside Ukraine.",
          "For Makov, art is a form of observation and the recording of time, not merely the production of aesthetic objects. His etchings, maps, collages, and photographs function as a visual diary, documenting thought, life, and environment. Through them, he seeks to preserve the continuity of artistic tradition, which is often at risk of disappearing due to the lack of institutional memory, the loss of archives, and works held abroad.",
          "Makov emphasizes the necessity of leaving at least one trace of presence, to record the moment before it dissolves. In this sense, Utopia. Chronicles is not merely an archive book but a gesture of resistance against forgetting, an attempt to preserve the fact of existence, the material memory of those who created and lived here."
        ]
      }
    ]
  },
  'senora-serpiente': {
    name: "Señora Serpiente",
    bio: [
      "Señora Serpiente is a Chilean artist based in Paris. In her practice, she works with textiles, embroidery, the body, and the image as media for exploring identity, borders, and the legacy of colonialism. Her works merge feminist and decolonial perspectives, using women’s craft techniques as a means of political expression. For the artist, embroidery becomes a way to stitch together the personal and the historical, the bodily and the political, creating a space for reflecting on violence, power, and human dignity."
    ],
    works: [
      {
        title: "Visa est dispositif colonial",
        text: [
          "In this work, the Chilean artist Señora Serpiente embroiders a page from an old passport—the one bearing the visa stamp. Through embroidery, she exposes the colonial nature of the visa system, which turns human life into an object of bureaucratic control. The visa here appears not as a guarantee of safety or belonging, but as an instrument of hierarchy that divides people by country of origin, skin color, and economic status. The work reveals how an administrative system, designed to preserve political and racial domination, sustains inequality and exploitation.",
          "Embroidery, as a medium, acquires political meaning in this context: it intertwines corporeality, intimacy, and labor with the themes of memory, trauma, and colonial violence."
        ]
      }
    ]
  }
}

export interface ApprovedPersonEn { name: string; bio: string[] }

/** Individual profiles on symbol.ngo; the catalogue presents Dara and Ana together, so their approved bios split here. */
export const psdPeopleEn: Record<string, ApprovedPersonEn> = Object.fromEntries(
  Object.entries(psdArtistsEn).map(([slug, artist]) => [slug, { name: artist.name, bio: artist.bio }])
)

psdPeopleEn['dara-sholokh'] = { name: 'Dara Sholokh', bio: [psdArtistsEn['dara-sholokh']!.bio[2]!] }
psdPeopleEn['hanna-franyk'] = { name: 'Ana Franyk', bio: [psdArtistsEn['dara-sholokh']!.bio[1]!] }
