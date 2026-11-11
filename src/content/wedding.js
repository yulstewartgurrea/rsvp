// Everything guests read on the site lives here.

export const wedding = {
  coupleNames: 'Yul & Pearl',
  partners: [{ name: 'Yul' }, { name: 'Pearl' }],

  // Used by the countdown. Keep the UTC offset of your venue's time zone at the end.
  date: '2027-05-16T15:00:00+08:00',

  login: {
    // The envelope carries no printed words; these two lines are read out by screen readers.
    eyebrow: "You're invited",
    heading: 'A celebration worth remembering.',
    placeholder: 'Enter your invitation code',
    button: 'Open Invitation',
  },

  // The invitation at the top of the page, found inside the envelope as it opens. Its names, date
  // and place come from the rest of this file.
  invitation: {
    intro: 'Together with their families',
    invite: 'invite you to celebrate their wedding',
    time: 'At three o’clock in the afternoon',
  },

  // Shown on the invitation and under Venue / Location, with a link to the map.
  venue: {
    name: 'The Conservatory',
    tagline: 'Where the celebration unfolds',
    location: 'Dahilayan, Manolo Fortich, Bukidnon',
    mapUrl: 'https://maps.google.com/?q=The+Conservatory+Dahilayan+Manolo+Fortich+Bukidnon',
  },

  // The day, in order. `icon` is one of rings, toast, dinner or music. A guest who accepts is coming
  // to all of it.
  schedule: [
    { id: 'ceremony', time: '3:00 PM', title: 'Ceremony', icon: 'rings' },
    { id: 'cocktails', time: '4:30 PM', title: 'Cocktails', icon: 'toast' },
    { id: 'reception', time: '6:00 PM', title: 'Reception', icon: 'dinner' },
    { id: 'celebration', time: '8:00 PM', title: 'Celebration', icon: 'music' },
  ],

  dressCode: {
    title: 'Formal Attire',
    note: 'We would love for you to dress in your finest as we celebrate our special day.',
    sponsors: {
      title: 'Principal Sponsors',
      men: { title: 'For men', note: 'Black suit' },
      // Shown under the dresses as swatches; the names are read out by screen readers.
      women: {
        title: 'For women',
        note: 'Long formal dress in these colors',
        colors: [
          { name: 'Dusty Rose', hex: '#C58A8A' },
          { name: 'Burgundy', hex: '#81353A' },
        ],
      },
    },
    guests: {
      title: 'For Guests',
      men: { title: 'For men', note: 'Grey suit, polo, or a long-sleeve shirt' },
      women: { title: 'For women', note: 'Long or midi formal dress' },
      note: 'Guests may wear any of the wedding palette colors below.',
    },
    // The wedding palette: only the colours show; the names are read out by screen readers.
    colors: [
      { name: 'Blush Pink', hex: '#E1C1B6' },
      { name: 'Dusty Rose', hex: '#C58A8A' },
      { name: 'Cream', hex: '#E8DAC7' },
      { name: 'Soft Beige', hex: '#D9C9B6' },
    ],
    colorsNote: 'Guests may choose any of these colors.',
  },

  // `url` is where View options leads: for now, a map of places to stay near the venue.
  stay: {
    title: 'Recommended accommodations',
    note: 'A curated list of nearby stays for your convenience.',
    url: 'https://www.google.com/maps/search/hotels+near+Dahilayan,+Manolo+Fortich,+Bukidnon',
  },

  // Just before the RSVP. The ⁠ after the hyphen keeps "plus-ones" together on one line.
  plusOne: {
    title: 'Can I Bring a Plus One?',
    note: 'Due to limited seating, we cannot accommodate additional guests or plus-⁠ones. We hope you understand and can’t wait to share our special day with you.',
  },

  rsvp: {
    deadline: 'February 1, 2027',
    // From this moment (in the venue's time) the form takes no more replies, and says RSVPs have
    // closed. The database refuses them from the same moment (supabase/close-rsvps.sql), so change
    // both together.
    closesAt: '2027-02-01T00:00:00+08:00',
  },

  thankYou: 'We can’t wait to celebrate with you!',
}
