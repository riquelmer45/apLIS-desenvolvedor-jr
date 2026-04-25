function AplisLogo({ width = 180, showText = false }) {
  return (
    <div className="aplis-logo" style={{ width }}>
      <img src="/apLISicone.png" alt="apLIS" />
      {showText && (
        <div className="aplis-logo-text">
          <span className="aplis-logo-title">apLIS</span>
        </div>
      )}
    </div>
  );
}

export default AplisLogo;
