import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const datos = {
      full_name: formData.get('nombre'),
      email: formData.get('email'),
      phone: formData.get('telefono'),
      message: formData.get('mensaje'),
    }

    // CONEXIÓN DIRECTA (Sin librerías que den error)
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(datos)
      })

      if (response.ok) {
        setEnviado(true)
      } else {
        const err = await response.json()
        alert('Error: ' + err.message)
      }
    } catch (error) {
      alert('Error de conexión. Revisa tu internet.')
    } finally {
      setLoading(false)
    }
  }

  if (enviado) return <div style={{padding: '50px', textAlign: 'center'}}><h2>¡Caso recibido! Nos contactaremos pronto.</h2></div>

  return (
    <div className="container" style={{padding: '20px', maxWidth: '450px', margin: '0 auto'}}>
      <h1>Evaluación CCServices</h1>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <input name="nombre" placeholder="Nombre completo" required style={{padding: '12px'}} />
        <input name="email" type="email" placeholder="Email" required style={{padding: '12px'}} />
        <input name="telefono" placeholder="Teléfono" required style={{padding: '12px'}} />
        <textarea name="mensaje" placeholder="Tu caso..." required style={{padding: '12px', height: '100px'}}></textarea>
        <button type="submit" disabled={loading} style={{padding: '12px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer'}}>
          {loading ? 'Enviando...' : 'ENVIAR MI CASO'}
        </button>
      </form>
    </div>
  )
}

export default App