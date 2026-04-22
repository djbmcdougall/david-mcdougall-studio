export type WritingBorder = 'gold' | 'faint' | 'blue'

export interface WritingItem {
  id: string
  border: WritingBorder
  category: string
  title: string
  client: string
  description: string
  link: string
}

// TODO: David — replace with real writing samples and links
export const writing: WritingItem[] = [
  {
    id: 'w-01',
    border: 'blue',
    category: 'White Paper',
    title: 'Decentralised Media Distribution: A Framework for Broadcast',
    client: 'Tech Client',
    description: 'How blockchain infrastructure can replace traditional broadcast rights management.',
    link: '#', // TODO: David — replace with real PDF or URL
  },
  {
    id: 'w-02',
    border: 'faint',
    category: 'Brand Writing',
    title: 'Finding the Story in the Numbers',
    client: 'Brand Client',
    description: 'Case study in building a strapline from financial data and human truth.',
    link: '#',
  },
  {
    id: 'w-03',
    border: 'gold',
    category: 'Long-form Essay',
    title: 'Between the Borders: Notes from 13 Countries',
    client: 'Al Jazeera',
    description: 'Companion essay to the travel series — on movement, identity, and what cameras miss.',
    link: '#',
  },
  {
    id: 'w-04',
    border: 'blue',
    category: 'Methodology',
    title: 'The One-Man Studio: AI Production at Scale',
    client: 'Self-published',
    description: 'A practical framework for integrating Sora, Runway, ElevenLabs and Udio into documentary production.',
    link: '#',
  },
  {
    id: 'w-05',
    border: 'faint',
    category: 'Copy Sample',
    title: 'Luxury Without Apology',
    client: 'Hospitality Brand',
    description: 'Brand voice guidelines and copy system for a five-star hospitality group.',
    link: '#',
  },
  {
    id: 'w-06',
    border: 'gold',
    category: 'Treatment',
    title: 'The Climate Fixers',
    client: 'Documentary Proposal',
    description: 'Six-part investigative series treatment on grassroots climate engineering.',
    link: '#',
  },
]
