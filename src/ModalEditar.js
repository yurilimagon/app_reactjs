import { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { EditarUsuarios, ExcluirEnderecosUsuario, ListarEnderecosUsuario } from "./services/requests";
import ModalNovoEndereco from './ModalNovoEndereco';

const ModalEditar = (props) => {
  const [modal, setModal] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const [modalNovoEndereco, setModalNovoEndereco] = useState("");

  const loadEnderecosUsuario = async () => {
    try {
      const response = await ListarEnderecosUsuario({
        id: props.usuario.id,
      });

      if (response.status === 200) {
        console.log(response.data);
        setEnderecos(response.data);
      }
    } catch (error) {}
  };

  const ExcluirEndereco = async (id) => {
    try {
      await ExcluirEnderecosUsuario({id: id});
      loadEnderecosUsuario();
    } catch (error) {
      console.log(error.message);
    }
  }

  const EditarUsuario = async () => {
    await EditarUsuarios({
      id: usuario.id,
      nome: nome,
      cpf: cpf
    }); 
    
    props.reload()
  }

  const fecharModal = useCallback(() => {
    setModal(false);

    setTimeout(function () {
      props.fechar();
      setModal(false);
    }, 500);
  }, [props]);

  useEffect(() => {
    setUsuario(props.usuario);
    setNome(props.usuario.nome);
    setCpf(props.usuario.cpf);
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
          Editar Usuário ID: {usuario.id}
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
            placeholder=""
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Form.Group>
        <div style={{display: "flex", justifyContent: "right"}}>
          <Button onClick={() => {EditarUsuario()}} variant="success">
            Salvar
          </Button>
        </div>

        <h6 style={{marginTop: 10}}>Endereços</h6>

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
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {enderecos.length === 0 ? (
              <td colSpan={16} style={{ textAlign: "center", padding: 10 }}>
                Nenhum endereço encontrado.
              </td>
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
                  <td>
                    <Button variant="danger" onClick={()=> ExcluirEndereco(item.id)}>Excluir</Button>{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Button
          onClick={() =>
            setModalNovoEndereco(
              <ModalNovoEndereco
                fechar={() => setModalNovoEndereco("")}
                reload={() => loadEnderecosUsuario()}
                usuarioId={props.usuario.id}
              />
            )
          }
          variant="success"
        >
          Adicionar Endereço
        </Button>

        {console.log(enderecos)}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => fecharModal()} variant="danger">
          Fechar
        </Button>
      </Modal.Footer>
      {modalNovoEndereco && modalNovoEndereco}
    </Modal>
  );
};

export default ModalEditar;
