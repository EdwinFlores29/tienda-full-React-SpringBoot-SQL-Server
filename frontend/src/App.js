import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import Home from "./plantilla/Home";
import EditarCategorias from "./editarTablas/EditarCategorias";
import AgregarCategoria from "./agregarTablas/AgregarCategoria";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/editar-categoria/:id" element={<EditarCategorias/>} />
              <Route exact path="/agregar-categorias" element={<AgregarCategoria/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;