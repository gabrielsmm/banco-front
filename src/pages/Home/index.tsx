import axios from 'axios';
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const Home = () => {
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
                        <input type="text" className="form-control" placeholder="Número da conta" aria-label="Número da conta" />
                        <button className="btn btn-primary">Acessar informações</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
}

export default Home;