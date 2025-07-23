import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';


export default function FormCategoriaProduto() {
    //Vão armazenar cada input do usuário
    const [descricao, setDescricao] = useState();
    const { state } = useLocation();
    const [idCategoria, setIdCategoria] = useState();

    useEffect(() => {
        //consulta os dados do cliente e seta cada informação
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/categoria/" + state.id)
                .then((response) => {
                    setIdCategoria(response.data.id)
                    setDescricao(response.data.descricao)
                })
        }
    }, [state])
    function salvar() {
        //associando os inputs do usuário aos atributos do cliente request
        let categoriaProdutoRequest = {
            descricao: descricao
        }

        if (idCategoria != null) { //Alteração:
            axios.put("http://localhost:8080/api/categoria/" + idCategoria, categoriaProdutoRequest)
                .then((response) => { console.log('Categoria alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar categoria.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/categoria", categoriaProdutoRequest)
                .then((response) => { console.log('Categoria cadastrada com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir categoria.') })
        }
    }


    return (
        <div>
            <MenuSistema tela={'/form-categoria'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idCategoria === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoria != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            
                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />

                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-categoria'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div >
        </div >
    );
}
