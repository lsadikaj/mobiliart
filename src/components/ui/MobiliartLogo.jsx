export default function MobiliartLogo({ size = 'md', light = false }) {
  const cfg = { sm: [13, 9], md: [20, 14], lg: [26, 18], xl: [52, 37] }
  const [fs, capH] = cfg[size] ?? cfg.md

  const lsPx = Math.round(fs * 0.28)
  const SW   = +((0.10 * fs) / (capH / 46)).toFixed(1)
  const gold = '#C9A84C'

  return (
    <span style={{
      fontFamily:    "'Josefin Sans', sans-serif",
      fontSize:      `${fs}px`,
      letterSpacing: `${lsPx}px`,
      lineHeight:    1,
      textTransform: 'uppercase',
      whiteSpace:    'nowrap',
      display:       'inline',
    }}>
      {/* MOBILI — weight 100, white */}
      <span style={{ color: light ? '#1a1a1a' : '#ffffff', fontWeight: 100 }}>MOBILI</span>

      {/* Λ — weight 400, solid gold, /\ no crossbar */}
      <span style={{ color: gold, fontWeight: 400 }}>Λ</span>

      {/* R — SVG: bowl (no left stem) + diagonal leg descending below baseline */}
      <svg
        viewBox="0 0 36 46"
        height={capH}
        width={Math.ceil(capH * 36 / 46)}
        aria-hidden="true"
        style={{
          display:       'inline-block',
          verticalAlign: 'top',
          marginTop:     0,
          marginRight:   `${lsPx}px`,
          overflow:      'visible',
          flexShrink:    0,
        }}
      >
        {/* Arc with horizontal terminals at start (top) and end (bottom),
            leg starts well to the right of the arc's end point */}
        <path
          d="M 0,1 L 8,1 C 10,0 33,3 33,15 C 33,29 11,31 7,31 L 14,31 L 33,58"
          stroke={gold} strokeWidth={SW}
          strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      </svg>

      {/* T — weight 400, solid gold */}
      <span style={{ color: gold, fontWeight: 400 }}>T</span>
    </span>
  )
}
