// Everything guests read on the site lives here.
// To use your own photos, drop them in public/images/ and replace a
// placeholder with its path, e.g. photo: '/images/yul.jpg'.

const placeholder = (width, height, label) =>
  `https://placehold.co/${width}x${height}/e9e0d5/6b5c50?text=${encodeURIComponent(label)}`

export const wedding = {
  coupleNames: 'Yul & Pearl',

  // Used by the countdown. Keep the UTC offset of your venue's time zone at the end.
  date: '2027-05-16T15:00:00+08:00',
  // Shown as-is wherever the date is printed.
  dateLabel: 'May 16, 2027',
  location: 'Your City, Your Country',

  login: {
    // The envelope carries no printed words; these two lines are read out by screen readers.
    eyebrow: "You're invited",
    heading: 'A celebration worth remembering.',
    placeholder: 'Enter your invitation code',
    button: 'Open Invitation',
  },

  // The invitation card found inside the envelope as it opens, and at the top of the main page.
  // Its names, date and place come from the rest of this file (the venue from the first event).
  invitation: {
    intro: 'Together with their families',
    invite: 'invite you to celebrate their wedding',
    time: 'At three o’clock in the afternoon',
  },

  partners: [
    {
      name: 'Yul',
      fullName: 'Yul',
      photo: placeholder(600, 750, 'Yul portrait'),
      bio: 'A few lines about Yul: what they love, what they do, and the moment they knew Pearl was the one.',
    },
    {
      name: 'Pearl',
      fullName: 'Pearl',
      photo: placeholder(600, 750, 'Pearl portrait'),
      bio: 'A few lines about Pearl: favourite things, a fun fact, and why Yul makes every day better.',
    },
  ],

  welcome: {
    image: placeholder(1920, 1080, 'Welcome banner photo'),
    title: 'Welcome to our big day',
    text: 'We are so happy to celebrate with the people we love most. Below you will find everything you need for the day: where to be, when to be there, and how to let us know you are coming.',
  },

  // `id` is what gets saved with each RSVP, so keep it short and don't change it after guests reply.
  events: [
    {
      id: 'ceremony',
      title: 'Wedding Ceremony',
      date: 'Sunday, May 16, 2027',
      time: '3:00 PM – 4:00 PM',
      venue: 'Venue name',
      address: 'Street address, City',
      mapUrl: 'https://maps.google.com/?q=Venue+name',
      description: 'Join us as we say our vows. Please arrive 20 minutes early so we can start on time.',
      image: placeholder(900, 675, 'Ceremony venue'),
    },
    {
      id: 'party',
      title: 'Wedding Party',
      date: 'Sunday, May 16, 2027',
      time: '4:30 PM – 6:00 PM',
      venue: 'Garden terrace',
      address: 'Street address, City',
      mapUrl: 'https://maps.google.com/?q=Garden+terrace',
      description: 'Drinks, music and photos in the garden while the sun goes down.',
      image: placeholder(900, 675, 'Party venue'),
    },
    {
      id: 'dinner',
      title: 'Wedding Dinner',
      date: 'Sunday, May 16, 2027',
      time: '6:30 PM – 11:00 PM',
      venue: 'Reception hall',
      address: 'Street address, City',
      mapUrl: 'https://maps.google.com/?q=Reception+hall',
      description: 'Dinner, speeches and dancing late into the night.',
      image: placeholder(900, 675, 'Dinner venue'),
    },
  ],

  rsvp: {
    deadline: 'May 1, 2027',
    // Most people a single RSVP can bring, including the person replying.
    maxGuests: 5,
  },

  travel: [
    {
      title: 'Transportation',
      text: 'Tell guests how to get there: the nearest airport, parking at the venue, shuttle times, or ride-share tips.',
      image: placeholder(1600, 700, 'Transportation photo'),
    },
    {
      title: 'Accommodations',
      text: 'List nearby hotels, any room blocks you have reserved, and the booking code guests should use.',
      image: placeholder(1600, 700, 'Accommodations photo'),
    },
  ],

  footer: {
    image: placeholder(1920, 1080, 'Footer photo'),
    message: 'Thank you',
  },
}
