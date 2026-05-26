export const FieldLegend = ({ show }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const all = [
    { key: 'green', label: 'required', color: '#22c55e' },
    { key: 'amber', label: 'recommended', color: '#eab308' },
    { key: 'gray', label: 'optional', color: '#6b7280' },
    { key: 'orange', label: 'one of target required', color: '#f97316' },
    { key: 'blue', label: 'conditionally required', color: '#3b82f6' },
  ];

  const entries = show
    ? all.filter((e) => show.split(',').map((s) => s.trim()).includes(e.key))
    : all;

  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        role="button"
        tabIndex={0}
        title="Field requirement legend"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          border: '1.5px solid currentColor',
          opacity: 0.4,
          fontSize: '0.65rem',
          fontWeight: 600,
          fontStyle: 'italic',
          fontFamily: 'Georgia, "Times New Roman", serif',
          cursor: 'pointer',
          userSelect: 'none',
          lineHeight: 1,
          verticalAlign: 'middle',
          marginLeft: '0.35rem',
        }}
      >
        i
      </span>
      {open && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 'calc(100% + 0.4rem)',
            zIndex: 50,
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            padding: '0.4rem 0.7rem',
            borderRadius: '0.375rem',
            fontSize: '0.78rem',
            backgroundColor: 'var(--background-dark, #1a1a2e)',
            border: '1px solid var(--border-dark, rgba(255,255,255,0.08))',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}
        >
          {entries.map((e) => (
            <span key={e.key} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ color: e.color, fontSize: '0.55em', lineHeight: 1 }}>●</span>
              <span style={{ opacity: 0.7 }}>{e.label}</span>
            </span>
          ))}
        </span>
      )}
    </span>
  );
};
