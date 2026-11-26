// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — OFFICIAL FOUNDING STORY & INSTITUTIONAL PHILOSOPHY
// "When Silence Became the Reason to Speak"
// Permanent canonical record for `/our-story` (`/himalayan-dispatch/our-story`)
// ─────────────────────────────────────────────────────────────────────────────

export interface FoundingStoryChapter {
  id: string;
  roman: string;
  heading: string;
  paragraphs: string[];
  /** Optional indices (0-based) within `paragraphs` rendered with cadenced literary stanza spacing */
  cadenceParagraphIndices?: number[];
}

export const HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY = {
  kicker: 'THE FOUNDING PHILOSOPHY · EST. 2026',
  lineOne: 'For two years, we waited for a voice.',
  lineTwo: 'Then we decided to become one.',
  publicationName: 'HIMALAYAN DISPATCH',
  motto: 'LANDSCAPE. PEOPLE. SCIENCE. TRUTH.',
} as const;

export const HIMALAYAN_DISPATCH_FOUNDING_STORY = {
  slug: 'our-story',
  rubric: 'OUR STORY · WHY HIMALAYAN DISPATCH EXISTS',
  title: 'When Silence Became the Reason to Speak',
  uppercaseTitle: 'WHEN SILENCE BECAME THE REASON TO SPEAK',
  subtitle: 'The story behind the creation of Himalayan Dispatch',
  standfirst:
    'Two years of unanswered correspondence. A landscape divided by political boundaries. Environmental concerns struggling to find a platform. And ultimately, a decision to create an independent voice.',
  establishedYear: '2026',
  founderName: 'Dr. Fayaz Ahmad Khan',
  founderRole: 'Founder, Kashmir EcoWatch & Founding Editor-in-Chief, Himalayan Dispatch',
  readingTimeMinutes: 7,
  publishedIsoDate: '2026-04-01',
  chapters: [
    {
      id: 'the-story-behind-himalayan-dispatch',
      roman: 'I',
      heading: 'THE STORY BEHIND HIMALAYAN DISPATCH',
      paragraphs: [
        'Himalayan Dispatch was not conceived as another news portal, another digital magazine or another institution competing for public attention.',
        'It was born out of necessity.',
        'For nearly two years, the founder of Kashmir EcoWatch, Dr. Fayaz Ahmad Khan, attempted to engage media organizations regarding environmental concerns affecting the Western Himalayas.',
        'These concerns extended across geographical, administrative and political boundaries. They involved glaciers, rivers, wetlands, forests, biodiversity, mountain ecosystems, environmental governance and the ecological consequences of human intervention.',
        'The intention was neither political confrontation nor personal publicity. It was to bring scientific observations, environmental evidence and uncomfortable ecological questions into the public domain.',
        "Yet, according to the founder's experience, meaningful opportunities to communicate these concerns remained remarkably limited.",
        'Some approaches went unanswered. Others received assurances that the concerned media organization would reach back.',
        'That promised communication never materialized.',
        'Whether this silence resulted from editorial priorities, institutional limitations, political sensitivities or circumstances beyond the control of individual journalists remains uncertain.',
        'What remained undeniable to the founder was the experience of repeatedly trying to communicate environmental concerns without finding a consistent platform willing to accommodate them.',
      ],
    },
    {
      id: 'two-years-of-waiting',
      roman: 'II',
      heading: 'TWO YEARS OF WAITING',
      paragraphs: [
        'For two years, the expectation was that established media institutions would eventually recognize the importance of these environmental concerns.',
        'The founder continued to believe that scientific evidence, ecological responsibility and the public interest would ultimately provide sufficient grounds for meaningful coverage.',
        'But environmental degradation does not wait for editorial approval.',
        'Glaciers do not suspend their retreat while correspondence remains unanswered.',
        'Wetlands do not postpone their disappearance until a newsroom finds space.',
        'Rivers do not recognize political sensitivities.',
        'Forests do not distinguish between administrative jurisdictions.',
        'Nature continues to respond to human decisions, whether those consequences are reported or ignored.',
        'Eventually, waiting itself became part of the problem.',
      ],
      cadenceParagraphIndices: [2, 3, 4, 5, 6],
    },
    {
      id: 'the-decision-to-create-our-own-voice',
      roman: 'III',
      heading: 'THE DECISION TO CREATE OUR OWN VOICE',
      paragraphs: [
        'After two years of attempting to find an appropriate platform, a fundamental decision was made.',
        'If we could not consistently find a space within existing media platforms to communicate the environmental concerns of the Western Himalayas, we would establish a platform of our own.',
        'Not to retaliate against the media.',
        'Not to compete for political influence.',
        'Not to promote the personality of its founder.',
        'But to ensure that important environmental questions would always have a place where they could be raised, investigated, scientifically examined and communicated to the world.',
        'That decision became Himalayan Dispatch.',
      ],
      cadenceParagraphIndices: [2, 3, 4],
    },
    {
      id: 'nature-has-no-political-borders',
      roman: 'IV',
      heading: 'NATURE HAS NO POLITICAL BORDERS',
      paragraphs: [
        'The Western Himalayas constitute an interconnected ecological landscape extending across multiple political and administrative jurisdictions.',
        'Kashmir, Jammu, Ladakh, AJ&K, Gilgit and Baltistan are connected through mountain systems, glaciers, watersheds, atmospheric processes, biodiversity corridors and shared environmental vulnerabilities.',
        'A river flowing across a political boundary does not become a different ecological system.',
        'A glacier does not carry a nationality.',
        'A migratory bird does not require a passport.',
        'Air pollution does not stop at a border.',
        'Climate change does not recognize territorial claims.',
        'Environmental journalism must therefore possess the intellectual courage to examine ecological processes beyond political geography, while respecting the people, laws, cultures and realities of the regions it covers.',
        'Himalayan Dispatch was established upon this understanding.',
      ],
      cadenceParagraphIndices: [2, 3, 4, 5, 6],
    },
    {
      id: 'not-another-conventional-newsroom',
      roman: 'V',
      heading: 'NOT ANOTHER CONVENTIONAL NEWSROOM',
      paragraphs: [
        'Himalayan Dispatch brings together environmental journalism, scientific research, geospatial intelligence, documentary storytelling, investigative reporting, historical analysis and public accountability.',
        'Its purpose is not simply to report what happened yesterday.',
        'It seeks to understand what has been happening for decades, why it is happening, what the scientific evidence reveals and what consequences future generations may inherit.',
        'Through Daily Dispatches, monthly cinematic magazine editions, scientific investigations, visual journalism and regional reporting bureaus, the publication seeks to make complex environmental realities accessible to the wider world.',
        'Its editorial approach is grounded in evidence, scientific integrity, intellectual independence and responsible journalism.',
      ],
    },
    {
      id: 'a-platform-for-those-who-struggle-to-be-heard',
      roman: 'VI',
      heading: 'A PLATFORM FOR THOSE WHO STRUGGLE TO BE HEARD',
      paragraphs: [
        'The experience that led to the creation of Himalayan Dispatch must not become an experience imposed upon others.',
        'The publication seeks to provide an appropriate platform for environmental scientists, researchers, journalists, conservationists, educators, local communities, independent scholars and individuals raising legitimate environmental concerns.',
        'Contributions will be evaluated on their evidence, relevance, scientific integrity and public importance, rather than the prominence, influence or institutional position of their authors.',
        'No individual should have to spend years searching for a platform simply because the environmental questions they raise are difficult, inconvenient or unfamiliar.',
      ],
    },
    {
      id: 'independence-without-hostility',
      roman: 'VII',
      heading: 'INDEPENDENCE WITHOUT HOSTILITY',
      paragraphs: [
        'Himalayan Dispatch does not consider existing media organizations its adversaries.',
        'It recognizes the indispensable role of journalism and the difficult circumstances under which many journalists operate.',
        'Its creation is not an accusation against an entire profession.',
        'Rather, it is an institutional response to an experienced gap in environmental communication.',
        'The publication welcomes professional collaboration, independent contributions, constructive criticism, scientific disagreement and responsible engagement with other media institutions.',
        'It must also remain willing to question its own conclusions, acknowledge its mistakes and publish corrections when evidence demands them.',
        'Independence without accountability is not responsible journalism.',
      ],
    },
    {
      id: 'our-commitment',
      roman: 'VIII',
      heading: 'OUR COMMITMENT',
      paragraphs: [
        'Himalayan Dispatch exists to investigate environmental issues without unnecessary geographical restrictions, communicate scientific knowledge without compromising its integrity and provide a responsible platform for ecological concerns that deserve public attention.',
        'Its responsibility is not to governments, political movements, commercial interests or the personal preferences of its founder.',
        'Its responsibility is to evidence, ecological integrity, the public interest and generations yet to come.',
      ],
    },
    {
      id: 'the-voice-we-decided-to-create',
      roman: 'IX',
      heading: 'THE VOICE WE DECIDED TO CREATE',
      paragraphs: [
        'For two years, we waited for someone to reach back.',
        'Eventually, we understood that the environmental future of the Western Himalayas was too important to remain dependent on whether someone would return our correspondence.',
        'We stopped waiting for a platform.',
        'We decided to build one.',
        'Himalayan Dispatch is that decision.',
        'A voice for landscapes that cannot speak.',
        'A platform for scientific concerns that deserve to be heard.',
        'A record of environmental transformations that future generations deserve to understand.',
        'A publication born from silence, committed to ensuring that silence does not become the permanent condition of environmental truth.',
      ],
      cadenceParagraphIndices: [5, 6, 7],
    },
  ] as readonly FoundingStoryChapter[],
  colophon: {
    name: 'HIMALAYAN DISPATCH',
    motto: 'LANDSCAPE. PEOPLE. SCIENCE. TRUTH.',
    established: 'Established 2026.',
    parentLineage: 'An official publication of Kashmir EcoWatch (KEW) Western Himalayan.',
    originLines: [
      'Published in the United States.',
      'Reporting from the Western Himalayas.',
      'Written for the world.',
    ],
    canonicalDomainDisplay: 'https://dispatch.kashmir-ecowatch.com',
  },
} as const;
