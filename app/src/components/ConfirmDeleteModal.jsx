function ConfirmDeleteModal({ isOpen, name, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirmar exclusao</h2>
          <button type="button" className="modal-close" onClick={onCancel}>
            ×
          </button>
        </div>
        <p className="confirm-text">
          Deseja remover {name || "este registro"}?
        </p>
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="danger-button" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
