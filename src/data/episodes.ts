export interface Episode {
  ep: number
  title: string
  location: string
  youtubeId: string
  thumb: string
}

// Titles/locations are placeholders — update with real episode names when available
export const episodes: Episode[] = [
  { ep: 1,  title: 'Episode 1',  location: 'Al Jazeera', youtubeId: 'bjDVnSfkeqE', thumb: '/travel/ep01.jpg' },
  { ep: 2,  title: 'Episode 2',  location: 'Al Jazeera', youtubeId: '1fI5djoWdcU', thumb: '/travel/ep02.jpg' },
  { ep: 3,  title: 'Episode 3',  location: 'Al Jazeera', youtubeId: 'TWRNtbZLH9g', thumb: '/travel/ep03.jpg' },
  { ep: 4,  title: 'Episode 4',  location: 'Al Jazeera', youtubeId: 'IVWMwaGavqE', thumb: '/travel/ep04.jpg' },
  { ep: 5,  title: 'Episode 5',  location: 'Al Jazeera', youtubeId: 'bcU-mg1Ur0Y', thumb: '/travel/ep05.jpg' },
  { ep: 6,  title: 'Episode 6',  location: 'Al Jazeera', youtubeId: 'eAt1TRjCIR0', thumb: '/travel/ep06.jpg' },
  { ep: 7,  title: 'Episode 7',  location: 'Al Jazeera', youtubeId: 'TWRNtbZLH9g', thumb: '/travel/ep07.jpg' },
  { ep: 8,  title: 'Episode 8',  location: 'Al Jazeera', youtubeId: 'vsLx8PCYD9Q', thumb: '/travel/ep08.jpg' },
  { ep: 9,  title: 'Episode 9',  location: 'Al Jazeera', youtubeId: 'JOoNAFuKFlM', thumb: '/travel/ep09.jpg' },
  { ep: 10, title: 'Episode 10', location: 'Al Jazeera', youtubeId: '8I9SUR2UU2Q', thumb: '/travel/ep10.jpg' },
  { ep: 11, title: 'Episode 11', location: 'Al Jazeera', youtubeId: 'TlD3N74CI4Y', thumb: '/travel/ep11.jpg' },
  { ep: 12, title: 'Episode 12', location: 'Al Jazeera', youtubeId: 'YP766izDhL4', thumb: '/travel/ep12.jpg' },
  { ep: 13, title: 'Episode 13', location: 'Al Jazeera', youtubeId: 'oizjojzg1p8', thumb: '/travel/ep13.jpg' },
  { ep: 14, title: 'Episode 14', location: 'Al Jazeera', youtubeId: 'JYEItq8kg0Y', thumb: '/travel/ep14.jpg' },
  { ep: 15, title: 'Episode 15', location: 'Al Jazeera', youtubeId: 'DhzSlkMG83s', thumb: '/travel/ep15.jpg' },
]
