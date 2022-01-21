import { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { ListarEnderecosUsuario } from "./services/requests";
import { mascaraCpf } from './functions/mascaraCpf';

const ModalVisualizar = (props) => {
  const [modal, setModal] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  const loadEnderecosUsuario = async () => {
    try {
      const response = await ListarEnderecosUsuario({
        id: props.usuario.id
      });

      if (response.status === 200) {
        console.log(response.data);
        setEnderecos(response.data);
      }
    } catch (error) {}
  };

  const fecharModal = useCallback(() => {
    setModal(false);

    setTimeout(function () {
      props.fechar();
      setModal(false);
    }, 500);
  }, [props]);

  useEffect(() => {
    setUsuario(props.usuario);
    loadEnderecosUsuario();
  }, [props.usuario]);

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
          Visualizar Usuário ID: {usuario.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control placeholder="" value={usuario.nome} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control placeholder="" value={usuario.cpf} />
        </Form.Group>

        <h6>Endereços</h6>

        <Table>
          <thead>
            <tr>
              <th>Endereço</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>
          {enderecos.length === 0 ? (
              <td colSpan={16} style={{textAlign: "center", padding: 10}}>Nenhum endereço encontrado.</td>
            ) : (
            enderecos.map((item) => (
              <tr>
                <td>{item.endereco}</td>
                <td>{item.numero}</td>
                <td>{item.complemento}</td>
                <td>{item.bairro}</td>
                <td>{item.cidade}</td>
                <td>{item.uf}</td>
                <td>{item.cep}</td>
              </tr>
            )
            ))}
          </tbody>
        </Table>
        
      {console.log(enderecos)}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => fecharModal()} variant="danger">
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVisualizar;
