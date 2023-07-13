import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { TransferenciaPage } from "../../types/transferencia";
import axios from "axios";
import { BASE_URL } from "../../utils/requests";
import { ContaContext } from "../../context/ContaContext";
import { useNavigate } from "react-router-dom";
import { formatLocalDate } from "../../utils/format";


const Transferencias = () => {
    const context = useContext(ContaContext);
    const navigate = useNavigate();

    // Filtros
    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();
    const [nomeOperador, setNomeOperador] = useState();

    const [saldoTotal, setSaldoTotal] = useState(0);
    const [saldoPeriodo, setSaldoPeriodo] = useState(0);

    const [paginaAtiva, setPaginaAtiva] = useState(0);
    const [pagina, setPagina] = useState<TransferenciaPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    const obterTransferencias = async () => {
        if (!context?.conta) {
            navigate("/");
            return;
        }

        const params = {
            idConta: context?.conta.id,
            pagina: pagina.number,
            registrosPorPagina: pagina.numberOfElements,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            nomeOperador: nomeOperador
        }

        axios.get(`${BASE_URL}/transferencias/page`, { params })
        .then(response => {
            setPagina(response.data.transferencias);
            setSaldoTotal(response.data.saldoTotal);
            setSaldoPeriodo(response.data.saldoPeriodo);
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        obterTransferencias();
    }, [paginaAtiva]);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="d-flex">
                    <p className="me-5 m-0">Saldo total: R$ {saldoTotal.toFixed(2)}</p>
                    <p className="m-0">Saldo no período: R$ {saldoPeriodo.toFixed(2)}</p>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Valentia</th>
                                <th>Tipo</th>
                                <th>Nome operador transacionado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagina.content?.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{formatLocalDate(item.dataTransferencia, "dd/MM/yyyy")}</td>
                                    <td>R$ {item.valor.toFixed(2)}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.nomeOperadorTransacao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Transferencias;