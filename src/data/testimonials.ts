export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  linkedIn?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    quote: "He didn't shirk at the often tough conditions and remained sharply focused on the project brief. Consultative, willing to push back helpfully, and worked beyond expectations. I was very pleased with the work that David did for us and am happy to recommend him.",
    name: 'Quentin Hewitt',
    title: 'Nonprofit Development & Communications',
    company: 'Client',
    linkedIn: 'https://www.linkedin.com/in/quentin-hewitt',
  },
  {
    id: 't-02',
    quote: "Always kept control despite some disturbing circumstances. I highly appreciate his creativeness and solution driven attitude. If you consider somebody for a job like this with an excellent result you should contact him.",
    name: 'Ger Engelsman',
    title: 'Executive Search | Interim Management (C-level)',
    company: 'Client',
    linkedIn: 'https://www.linkedin.com/in/ger-engelsman',
  },
  {
    id: 't-03',
    quote: "An excellent story-teller, with a natural eye for setting and good fun to work with. David and his team put together a creative and compelling piece of work. I recommend him without hesitation.",
    name: 'Ethan Chorin',
    title: 'Founder & CEO, Red Sea Futures | Author, Benghazi: A New History',
    company: 'Client',
    linkedIn: 'https://www.linkedin.com/in/ethan-chorin',
  },
]
