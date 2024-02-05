import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [racas, setRacas] = useState([]);
  const [busca, setBusca] = useState('');

  const fetchApi = (query) => {
    fetch('http://localhost:8080/doguinhos' + query)
      .then(resposta => resposta.json())
      .then(dados => {
        setRacas(dados)
      })
  }

  useEffect(() => {
    fetchApi('');
  }, []) // com o [] como segundo parametro, só vai ser gerado uma vez

  useEffect(() => {
    if (busca && busca.length > 3) {
      fetchApi('?nome=' + busca);
    }

    if (busca.length === 0) {
      fetchApi('')
    }
  }, [busca]) //todas as vezes que a busca mudar, ele vai fazer o fetch buscando o dado

  return (
    <div className="App">
      <h1>Bem-vindo aos doguinhos!</h1>
      <h4>Confira abaixo uma lista de raças dos doguinhos</h4>
      <input placeholder='Buscar por Raça' onChange={evento => setBusca(evento.target.value)} />
      <ul>
        {racas.map(raca => <li key={raca.id}>{raca.nome}</li>)}
      </ul>
    </div>
  );
}

export default App;
