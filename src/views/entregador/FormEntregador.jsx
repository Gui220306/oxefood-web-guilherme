import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Radio, Select } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

const estadoOptions = [
    { key: 'al', value: 'AL', text: 'Alagoas' },
    { key: 'pb', value: 'PB', text: 'Paraíba' },
    { key: 'pe', value: 'PE', text: 'Pernambuco' },
];

export default function FormEntregador() {

    //Vão armazenar cada input do usuário
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [quanCorridas, setQuanCorridas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [ativo, setAtivo] = useState(true);
    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    useEffect(() => {
        //consulta os dados do cliente e seta cada informação
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQuanCorridas(response.data.quanCorridas)
                    setValorFrete(response.data.valorFrete)
                    setRua(response.data.rua)
                    setNumero(response.data.numero)
                    setBairro(response.data.bairro)
                    setCidade(response.data.cidade)
                    setCep(response.data.cep)
                    setUf(response.data.uf)
                    setComplemento(response.data.complemento)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state])
    function salvar() {
        //associando os inputs do usuário aos atributos do cliente request
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            quanCorridas: quanCorridas,
            valorFrete: valorFrete,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            uf: uf,
            complemento: complemento,
            ativo: ativo
        };
        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { console.log('Entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um entregador.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { console.log('Entregador cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o entregador.') })
        }
    }
    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
//abaixo faz a diferenciação do titulo alteração e cadastro
    return (
        <div>
            <MenuSistema tela={'/form-entregador'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input required fluid label='CPF'>
                                    <InputMask
                                        required mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input fluid label='RG' width={6}>
                                    <InputMask
                                        required mask="99.999.999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input fluid label='DT Nasc.' placeholder='Ex: 19/02/1990'>
                                    <InputMask
                                        required mask="99/99/9999"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input required fluid label='Fone Celular'>
                                    <InputMask
                                        required mask="(99) 9 9999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input fluid label='Fone Fixo' maxLength="100">
                                    <InputMask
                                        required mask="(99) 9999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid label='QTD de Entregas Realizadas'
                                    maxLength="100"
                                    width={12}
                                    value={quanCorridas}
                                    onChange={e => setQuanCorridas(e.target.value)}
                                />
                                <Form.Input
                                    fluid label='Valor Por Frete'
                                    maxLength="100" width={12}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)} />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid label='Rua'
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                />
                                <Form.Input
                                    fluid label='Número'
                                    maxLength="100"
                                    width={6}
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)} />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    maxLength="100"
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                />
                                <Form.Input
                                    fluid label='CEP'
                                    maxLength="100"
                                    width={6}>
                                    <InputMask
                                        required
                                        mask="99999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input required>
                                    <label>UF</label>
                                    <Select
                                        placeholder='Selecione'
                                        options={estadoOptions}
                                        value={uf}
                                        onChange={(e, { value }) => setUf(value)}
                                    />

                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths={'equal'}>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    maxLength="100"
                                    value={complemento}
                                    onChange={e => setComplemento(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group inline>
                                <label style={{ fontWeight: 'bold' }}>Ativo:</label>
                                <Form.Field
                                    control={Radio}
                                    label='Sim'
                                    value={true}
                                    checked={ativo === true}
                                    onChange={(e, { value }) => setAtivo(value)}
                                />

                                <Form.Field
                                    control={Radio}
                                    label='Não'
                                    value={false}
                                    checked={ativo === false}
                                    onChange={(e, { value }) => setAtivo(value)}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-entregador'}>
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
            </div>
        </div>
    );
}

