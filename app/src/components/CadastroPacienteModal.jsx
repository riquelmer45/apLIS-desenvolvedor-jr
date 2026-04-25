function CadastroPacienteModal({
  isOpen,
  formData,
  onChange,
  onClose,
  onSubmit,
  title,
  submitLabel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{title || "Cadastrar paciente"}</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <label>
            Nome
            <input
              name="nome"
              value={formData.nome}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Data de nascimento
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={onChange}
            />
          </label>
          <label>
            Carteirinha
            <input
              name="carteirinha"
              value={formData.carteirinha}
              onChange={onChange}
              required
            />
          </label>
          <label>
            CPF
            <input
              name="cpf"
              value={formData.cpf}
              onChange={onChange}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary">
              {submitLabel || "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroPacienteModal;
