import React, {useEffect, useLayoutEffect, useState} from "react";
import {NumericFormat} from "react-number-format";
import {getCurrency} from "../plantilla/Utils";
import axios from "axios";
import {Link} from "react-router-dom";
const Products = () => {
    const urlBase2 = "http://localhost:8080/tienda-app/categorias"
    const urlBase = "http://localhost:8080/tienda-app/productos"
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState(new Map());


    useEffect(() => {
        cargarProductos();
    }, []);
    const cargarProductos = async ()=>{
        const resultado = await axios.get(urlBase);
        console.log("Cargar resultado productos");
        console.log(resultado.data);
        setProductos(resultado.data);
    }
    const eliminarProductos = async (id)=> {
        await axios.delete(`${urlBase}/{id}`);
        cargarProductos();
    }

    const add = (key, value) =>{
        setCategorias(prev =>new Map([...prev, [key, value]]))
    }

    useLayoutEffect(()=>{
        const obtenerProductos = async ()=>{
            const res = await fetch(urlBase);
            const productos = await res.json()
            setProductos(productos);
        }
        const obtenerCategorias = async ()=>{
            const res = await fetch(urlBase2);
            const categorias = await res.json();
            categorias.map(categoria =>{
                const {
                    idCategoria,
                    descripcion,
                    estado
                } = categoria;
                add(idCategoria, categoria)
            })
        }
        obtenerProductos().catch(e =>{
            console.log("Error al obtener productos");
        })
        obtenerCategorias().catch(e=>{
            console.log("Error al obtener categoria" + e);
        })
    }, []
    )
    return (
        <div className="container">
            <div className="container text-center" style={{margin: "30px"}}>
                <h3>
                    Tienda Demo - Productos
                </h3>
            </div>
            <table className="table table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Categoria</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {
                    productos.map(producto =>{
                        const {
                            idProducto,
                            descripcion,
                            precio,
                            stock,
                            estado,
                            idCategoria
                        } = producto;
                        return (
                            <tr key={producto}>
                                <td>{idProducto}</td>
                                <td>{descripcion}</td>
                                <td><NumericFormat value={precio}
                                                   displayType={'text'}
                                                   thousandSeparator=','
                                                   prefix={'C$'}
                                                   decimalScale={2}
                                                   fixedDecimalScale/></td>
                                <td>{stock}</td>
                                <td>{estado}</td>
                                <td>{categorias.get(idCategoria).descripcion}</td>
                                <td>
                                    <div>
                                        <Link to={`/editar-producto/${producto.idProducto}`}
                                              className="btn btn-warning btn-sm me-3">Editar</Link>
                                        <button onClick={() => eliminarProductos(producto.idProducto)}
                                                className="btn btn-danger btn-sm">Eliminar
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
export default Products;