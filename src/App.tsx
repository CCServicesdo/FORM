import { useState } from 'react'
import { createClient } from '@supabase/supabase-client'
import './App.css'

// Conexión con Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function App() {
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Estos nombres deben coincidir con tus columnas en Supabase
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          full_name: formData.get('nombre'),
          email: formData.get('email'),
          phone: formData.get('telefono'),
          message: formData.get('mensaje'),
        },
      ])

    setLoading(false)
    if (error) {
      alert('Error al enviar: ' + error.message)
    } else {
      setEnviado(true)
    }
  }

  if (enviado) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>¡Gracias! Hemos recibido tu caso correctamente.</h2>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Evaluación CCServices</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="nombre" placeholder="Nombre completo" required style={{ padding: '10px' }} />
        <input name="email" type="email" placeholder="Correo electrónico" required style={{ padding: '10px' }} />
        <input name="telefono" placeholder="Teléfono" required style={{ padding: '10px' }} />
        <textarea name="mensaje" placeholder="Describe tu caso aquí..." required style={{ padding: '10px', height: '100px' }}></textarea>
        <button type="submit" disabled={loading} style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {loading ? 'Enviando...' : 'ENVIAR MI CASO'}
        </button>
      </form>
    </div>
  )
}

export default App