import AplisLogo from "./AplisLogo.jsx";

function Sidebar({ active, collapsed, onChange, onToggleCollapse }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <button
          type="button"
          className="logo-button"
          onClick={() => {
            if (collapsed) {
              onToggleCollapse();
            }
          }}
          aria-label="Expandir sidebar"
        >
          <AplisLogo width={collapsed ? 64 : 160} showText={!collapsed} />
        </button>
        <button
          type="button"
          className="collapse-button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          <svg
            className="collapse-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      </div>

      <nav className="nav">
        <button
          type="button"
          className={`nav-item ${active === "patients" ? "active" : ""}`}
          onClick={() => onChange("patients")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              <circle cx="12" cy="8" r="3" />
            </svg>
          </span>
          <span className="nav-label">Pacientes</span>
        </button>
        <button
          type="button"
          className={`nav-item ${active === "doctors" ? "active" : ""}`}
          onClick={() => onChange("doctors")}
        >
          <span className="nav-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 7h16" />
              <path d="M8 7v10" />
              <path d="M16 7v10" />
              <rect x="6" y="5" width="12" height="14" rx="3" />
            </svg>
          </span>
          <span className="nav-label">Medicos</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        <span className="footer-label">Sistema ativo</span>
      </div>
    </aside>
  );
}

export default Sidebar;
