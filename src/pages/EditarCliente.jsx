import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}) {
    const cliente = await obtenerCliente(params.clienteId)

    if(Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 400,
            statusText: 'No hay resultados'
        })
    }

    return cliente
}

export async function action({request, params}) {
  const formData = await request.formData()

  const datos = Object.fromEntries(formData)

  const email = formData.get('email');

  const errores = []
  if(Object.values(datos).includes(''))
  {
    errores.push('todos los campos obligatorios...')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
    errores.push('El Email no es válido')
  }

  if(Object.keys(errores).length) {
    return errores;
  }

 await  actualizarCliente(params.clienteId, datos)

  return redirect('/')
}

function EditarCliente() {

  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
    <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
    <p className='mt-3'>Aquí puedes modificar los datos del cliente</p>

    <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={()=> navigate('/')}
        >
          Volver
        </button>
    </div>

    <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
   
   {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error> )}
  <Form
     method="post"
     noValidate
   >

      <Formulario
       cliente={cliente}
      />
      <input 
        type="submit"
        className="mt-5 w-full bg-blue-800 uppercase p-3 text-white font-bold text-lg"
        value="Editar Cliente"
      />
    </Form>
    </div>
    </>
  )
}

export default EditarCliente