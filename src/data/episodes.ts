export interface Episode {
  ep: number
  title: string
  location: string
  thumb: string
}

// TODO: David — replace with real episode titles and locations
export const episodes: Episode[] = [
  { ep: 1,  title: 'The Edge of the Desert',    location: 'Morocco',       thumb: '/travel/ep-01.jpg' },
  { ep: 2,  title: 'Where the River Ends',       location: 'Ethiopia',      thumb: '/travel/ep-02.jpg' },
  { ep: 3,  title: 'City of a Thousand Trades',  location: 'Iran',          thumb: '/travel/ep-03.jpg' },
  { ep: 4,  title: 'The Last Nomads',            location: 'Mongolia',      thumb: '/travel/ep-04.jpg' },
  { ep: 5,  title: 'Salt and Stone',             location: 'Bolivia',       thumb: '/travel/ep-05.jpg' },
  { ep: 6,  title: 'Between Two Seas',           location: 'Georgia',       thumb: '/travel/ep-06.jpg' },
  { ep: 7,  title: 'The High Road',              location: 'Pakistan',      thumb: '/travel/ep-07.jpg' },
  { ep: 8,  title: 'Island at the End',          location: 'Cape Verde',    thumb: '/travel/ep-08.jpg' },
  { ep: 9,  title: 'Fire and Ice',               location: 'Iceland',       thumb: '/travel/ep-09.jpg' },
  { ep: 10, title: 'The Golden Triangle',        location: 'Myanmar',       thumb: '/travel/ep-10.jpg' },
  { ep: 11, title: 'Crossing the Divide',        location: 'Colombia',      thumb: '/travel/ep-11.jpg' },
  { ep: 12, title: 'Where Time Stopped',         location: 'Yemen',         thumb: '/travel/ep-12.jpg' },
  { ep: 13, title: 'The Road Home',              location: 'Scotland',      thumb: '/travel/ep-13.jpg' },
]
