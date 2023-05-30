import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useMemo, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {
  const [products, setProducts] = useState(data)
  
  return (
    <div className='p-10 flex flex-col gap-5'>
      <h1 className="text-4xl font-bold text-center">Productos</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.length > 0 ?products.map((product) => (
          <div key={product.id} className="bg-gray-50 shadow-md rounded-md p-4 flex gap-2">
             <Image
              src={product.thumbnail}
              alt={product.title}
              width={100}
              height={100}
            />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-500 font-bold"> Descripcion: <span className=' font-light'>{product.description}</span></p>
            <p className="text-gray-500 font-bold"> precio: L.{product.price}</p>
          </div>
        )) 
        : <p className="text-center">Cargando...</p>}
      </div>
      </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
   console.log(data)
  return {
    props: {
      data: data.products,
    }
  };
}

