# 🏦 BancoXYZ

Aplicación web desarrollada con React y TypeScript para la gestión de transferencias bancarias, autenticación de usuarios y visualización de saldo.

La aplicación permite a los usuarios:

- 🔐 Iniciar sesión
- 💰 Consultar saldo disponible
- 🔄 Realizar transferencias bancarias
- 📋 Visualizar historial de transferencias
- ✅ Validar formularios
- 🧪 Ejecutar pruebas automatizadas

---

# 🚀 Tecnologías utilizadas

- ⚛️ React 19
- 🟦 TypeScript
- 🌐 React Router DOM
- 🔄 React Query
- 📝 React Hook Form
- ✅ Zod
- 📡 Axios
- 🐻 Zustand
- 🎨 TailwindCSS
- 🧪 Jest
- 🧪 React Testing Library

---

# ✨ Características principales

- 🔐 Inicio de sesión de usuarios
- 💰 Consulta de saldo disponible
- 🏦 Registro de transferencias bancarias
- 📋 Listado de transferencias realizadas
- ✅ Validación de formularios
- 🌍 Manejo global de estado
- ⚠️ Manejo centralizado de errores
- 🧪 Testing de componentes y funcionalidades

---

# 📐 Arquitectura

React + TypeScript + React Router DOM

Arquitectura basada en separación de responsabilidades y modularidad.

El proyecto separa claramente:

- 🎨 UI y componentes reutilizables
- 🧠 Lógica de negocio
- 🌐 Infraestructura HTTP
- 📱 Navegación y rutas
- ✅ Validaciones y tipados

---

# 📂 Estructura del proyecto

```bash
src/
├── adapters/         # Adaptadores y transformaciones de datos
├── api/              # Configuración del cliente HTTP
├── components/       # Componentes reutilizables
├── layouts/          # Layouts y estructuras visuales
├── pages/            # Páginas principales de la aplicación
├── router/           # Configuración de rutas y navegación
├── services/         # Servicios y llamadas HTTP
├── store/            # Estado global con Zustand
├── tests/            # Pruebas unitarias e integración
├── types/            # Tipados globales TypeScript
├── utils/            # Helpers y utilidades
├── validation/       # Validaciones con Zod
├── App.tsx           # Componente principal
├── index.tsx         # Punto de entrada de la aplicación
└── index.css         # Estilos globales
```

---

# 🏛 Organización general

La estructura del proyecto busca mantener una separación clara de responsabilidades:

- 🧩 **components/** → Componentes reutilizables de interfaz
- 📄 **pages/** → Vistas principales asociadas a rutas
- 🌐 **services/** → Lógica de conexión con APIs
- 🐻 **store/** → Estado global de la aplicación
- ✅ **validation/** → Reglas y esquemas de validación
- 🛣️ **router/** → Configuración de navegación
- 🛠️ **utils/** → Helpers y utilidades reutilizables
- 🧪 **tests/** → Pruebas unitarias e integración
- 🟦 **types/** → Interfaces y tipados TypeScript
- 📡 **api/** → Configuración global de Axios

---

# ⚙️ Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- 🟢 Node.js >= 18
- 📦 npm >= 9

Verificar versiones:

```bash
node -v
npm -v
```

---

# 📥 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/xh4rz/bancoxyz
```

Entrar a la carpeta del proyecto:

```bash
cd bancoxyz
```

Instalar dependencias:

```bash
npm install
```

---

# ▶️ Ejecutar el proyecto

Iniciar el servidor en modo desarrollo:

```bash
npm run start
```

La aplicación estará disponible en:

```bash
http://localhost:3000
```

---

# 🧪 Ejecutar pruebas

```bash
npm run test
```

---

# 📦 Generar build de producción

```bash
npm run build
```

Puedes ejecutar la aplicación localmente utilizando un servidor estático.

Instalar `serve` globalmente:

```bash
npm install -g serve
```

Ejecutar el build:

```bash
serve -s build
```

---

# 📚 Librerías principales

## 🔄 React Query

Utilizado para:

- Manejo de estado servidor
- Caché de peticiones
- Revalidación automática
- Manejo de loading y errores

---

## 📝 React Hook Form

Utilizado para:

- Manejo eficiente de formularios
- Integración con validaciones
- Mejor rendimiento

---

## ✅ Zod

Utilizado para:

- Validación de formularios
- Validación tipada
- Mensajes de error personalizados

---

## 🐻 Zustand

Utilizado para:

- Estado global de autenticación
- Persistencia de datos de sesión

---

# ⚠️ Manejo de errores

La aplicación cuenta con:

- Manejo centralizado de errores HTTP
- Parseo de errores de Axios
- Validaciones de formularios
- Mensajes amigables para el usuario

Archivo relacionado:

```bash
src/utils/parseAxiosError.ts
```

---

# 🧪 Testing

El proyecto utiliza:

- Jest
- React Testing Library

Ubicación de pruebas:

```bash
src/tests
```

Objetivos de testing:

- Renderizado de componentes
- Validación de formularios
- Eventos de usuario
- Integración básica

---

# 🎨 Estilos

La aplicación utiliza:

- TailwindCSS

---

# 👨‍💻 Autor

Desarrollado por Harold Gonzalez.
