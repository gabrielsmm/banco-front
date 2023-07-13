import { useCallback, useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { TransferenciaPage } from "../../types/transferencia";
import axios from "axios";
import { BASE_URL } from "../../utils/requests";
import { ContaContext } from "../../context/ContaContext";
import { useNavigate } from "react-router-dom";
import { formatLocalDate } from "../../utils/format";

const handleDateChange = (dateString: string, setState: React.Dispatch<React.SetStateAction<Date | null>>) => {
    const dateObject = new Date(dateString);
    setState(dateObject);
};

const isNullOrUndefined = (obj: any) => {
    return obj === null || obj === undefined;
}

const Transferencias = () => {
    const context = useContext(ContaContext);
    const navigate = useNavigate();

    // Filtros
    const [dataInicial, setDataInicial] = useState<Date | null>(null);
    const [dataFinal, setDataFinal] = useState<Date | null>(null);
    const [nomeOperador, setNomeOperador] = useState<string | null>(null);

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

    const isFiltroValido = () => {
        return !isNullOrUndefined(dataInicial) || !isNullOrUndefined(dataFinal) || !isNullOrUndefined(nomeOperador);
    }

    const limparFiltro = () => {
        setDataInicial(null);
        setDataFinal(null);
        setNomeOperador(null);
    }

    const obterTransferencias = useCallback(async () => {
        if (!context?.conta) {
          navigate("/");
          return;
        }
      
        const params = {
          idConta: context?.conta.id,
          pagina: pagina.number,
          dataInicial: dataInicial,
          dataFinal: dataFinal,
          nomeOperador: nomeOperador
        };
      
        try {
          const response = await axios.get(`${BASE_URL}/transferencias/page`, { params });
          setPagina(response.data.transferencias);
          setSaldoTotal(response.data.saldoTotal);
          setSaldoPeriodo(response.data.saldoPeriodo);
        } catch (error) {
          console.error(error);
        }
    }, [context?.conta, pagina.number, dataInicial, dataFinal, nomeOperador]);

    useEffect(() => {
        obterTransferencias();
    }, [obterTransferencias]);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-2">
                        <label className="form-label w-100">
                            Data inicial
                            <input type="date" className="form-control" 
                            value={dataInicial ? dataInicial.toISOString().slice(0, 10) : ''} 
                            onChange={(e) => handleDateChange(e.target.value, setDataInicial)} />
                        </label>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label w-100">
                            Data final
                            <input type="date" className="form-control" 
                            value={dataFinal ? dataFinal.toISOString().slice(0, 10) : ''} 
                            onChange={(e) => handleDateChange(e.target.value, setDataFinal)} />
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label w-100">
                            Nome operador transacionado
                            <input type="text" className="form-control"
                            value={nomeOperador !== null ? nomeOperador : ''} onChange={(e) => setNomeOperador(e.target.value)} />
                        </label>
                    </div>
                    <div className="col-md-4 mt-4">
                        {isFiltroValido() && <button className="btn btn-danger" onClick={limparFiltro}>Limpar filtro</button>}
                    </div>
                </div>
                <div className="d-flex">
                    <p className="me-5 m-0">Saldo total: R$ {saldoTotal ? saldoTotal.toFixed(2) : 0}</p>
                    <p className="m-0">Saldo no período: R$ {saldoPeriodo ? saldoPeriodo.toFixed(2) : 0}</p>
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