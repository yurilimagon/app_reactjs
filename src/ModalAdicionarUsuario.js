import { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  AdicionarUsuarios,
} from "./services/requests";
import { isValidCPF } from './functions/validadorCpf';

const ModalAdicionarUsuario = (props) => {
  const [modal, setModal] = useState(true);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfValid, setCpfValid] = useState(false);

  const AdicionarUsuario = async () => {
    await AdicionarUsuarios({
      nome: nome,
      cpf: cpf,
    });

    setNome("");
    setCpf("");

    props.reload();
  };

  const fecharModal = useCallback(() => {
    setModal(false);

    setTimeout(function () {
      props.fechar();
      setModal(false);
    }, 500);
  }, [props]);

  useEffect(() => {}, [cpfValid]);

  return (
    <Modal
      show={modal}
      onHide={() => fecharModal()}
      size="xl"
      backdrop="static"
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adicionar Usuário
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            placeholder=""
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            isInvalid={!cpfValid}
            isValid={cpfValid}
            placeholder=""
            value={cpf}
            onChange={(e) => {
              setCpf(e.target.value)
              setCpfValid(isValidCPF(e.target.value))
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => AdicionarUsuario()} variant="success" disabled={!cpfValid}>
          Salvar
        </Button>
        <Button onClick={() => fecharModal()} variant="danger">
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdicionarUsuario;
