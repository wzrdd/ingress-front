import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function listProducts(){
    const [products, setProducts] = useState([]);
    const [productsFetched, setProductsFetched] = useState(false);

    const fetchUsers = async (authorization) => {
        const response = await fetch(
          'http://localhost:3300/api/v1/product/products',
          {
            method: 'GET',
            headers: {
              'Authorization': authorization
            }
          }
        );
    
        if (response.status === 200) {
          const fetchedUsers = await response.json();
          setProducts(fetchedUsers);
          setProductsFetched(true);
        }
      };
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        const authorization = `Bearer ${token}`;
        fetchUsers(authorization);
      }, []);
    
      return (
        <>
          {productsFetched ? <ProductsTable products={products} /> : <ErrorMessage />}
        </>
      );
}
    
function ErrorMessage() {
      return (
        <>
          <h1>Cargando...</h1>
          <h2>
            <Link href="/">Regresar a la página de inicio</Link>
          </h2>
        </>
      );
}

function ProductsTable({ products }) {
    console.log(products);
    return (
      <>
      <div class="row justify-content-md-center">
        <div class="col-md-auto">
        <div class="btn btn-primary">
            <Link class="text-dark" href="/products/create">Crear Producto</Link>
        </div>
        <br/>
        <br/>
          <table class="table table-bordered border-primary table-striped table-centered mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Unidad de medida</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link href={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                  </td>
                  <td>{product.quantityUnit}</td>
                  <td>{product.quantityValue}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
      </>
    );
  }