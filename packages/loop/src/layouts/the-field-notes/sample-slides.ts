export const theFieldNotesSlides = {
  slides: [
    {
      id: 'fn-01',
      type: 'cover',
      kicker: 'Entry 01 · User interviews',
      headline: 'What users *actually* do.',
      subheadline: 'Notes from twelve interviews, three cafés and one very honest grandmother.',
      meta: ['12 participants', '5 days', '4 min read'],
      authorName: 'Field site · Riyadh',
      authorRole: 'Research Journal',
    },
    {
      id: 'fn-02',
      type: 'sequence',
      headline: 'Five things I *noticed.*',
      items: [
        { num: '1', title: 'Nobody reads the onboarding', desc: 'They tapped ‘Skip’ before the first sentence finished.' },
        { num: '2', title: 'Labels beat icons', desc: 'Unlabelled icons were guessed wrong almost every time.' },
        { num: '3', title: 'Search is the real menu', desc: 'Most people searched before they browsed.' },
        { num: '4', title: 'Trust is built in the footer', desc: 'Several checked contact details before paying.' },
      ],
    },
    {
      id: 'fn-03',
      type: 'telemetry',
      headline: 'The study, *in numbers.*',
      stats: [
        { value: '12', unit: '', label: 'Interviews', desc: '45 minutes each, in context.' },
        { value: '38', unit: '', label: 'Pain points', desc: 'Clustered into 6 themes.' },
        { value: '4', unit: '×', label: 'Faster', desc: 'With the redesigned search.' },
        { value: '0', unit: '', label: 'Read the FAQ', desc: 'Not one participant.' },
      ],
    },
    {
      id: 'fn-04',
      type: 'quote',
      quote: 'I don’t need more features. I need *fewer decisions.*',
      author: 'Participant 07',
      role: 'Pharmacist, 41',
    },
    {
      id: 'fn-05',
      type: 'cta',
      headline: 'Go and *watch* someone use it.',
      subtext: 'Save this entry. Follow for the next page of the journal.',
      actionLabel: 'Save this entry',
      sign: 'see you in the field',
    },
  ],
};

export default theFieldNotesSlides;
