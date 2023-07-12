import axios from 'axios';
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/requests';
import { Conta } from '../../types/conta';
import { ContaContext } from '../../context/ContaContext';

const Home = () => {
    const [idConta, setIdConta] = useState<number | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const context = useContext(ContaContext);

    const handleClick = async () => {
        if (idConta === null || idConta <= 0) {
            setError("Informe o número da conta");
            return;
        }

        axios.get(`${BASE_URL}/contas/${idConta}`)
        .then(response => {
            const data = response.data as Conta;
            if (data) {
                context?.setConta(data);
                navigate("/transferencias");
            } else {
                setError(`Não foi possível localizar a conta com ID ${idConta}`);
            }
        })
        .catch(error => {
            setError("Conta não encontrada");
        });
    }

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <div className="jumbotron">
                    <h1 className="display-4">Banco</h1>
                    <p className="lead">Analise as transferências de uma conta</p>
                    <hr />
                    <div className="col-md-6">
                        <div className="input-group">
                            <input type="number" className="form-control" placeholder="Número da conta" aria-label="Número da conta" 
                            value={idConta || ''} onChange={(e) => setIdConta(parseInt(e.target.value))} />
                            <button onClick={handleClick} className="btn btn-primary">Acessar informações</button>
                        </div>
                        {error && <p className="alert alert-danger mt-3">{error}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;