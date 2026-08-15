import { useEffect, useState, type FormEvent } from 'react'
import './App.css'
import type { Equipo } from './types'

function App() {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [nuevoEquipo, setNuevoEquipo] = useState({
    nombre: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    estado: '',
  })

  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [equipoAEliminar, setEquipoAEliminar] = useState<number | null>(null)
  // GET - Obtener equipos
  useEffect(() => {
    fetch('http://localhost:3000/equipos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los equipos')
        }

        return response.json()
      })
      .then((data) => {
        setEquipos(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError('No se pudieron cargar los equipos')
        setLoading(false)
      })
  }, [])

  // POST / PATCH
  const guardarEquipo = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (editandoId === null) {
      // POST
      fetch('http://localhost:3000/equipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEquipo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo registrar el equipo')
          }

          return response.json()
        })
        .then((data) => {
          setEquipos([...equipos, data])

          setNuevoEquipo({
            nombre: '',
            marca: '',
            modelo: '',
            numeroSerie: '',
            estado: '',
          })
        })
        .catch((error) => {
          console.error(error)
          setError('No se pudo registrar el equipo')
        })
    } else {
      // PATCH
      fetch(`http://localhost:3000/equipos/${editandoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEquipo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo actualizar el equipo')
          }

          return response.json()
        })
        .then((data) => {
          setEquipos(
            equipos.map((equipo) =>
              equipo.id === editandoId ? data : equipo,
            ),
          )

          cancelarEdicion()
        })
        .catch((error) => {
          console.error(error)
          setError('No se pudo actualizar el equipo')
        })
    }
  }

  // EDITAR
  const editarEquipo = (equipo: Equipo) => {
    setEditandoId(equipo.id)

    setNuevoEquipo({
      nombre: equipo.nombre,
      marca: equipo.marca,
      modelo: equipo.modelo,
      numeroSerie: equipo.numeroSerie,
      estado: equipo.estado,
    })
  }

  // DELETE
  const eliminarEquipo = (id: number) => {
    setError('')

    fetch(`http://localhost:3000/equipos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo eliminar el equipo')
        }

        setEquipos(equipos.filter((equipo) => equipo.id !== id))
      })
      .catch((error) => {
        console.error(error)
        setError('No se pudo eliminar el equipo')
      })
  }

  // CANCELAR
  const cancelarEdicion = () => {
    setEditandoId(null)

    setNuevoEquipo({
      nombre: '',
      marca: '',
      modelo: '',
      numeroSerie: '',
      estado: '',
    })
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>Gestión de Inventario</h1>

        <h2>
          {editandoId === null
            ? 'Registrar nuevo equipo'
            : 'Editar equipo'}
        </h2>

        <form onSubmit={guardarEquipo}>

          <input
            type="text"
            placeholder="Nombre"
            value={nuevoEquipo.nombre}
            onChange={(e) =>
              setNuevoEquipo({
                ...nuevoEquipo,
                nombre: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Marca"
            value={nuevoEquipo.marca}
            onChange={(e) =>
              setNuevoEquipo({
                ...nuevoEquipo,
                marca: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Modelo"
            value={nuevoEquipo.modelo}
            onChange={(e) =>
              setNuevoEquipo({
                ...nuevoEquipo,
                modelo: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Número de serie"
            value={nuevoEquipo.numeroSerie}
            onChange={(e) =>
              setNuevoEquipo({
                ...nuevoEquipo,
                numeroSerie: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Estado"
            value={nuevoEquipo.estado}
            onChange={(e) =>
              setNuevoEquipo({
                ...nuevoEquipo,
                estado: e.target.value,
              })
            }
          />

          <button type="submit">
            {editandoId === null
              ? 'Registrar'
              : 'Guardar cambios'}
          </button>

          {editandoId !== null && (
            <button
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          )}

        </form>

        <h2>Equipos registrados</h2>

        {error && <p>{error}</p>}

        {loading ? (
          <p>Cargando equipos...</p>
        ) : (
          <div className="equipos-container">

            {equipos.map((equipo) => (

              <div
                className="equipo-card"
                key={equipo.id}
              >
                <h3>{equipo.nombre}</h3>
                <p>
                  <strong>ID:</strong> {equipo.id}
                </p><p>
                  <strong>Marca:</strong> {equipo.marca}
                </p> <p>
                  <strong>Modelo:</strong> {equipo.modelo}
                </p><p>
                  <strong>N° de serie:</strong>{' '}
                  {equipo.numeroSerie}
                </p><p>
                  <strong>Estado:</strong> {''}
                  <span className={`estado ${equipo.estado.toLowerCase().replace(' ', '-')}`}>
                    {equipo.estado}
                  </span>
                </p>
                <div className="acciones">
                  <button
                    onClick={() => editarEquipo(equipo)}>
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setEquipoAEliminar(equipo.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
                )}

        {equipoAEliminar !== null && (
  <div className="modal-overlay">
    <div className="modal-confirmacion">

      <div className="modal-icono">
        ⚠️
      </div>

      <h2>¿Eliminar equipo?</h2>

      <p>
        Esta acción eliminará el equipo de forma permanente.
      </p>

      <div className="modal-botones">
        <button
          className="btn-cancelar"
          onClick={() => setEquipoAEliminar(null)}
        >
          Cancelar
        </button>

        <button
          className="btn-eliminar"
          onClick={() => {
            eliminarEquipo(equipoAEliminar)
            setEquipoAEliminar(null)
          }}
        >
          Sí, eliminar
        </button>
      </div>

    </div>
  </div>
)}
      </header>
    </div>
  )
}

export default App