function PageHeader({ active, onAdd }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Gestao clinica</p>
        <h1>{active === "patients" ? "Pacientes" : "Medicos"}</h1>
        <p className="subtitle">
          {active === "patients"
            ? "Visao rapida dos pacientes cadastrados"
            : "Equipe medica registrada no sistema"}
        </p>
      </div>
      <button className="primary" onClick={onAdd}>
        {active === "patients" ? "Cadastrar paciente" : "Cadastrar medico"}
      </button>
    </header>
  );
}

export default PageHeader;
