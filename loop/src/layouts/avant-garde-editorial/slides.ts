import type { AvantGardeEditorialContract } from './schema';

const slides: AvantGardeEditorialContract = {
  slides: [
    {
      id: 'ag-cover-1', type: 'cover',
      metaIndex: '01',
      headlineMain: 'THE ART OF FORM',
      headlineHighlight: 'IN MOTION',
      subheadline: 'VOLUME III / 2026 EDITION',
      bodyColumn: 'A comprehensive study on modern minimalism, structured silhouettes, and avant-garde aesthetic frameworks.',
      websiteUrl: 'www.yourbrand.com',
      badgeLabel: 'CURATED EDITION • 2026',
      mockupImage: 'https://placehold.co/400x500/C8102E/FFFFFF/png?text=CATALOG',
      footerLeft: 'EDITORIAL', footerRight: '01',
    },
    {
      id: 'ag-quote-1', type: 'quote',
      metaIndex: '02',
      headlineMain: 'DESIGN IS THE EXPRESSION OF INTENT',
      headlineHighlight: 'MADE VISIBLE',
      subheadline: 'SCHEDULE A CONSULTATION TODAY',
      websiteUrl: 'www.yourbrand.com',
      badgeLabel: 'SPECIAL FEATURE',
      footerLeft: 'VOICES', footerRight: '02',
    },
    {
      id: 'ag-def-1', type: 'definition',
      tag: 'LEXICON // 01',
      term: 'Avant-garde',
      phonetic: '/ˌavɑː̃ːtˈɡɑːrd/',
      definition: 'Innovation at the forefront of art and culture. A push beyond conventional boundaries into uncharted creative territory.',
      example: 'e.g., Rei Kawakubo\'s deconstructed silhouettes for Comme des Garçons.',
      footerLeft: 'GLOSSARY', footerRight: '03',
    },
    {
      id: 'ag-catalog-1', type: 'editorial-catalog',
      mainHeadline: 'THE CURATED COLLECTION',
      productMockupUrl: 'https://placehold.co/400x520/111111/FFFFFF/png?text=LOOKBOOK',
      badgeText: 'LIMITED EDITION',
      footerLeft: 'CATALOG', footerRight: '04',
    },
    {
      id: 'ag-cta-1', type: 'cta',
      metaIndex: '05',
      mainHeadline: 'EXPLORE THE FULL COLLECTION',
      bodyColumn: 'Discover all curated layouts and template designs. Connect with our team for custom studio inquiries.',
      ctaButtonText: 'BOOK AN APPOINTMENT',
      websiteUrl: 'www.yourbrand.com',
      footerLeft: 'INQUIRIES', footerRight: '05',
    },
  ],
};

export default slides;
