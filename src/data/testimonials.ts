export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
}

// TODO: David — replace with real client quotes
export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    quote: "David delivered a finished film in the time our previous agency spent writing the brief. The quality was extraordinary — you'd never know it was made by one person.",
    name: 'Client Name',
    title: 'Head of Brand',
    company: 'Global Hospitality Group',
  },
  {
    id: 't-02',
    quote: "Twenty years of BBC instincts combined with tools none of us had seen used this way. He found the story we didn't know we had.",
    name: 'Client Name',
    title: 'Creative Director',
    company: 'Brand Agency',
  },
  {
    id: 't-03',
    quote: "The first filmmaker we've worked with who understood both the editorial brief and the distribution strategy. He wrote the treatment and designed the campaign.",
    name: 'Client Name',
    title: 'Commissioning Editor',
    company: 'Broadcaster',
  },
]
