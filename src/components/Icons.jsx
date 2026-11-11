function Icon({ className = 'size-5', strokeWidth = 1.6, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function LockIcon(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path d="M12 14.5v2" />
    </Icon>
  )
}

export function ArrowRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Icon>
  )
}

export function EyeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  )
}

export function EyeOffIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" />
    </Icon>
  )
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  )
}

export function PlusIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  )
}

export function CloseIcon(props) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  )
}

export function MapPinIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Icon>
  )
}

export function ExternalIcon(props) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Icon>
  )
}

// For the day's schedule: wedding rings with a diamond, a toast, dinner and music.
export function RingsIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="16" r="5.2" />
      <circle cx="15" cy="16" r="5.2" />
      <path d="M7 7.9 8.1 6.6h3.8L13 7.9 10 11.2zM7 7.9h6M9.3 6.6l-.5 1.3L10 11.2l1.2-3.3-.5-1.3" />
      <path d="M10 2.6v1.6M7 3.4l.9 1.2M13 3.4l-.9 1.2" />
    </Icon>
  )
}

export function ToastIcon(props) {
  return (
    <Icon {...props}>
      <g transform="rotate(-18 9 21)">
        <path d="M6.4 3.5h4.2l-.4 7a1.7 1.7 0 0 1-3.4 0zM6.6 7.5h3.8" />
        <path d="M8.5 12.3v8.2M6.4 20.5h4.2" />
      </g>
      <g transform="rotate(18 15 21)">
        <path d="M13.4 3.5h4.2l-.4 7a1.7 1.7 0 0 1-3.4 0zM13.6 7.5h3.8" />
        <path d="M15.5 12.3v8.2M13.4 20.5h4.2" />
      </g>
      <path d="M12 .8v1.6M9.6 1.4l.8 1.1M14.4 1.4l-.8 1.1" />
    </Icon>
  )
}

export function DinnerIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="5.6" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M2.2 4v3.6a1.4 1.4 0 0 0 2.8 0V4M3.6 4v4M3.6 9V20" />
      <path d="M20.8 4c1.4 1.5 1.6 4.8 1 7.6h-1zM20.8 11.6V20" />
    </Icon>
  )
}

// For the plus-one question: two guests, one with a plus, struck through.
export function NoPlusOneIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="7.5" cy="7.5" r="3.2" />
      <path d="M10 21.5H2V19a5.5 5.5 0 0 1 10-3.15" />
      <circle cx="15.5" cy="10" r="3.2" />
      <path d="M17.5 21.5H10V21a5.5 5.5 0 0 1 9.6-3.66M20.5 18.5v4M18.5 20.5h4" />
      <path d="M21.5 2.5 3.5 22.5" />
    </Icon>
  )
}

// For the note under Where to Stay: a bed, its headboard behind the mattress, with the corners cut
// off as in the user's design.
export function BedIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 10.9V7.6l1.1-1.1h11.8l1.1 1.1v3.3" />
      <path d="M2.5 17.5v-5.4l1.2-1.2h16.6l1.2 1.2v5.4M2.5 15.2h19" />
    </Icon>
  )
}

export function MusicIcon(props) {
  return (
    <Icon {...props}>
      <path d="M8.5 18V6.2L19.5 3.6v12M8.5 9.6l11-2.6" />
      <circle cx="6.2" cy="18" r="2.4" fill="currentColor" />
      <circle cx="17.2" cy="15.6" r="2.4" fill="currentColor" />
    </Icon>
  )
}

// For the music button while the song is off: the same notes, struck through.
export function MusicOffIcon(props) {
  return (
    <Icon {...props}>
      <path d="M8.5 18V6.2L19.5 3.6v12M8.5 9.6l11-2.6" />
      <circle cx="6.2" cy="18" r="2.4" fill="currentColor" />
      <circle cx="17.2" cy="15.6" r="2.4" fill="currentColor" />
      <path d="M2.5 2.5l19 19" />
    </Icon>
  )
}
