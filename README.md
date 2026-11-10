# Restaurant Online Ordering System

Sistema completo de pedidos para restaurante con Backend en Django REST Framework, Frontend en Angular 20 (PrimeNG + TailwindCSS) y base de datos PostgreSQL, todo orquestado con Docker Compose.

---

## 🚀 Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (con Docker Compose v2)
- [Node.js](https://nodejs.org/) v20+ (opcional si se ejecuta dentro de Docker)
- [Python](https://www.python.org/) 3.13 (opcional si se ejecuta dentro de Docker)

---

## ⚙️ Configuración Inicial (.env)

Antes de levantar los contenedores, crea tu archivo `.env` a partir del ejemplo:

```bash
# En Windows PowerShell o CMD:
copy .env.example .env

# En Linux o macOS:
cp .env.example .env
```

*(Opcional: puedes personalizar variables en `.env`, como credenciales de base de datos o claves de prueba de Stripe).*

---

## 🐳 Ejecución con Docker

### 1. Entorno de Desarrollo (Recomendado)

Levanta los contenedores con recarga en caliente (hot reload):

```bash
docker compose up --build
```

O si utilizas Docker Compose Watch:

```bash
docker compose up --build --watch
```

- **Frontend (Angular)**: [http://localhost:4200](http://localhost:4200)
- **Backend API (Django)**: [http://localhost:8000](http://localhost:8000)
- **PostgreSQL**: `localhost:5432`

> Las migraciones de base de datos se ejecutan automáticamente al iniciar el backend mediante el entrypoint.

### 2. Entorno de Producción (Build)

Para compilar y probar la versión optimizada de producción (Nginx para Angular + Gunicorn para Django):

```bash
docker compose -f build.compose.yaml up --build
```

- **Frontend (Nginx)**: [http://localhost:8080](http://localhost:8080)
- **Backend (Gunicorn)**: [http://localhost:8000](http://localhost:8000)

### 3. Detener los contenedores

```bash
docker compose down
```

Para borrar también los volúmenes de datos:

```bash
docker compose down -v
```

---

## 🛠️ Comandos Útiles

### Entrar al contenedor del Backend:

```bash
docker compose exec backend-dev sh
```

### Crear un superusuario de Django (Admin):

```bash
docker compose exec backend-dev python manage.py createsuperuser
```

### Crear nuevas migraciones en Django:

```bash
docker compose exec backend-dev python manage.py makemigrations
```

---

## 📁 Estructura del Proyecto

```text
├── backend/                  # Proyecto Django REST Framework
│   ├── django_project/       # Configuración global (settings, urls, wsgi)
│   ├── backoffice/           # App para gestión interna / empleados
│   ├── delivery/             # App de envíos y logística
│   ├── menu/                 # App de catálogo de menú
│   ├── payments/             # Integración con Stripe
│   └── docker-entrypoint.sh  # Script de inicio y migraciones
├── frontend/                 # Proyecto Angular (PrimeNG + TailwindCSS)
│   ├── src/app/pages/        # Vistas y páginas principales
│   ├── src/app/core/         # Componentes centrales (Admin, Kitchen, etc.)
│   └── nginx.conf            # Configuración para servir en producción
├── docker/                   # Dockerfiles organizados por servicio
│   ├── backend/              # dev.Dockerfile y build.Dockerfile
│   ├── frontend/             # dev.Dockerfile y build.Dockerfile
│   └── stripe/               # Script para Stripe CLI
├── compose.yaml              # Docker compose para desarrollo
├── build.compose.yaml        # Docker compose para producción
├── .env.example              # Plantilla de variables de entorno
└── .gitattributes            # Normalización de saltos de línea (LF para scripts)
```
