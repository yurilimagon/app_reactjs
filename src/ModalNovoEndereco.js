import { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { CadastrarEnderecosUsuario, ListarEnderecosUsuario, VerificarCep } from "./services/requests";

const ModalNovoEndereco = (props) => {
  const [modal, setModal] = useState(true);
  const [usuarioId, setUsuarioId] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [isCep, setIsCep] = useState(false);

  const VerificaCep = async (cep) => {
    try {
      const response = await VerificarCep({cep: cep.replace("-","")});
      
      if(response.status === 200){
        setIsCep(!response.data.erro)
        setCidade(response.data.localidade)
        setBairro(response.data.bairro)
        setEndereco(response.data.logradouro)
        setCep(response.data.cep)
        setUf(response.data.uf)
      }else{
        setIsCep(false)
      }
    } catch (error) {
      console.log(error.message);      
    }
  }
  
  const CadEnderecosUsuario = async () => {
    try {
      await CadastrarEnderecosUsuario({
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        cep: cep,
        usuario_id: usuarioId,
      });

      setEndereco("");
      setNumero("");
      setComplemento("");
      setBairro("");
      setCidade("");
      setUf("");
      setCep("");

      props.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const fecharModal = useCallback(() => {
    setModal(false);

    setTimeout(function () {
      props.fechar();
      setModal(false);
    }, 500);
  }, [props]);

  useEffect(() => {
    setUsuarioId(props.usuarioId)
  }, [cidade, isCep]);

  return (
    <Modal
      show={modal}
      onHide={() => fecharModal()}
      size="lg"
      backdrop="static"
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Novo Endereço
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            isInvalid={!isCep}
            isValid={isCep}
            placeholder=""
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </Form.Group>
        <Button onClick={() => VerificaCep(cep)} variant="success">
          Buscar CEP
        </Button>
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            placeholder=""
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Número</Form.Label>
          <Form.Control
            placeholder=""
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            placeholder=""
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bairro</Form.Label>
          <Form.Control
            placeholder=""
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            placeholder=""
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>UF</Form.Label>
          <Form.Control
            placeholder=""
            value={uf}
            onChange={(e) => setUf(e.target.value)}
          />
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => CadEnderecosUsuario()} variant="success" disabled={!isCep}>
          Salvar
        </Button>
        <Button onClick={() => fecharModal()} variant="danger">
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNovoEndereco;
