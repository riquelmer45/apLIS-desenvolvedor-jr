function CadastroMedicoModal({
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
          <h2>{title || "Cadastrar medico"}</h2>
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
            CRM
            <input
              name="CRM"
              value={formData.CRM}
              onChange={onChange}
              required
            />
          </label>
          <label>
            UFCRM
            <input
              name="UFCRM"
              value={formData.UFCRM}
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

export default CadastroMedicoModal;
