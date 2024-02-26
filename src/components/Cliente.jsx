
import { Navigate, useNavigate, Form, redirect } from 'react-router-dom'
import { eliminarCliente } from '../data/clientes'

export async function action({params}) {

  console.log(params)

  await eliminarCliente(params.clienteId)
  return redirect('/')
}

const Cliente = ({cliente}) => {


  const Navigate = useNavigate()

  const {id } = cliente;
  return (
    <tr>
    <td className="p-6 space-y-2">
      <p className='text-2xl text-gray-800'>{cliente.nombre}</p>
      <p>{cliente.empresa}</p>
    </td>


    <td className="p-6">
    <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Email: </span>{cliente.email}</p>

    <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Tel: </span>{cliente.telefono}</p>
    </td>

    <td className='p-6  my-4 flex gap-2'>
      <button
        type='button'
        className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
        onClick={() => Navigate(`/clientes/${id}/editar`)}
      >

       Editar
      </button>
     
    <Form
      method='post'
      action={`clientes/${id}/eliminar`}
      className='flex'
      onSubmit={(e) => {
        if(!confirm('¿Deseas eliminar este registro?')) {
          e.preventDefault()
        }
      } }
    >
      <button
        type='submit'
        className='text-red-600 hover:text-blue-700 uppercase font-bold text-xs'
      >

      Eliminar
      </button>
      </Form>
      
    </td>
  </tr>
  )
}

export default Cliente