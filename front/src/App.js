import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main">

        <div className="leftSide">
          <h1>lista de amigos</h1>
        </div>

        <div className="listMessage">
          <div className="list">
            <p>Lista mensajes</p>
            <p className="p1">Lista mensajes</p>
            <p>Lista mensajes</p>
          </div>
        </div>

        <div className="formMessage">
          <input type="text" placeholder="mensaje"></input>
          <input type="text" placeholder="nombre"></input>
          <button>enviar</button>
        </div>

      </div>
    </div>
  );
}

export default App;
