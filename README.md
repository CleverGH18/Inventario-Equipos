# Sistema de Gestión de Inventario de Equipos de Cómputo

## Descripción

Aplicación web para gestionar el inventario de equipos de cómputo de un laboratorio.

El sistema permite:

* Registrar equipos.
* Listar equipos registrados.
* Actualizar información de equipos.
* Eliminar equipos.
* Consultar y probar los endpoints mediante Swagger.

## Tecnologías utilizadas

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Swagger
* class-validator

### Frontend

* React
* TypeScript
* Vite
* CSS

### Infraestructura

* Docker
* Docker Compose

## Estructura del proyecto

```text
Prueba/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

## API

El backend utiliza el puerto `3000`.

### Endpoints principales

| Método | Ruta           | Descripción          |
| ------ | -------------- | -------------------- |
| GET    | `/equipos`     | Listar equipos       |
| GET    | `/equipos/:id` | Obtener un equipo    |
| POST   | `/equipos`     | Registrar un equipo  |
| PATCH  | `/equipos/:id` | Actualizar un equipo |
| DELETE | `/equipos/:id` | Eliminar un equipo   |

## Swagger

La documentación de la API está disponible en:

```text
http://localhost:3000/api/docs
```

Desde Swagger se pueden consultar y probar los endpoints disponibles.

## Frontend

El frontend utiliza React + TypeScript y permite:

* Visualizar los equipos registrados.
* Registrar nuevos equipos.
* Editar equipos.
* Eliminar equipos.
* Mostrar estados de carga.
* Mostrar mensajes de error.

Cuando se ejecuta mediante Docker, el frontend estará disponible en:

```text
http://localhost:5173
```

## Variables de entorno

El backend utiliza una variable `DATABASE_URL` para conectarse a PostgreSQL.

Se incluye un archivo:

```text
backend/.env.example
```

Ejemplo:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/inventario
```

Cuando se utiliza Docker Compose, la conexión se configura mediante las variables definidas en `docker-compose.yml`.

## Ejecución con Docker

### Requisitos

Tener instalado:

* Docker Desktop
* Docker Compose

### Iniciar la aplicación

Desde la raíz del proyecto ejecutar:

```bash
docker compose up --build
```

Esto levanta los tres servicios:

1. PostgreSQL
2. Backend
3. Frontend

### Acceso

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api/docs
```

PostgreSQL:

```text
localhost:5432
```

### Detener los servicios

Para detener los contenedores:

```bash
docker compose down
```

Para detenerlos y eliminar también los volúmenes:

```bash
docker compose down -v
```

## Ejecución del backend sin Docker

Desde la carpeta `backend`:

```bash
pnpm install
```

Luego ejecutar:

```bash
pnpm run start:dev
```

## Ejecución del frontend sin Docker

Desde la carpeta `frontend`:

```bash
pnpm install
```

Luego:

```bash
pnpm run dev
```

## Git y estrategia de ramas

El proyecto utiliza Git para el control de versiones.

Ramas principales utilizadas:

* `master`
* `development`

Ramas de funcionalidades:

* `feature/frontend-ui`
* `feature/backend-docker`
* `feature/swagger-docs`

Los cambios fueron organizados mediante Pull Requests hacia `development`.

## Autor

CleverGH18
