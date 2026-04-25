import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import PageHeader from "./components/PageHeader.jsx";
import CardsSection from "./components/CardsSection.jsx";
import CadastroPacienteModal from "./components/CadastroPacienteModal.jsx";
import CadastroMedicoModal from "./components/CadastroMedicoModal.jsx";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";
import ToastMessage from "./components/ToastMessage.jsx";

function App() {
  const patientsUrl =
    import.meta.env.VITE_PATIENTS_API ||
    "http://localhost:3001/api/v1/pacientes";
  const doctorsUrl =
    import.meta.env.VITE_DOCTORS_API || "http://localhost:3002/api/v1/medicos";

  const [active, setActive] = useState("patients");
  const [collapsed, setCollapsed] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ patients: "", doctors: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingPacienteId, setEditingPacienteId] = useState(null);
  const [editingMedicoId, setEditingMedicoId] = useState(null);
  const [confirmState, setConfirmState] = useState({
    open: false,
    type: "patients",
    id: null,
    name: "",
  });
  const [toast, setToast] = useState(null);
  const [pacienteForm, setPacienteForm] = useState({
    nome: "",
    dataNascimento: "",
    carteirinha: "",
    cpf: "",
  });
  const [medicoForm, setMedicoForm] = useState({
    nome: "",
    CRM: "",
    UFCRM: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError({ patients: "", doctors: "" });

    const requests = await Promise.allSettled([
      fetch(patientsUrl),
      fetch(doctorsUrl),
    ]);

    const [patientsResult, doctorsResult] = requests;

    if (patientsResult.status === "fulfilled") {
      if (patientsResult.value.ok) {
        const patientsData = await patientsResult.value.json();
        setPatients(patientsData);
      } else {
        setError((prev) => ({
          ...prev,
          patients: "Pacientes indisponiveis no momento.",
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        patients: "Falha ao carregar pacientes.",
      }));
    }

    if (doctorsResult.status === "fulfilled") {
      if (doctorsResult.value.ok) {
        const doctorsData = await doctorsResult.value.json();
        setDoctors(doctorsData);
      } else {
        setError((prev) => ({
          ...prev,
          doctors: "Medicos indisponiveis no momento.",
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        doctors: "Falha ao carregar medicos.",
      }));
    }

    setLoading(false);
  }, [doctorsUrl, patientsUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadData]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  function openModal() {
    setPacienteForm({
      nome: "",
      dataNascimento: "",
      carteirinha: "",
      cpf: "",
    });
    setMedicoForm({
      nome: "",
      CRM: "",
      UFCRM: "",
    });
    setModalMode("create");
    setEditingPacienteId(null);
    setEditingMedicoId(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function showToast(message, type) {
    setToast({ message, type });
  }

  function openDeletePaciente(paciente) {
    setConfirmState({
      open: true,
      type: "patients",
      id: paciente.id,
      name: paciente.nome ?? "",
    });
  }

  function openDeleteMedico(medico) {
    setConfirmState({
      open: true,
      type: "doctors",
      id: medico.id,
      name: medico.nome ?? "",
    });
  }

  function closeConfirm() {
    setConfirmState({ open: false, type: "patients", id: null, name: "" });
  }

  function openEditPaciente(paciente) {
    setPacienteForm({
      nome: paciente.nome ?? "",
      dataNascimento: paciente.dataNascimento ?? "",
      carteirinha: paciente.carteirinha ?? "",
      cpf: paciente.cpf ?? "",
    });
    setModalMode("edit");
    setEditingPacienteId(paciente.id);
    setIsModalOpen(true);
  }

  function openEditMedico(medico) {
    setMedicoForm({
      nome: medico.nome ?? "",
      CRM: medico.CRM ?? medico.crm ?? "",
      UFCRM: medico.UFCRM ?? medico.uf ?? "",
    });
    setModalMode("edit");
    setEditingMedicoId(medico.id);
    setIsModalOpen(true);
  }

  function handlePacienteChange(event) {
    const { name, value } = event.target;
    setPacienteForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleMedicoChange(event) {
    const { name, value } = event.target;
    setMedicoForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitPaciente(event) {
    event.preventDefault();

    try {
      if (
        !pacienteForm.nome ||
        !pacienteForm.carteirinha ||
        !pacienteForm.cpf
      ) {
        alert("Preencha nome, carteirinha e CPF.");
        return;
      }

      const method = modalMode === "edit" ? "PUT" : "POST";
      const url =
        modalMode === "edit"
          ? `${patientsUrl}/${editingPacienteId}`
          : patientsUrl;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: pacienteForm.nome,
          dataNascimento: pacienteForm.dataNascimento || null,
          carteirinha: pacienteForm.carteirinha,
          cpf: pacienteForm.cpf,
        }),
      });

      if (!response.ok) {
        showToast("Erro ao salvar paciente.", "error");
        return;
      }

      closeModal();
      loadData();
      showToast(
        modalMode === "edit"
          ? "Paciente atualizado com sucesso."
          : "Paciente criado com sucesso.",
        "success",
      );
    } catch {
      showToast("Erro ao salvar paciente.", "error");
    }
  }

  async function handleSubmitMedico(event) {
    event.preventDefault();

    try {
      if (!medicoForm.nome || !medicoForm.CRM || !medicoForm.UFCRM) {
        alert("Preencha nome, CRM e UFCRM.");
        return;
      }

      const method = modalMode === "edit" ? "PUT" : "POST";
      const url =
        modalMode === "edit" ? `${doctorsUrl}/${editingMedicoId}` : doctorsUrl;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: medicoForm.nome,
          CRM: medicoForm.CRM,
          UFCRM: medicoForm.UFCRM,
        }),
      });

      if (!response.ok) {
        showToast("Erro ao salvar medico.", "error");
        return;
      }

      closeModal();
      loadData();
      showToast(
        modalMode === "edit"
          ? "Medico atualizado com sucesso."
          : "Medico criado com sucesso.",
        "success",
      );
    } catch {
      showToast("Erro ao salvar medico.", "error");
    }
  }

  async function handleConfirmDelete() {
    const { type, id } = confirmState;

    try {
      const url = type === "patients" ? patientsUrl : doctorsUrl;
      const response = await fetch(`${url}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        showToast("Erro ao excluir registro.", "error");
        return;
      }

      closeConfirm();
      loadData();
      showToast("Registro excluido com sucesso.", "success");
    } catch {
      showToast("Erro ao excluir registro.", "error");
    }
  }

  return (
    <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
      <Sidebar
        active={active}
        collapsed={collapsed}
        onChange={setActive}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <main className="content">
        <PageHeader active={active} onAdd={openModal} />
        <CardsSection
          active={active}
          patients={patients}
          doctors={doctors}
          loading={loading}
          error={error}
          onEditPaciente={openEditPaciente}
          onDeletePaciente={openDeletePaciente}
          onEditMedico={openEditMedico}
          onDeleteMedico={openDeleteMedico}
        />
      </main>

      <CadastroPacienteModal
        isOpen={isModalOpen && active === "patients"}
        formData={pacienteForm}
        onChange={handlePacienteChange}
        onClose={closeModal}
        onSubmit={handleSubmitPaciente}
        title={modalMode === "edit" ? "Editar paciente" : "Cadastrar paciente"}
        submitLabel={modalMode === "edit" ? "Atualizar" : "Salvar"}
      />
      <CadastroMedicoModal
        isOpen={isModalOpen && active === "doctors"}
        formData={medicoForm}
        onChange={handleMedicoChange}
        onClose={closeModal}
        onSubmit={handleSubmitMedico}
        title={modalMode === "edit" ? "Editar medico" : "Cadastrar medico"}
        submitLabel={modalMode === "edit" ? "Atualizar" : "Salvar"}
      />

      <ConfirmDeleteModal
        isOpen={confirmState.open}
        name={confirmState.name}
        onCancel={closeConfirm}
        onConfirm={handleConfirmDelete}
      />

      <ToastMessage message={toast?.message} type={toast?.type} />
    </div>
  );
}

export default App;
