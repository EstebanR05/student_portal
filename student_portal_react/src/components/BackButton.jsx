function BackButton({ onClick, label = "Volver" }) {
  return (
    <button
      type="button"
      className="back-icon-btn"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
  );
}

export default BackButton;
