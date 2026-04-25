function CardsSection({
  active,
  patients,
  doctors,
  loading,
  error,
  onEditPaciente,
  onDeletePaciente,
  onEditMedico,
  onDeleteMedico,
}) {
  if (loading) {
    return <section className="cards">Carregando...</section>;
  }

  return (
    <section className="cards">
      {active === "patients" &&
        (patients.length ? patients : []).map((patient) => (
          <article key={patient.id} className="card">
            <div className="card-header">
              <h2>{patient.nome ?? patient.name}</h2>
            </div>
            <div className="card-body">
              <div>
                <span className="label">CPF: </span>
                <span className="value">{patient.cpf}</span>
              </div>
              <div>
                <span className="label">Carteirinha: </span>
                <span className="value">
                  {patient.carteirinha ?? patient.card}
                </span>
              </div>
            </div>
            <div className="card-actions">
              <button
                type="button"
                className="text-button"
                onClick={() => onEditPaciente(patient)}
              >
                Editar
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={() => onDeletePaciente(patient.id)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}

      {active === "patients" && !patients.length && (
        <div className="empty-state">
          {error.patients || "Nenhum paciente cadastrado."}
        </div>
      )}

      {active === "doctors" &&
        (doctors.length ? doctors : []).map((doctor) => (
          <article key={doctor.id} className="card">
            <div className="card-header">
              <h2>{doctor.nome ?? doctor.name}</h2>
              <span className="pill">CRM {doctor.UFCRM ?? doctor.uf}</span>
            </div>
            <div className="card-body">
              <div>
                <span className="label">CRM: </span>
                <span className="value">{doctor.CRM ?? doctor.crm}</span>
              </div>
              <div>
                <span className="label">UF: </span>
                <span className="value">{doctor.UFCRM ?? doctor.uf}</span>
              </div>
            </div>
            <div className="card-actions">
              <button
                type="button"
                className="text-button"
                onClick={() => onEditMedico(doctor)}
              >
                Editar
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={() => onDeleteMedico(doctor.id)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}

      {active === "doctors" && !doctors.length && (
        <div className="empty-state">
          {error.doctors || "Nenhum medico cadastrado."}
        </div>
      )}
    </section>
  );
}

export default CardsSection;
