export const Field = ({ name, type, required, recommended }) => {
  const label = required ? 'required' : recommended ? 'recommended' : null;

  return (
    <span
      aria-label={label ? `${name} (${label})` : name}
      className={label ? 'field-wrap has-field-tip' : 'field-wrap'}
      style={{ position: 'relative', cursor: label ? 'default' : undefined }}
      tabIndex={label ? 0 : undefined}
    >
      <code>{name}</code>
      {required && <span className="field-req"> *</span>}
      {recommended && <span className="field-rec"> ●</span>}
      {type && <><br />({type})</>}
      {label && (
        <span className="field-tip" role="tooltip">
          {label}
        </span>
      )}
    </span>
  );
};
