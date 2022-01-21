import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

import { ExcluirUsuarios, ListarUsuarios } from "./services/requests";
import ModalVisualizar from "./ModalVisualizar";
import ModalEditar from "./ModalEditar";
import ModalAdicionarUsuario from "./ModalAdicionarUsuario";
import { mascaraCpf } from './functions/mascaraCpf';

function App() {
  const [modalVisualizar, setModalVisualizar] = useState("");
  const [modalAdicionar, setModalAdicionar] = useState("");
  const [modalEditar, setModalEditar] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const loadUsuarios = async () => {
    try {
      const response = await ListarUsuarios();

      if (response.status === 200) {
        console.log(response.data);
        setUsuarios(response.data);
      }
    } catch (error) {}
  };

  const ExcluirUsuario = async (id) => {
    try {
      await ExcluirUsuarios({ id: id });
      loadUsuarios();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadUsuarios();
    });
  }, []);


  return (
    <div
      style={{
        backgroundColor: "#ccc",
        width: "100vw",
        height: "100vh",
        paddingTop: 30,
      }}
    >
      <Container
        style={{
          padding: 10,
          textAlign: "center",
          backgroundColor: "#282c34",
          color: "white",
        }}
      >
        <h3 style={{ padding: 10 }}>Usuários</h3>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{mascaraCpf(item.cpf)}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      setModalVisualizar(
                        <ModalVisualizar
                          fechar={() => setModalVisualizar("")}
                          reload={() => loadUsuarios()}
                          usuario={item}
                        />
                      )
                    }
                  >
                    Visualizar
                  </Button>{" "}
                  <Button
                    variant="warning"
                    onClick={() =>
                      setModalEditar(
                        <ModalEditar
                          fechar={() => setModalEditar("")}
                          reload={() => loadUsuarios()}
                          usuario={item}
                        />
                      )
                    }
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => ExcluirUsuario(item.id)}
                  >
                    Excluir
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: "flex" }}>
          <Button
            variant="success"
            onClick={() =>
              setModalAdicionar(
                <ModalAdicionarUsuario
                  fechar={() => setModalAdicionar("")}
                  reload={() => loadUsuarios()}
                />
              )
            }
          >
            Adicionar Usuário
          </Button>{" "}
        </div>
      </Container>
      {modalVisualizar && modalVisualizar}
      {modalEditar && modalEditar}
      {modalAdicionar && modalAdicionar}
    </div>
  );
}

export default App;
