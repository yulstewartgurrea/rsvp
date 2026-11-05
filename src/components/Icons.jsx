function Icon({ className = 'size-5', children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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

// For the day's schedule: wedding rings, a toast, dinner and music.
export function RingsIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="14.5" r="5.5" />
      <circle cx="15" cy="14.5" r="5.5" />
      <path d="M7.4 7.6 9 5.6l1.6 2L9 9.1z" />
    </Icon>
  )
}

export function ToastIcon(props) {
  return (
    <Icon {...props}>
      <g transform="rotate(-16 8 12)">
        <path d="M5.6 4h4.8l-.5 6.2a1.9 1.9 0 0 1-3.8 0z" />
        <path d="M8 12.1V20M5.8 20h4.4" />
      </g>
      <g transform="rotate(16 16 12)">
        <path d="M13.6 4h4.8l-.5 6.2a1.9 1.9 0 0 1-3.8 0z" />
        <path d="M16 12.1V20M13.8 20h4.4" />
      </g>
      <path d="M12 1.2v1.6M10 2l.8 1M14 2l-.8 1" />
    </Icon>
  )
}

export function DinnerIcon(props) {
  return (
    <Icon {...props}>
      <g transform="rotate(38 12 12)">
        <path d="M10 2v5a2 2 0 0 0 4 0V2M12 2v5M12 9v13" />
      </g>
      <g transform="rotate(-38 12 12)">
        <path d="M12 2c2.2 1.6 2.8 5.4 2.2 9H12zM12 11v11" />
      </g>
    </Icon>
  )
}

export function MusicIcon(props) {
  return (
    <Icon {...props}>
      <path d="M9 18V5.5L20 3v12.5M9 9.5 20 7" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="15.5" r="2.5" />
    </Icon>
  )
}
