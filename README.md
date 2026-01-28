# 📊 Server Monitor Dashboard (Next.js)

Este es el centro de control y visualización del ecosistema de monitoreo. Proporciona una interfaz intuitiva y de alto rendimiento para supervisar el estado de los servidores en tiempo real, utilizando las últimas capacidades de **Next.js 15+**.

## 🌟 Características Principales

* **Server-Side Rendering (SSR)**: Hidratación inicial de gráficas con datos históricos directamente desde la base de datos para una carga instantánea.
* **Real-Time Data (SSE)**: Conectividad nativa con el Ingestor de Node.js para recibir métricas sin refrescar la pantalla.
* **Gestión de Estado con SWR**: Uso de la estrategia *Stale-While-Revalidate* y actualizaciones optimistas (`mutate`) para una UI fluida.
* **Componentes Memoizados**: Optimización de renderizado mediante `React.memo` para evitar recálculos costosos en gráficas y tablas durante el flujo de datos.
* **Visualización Dinámica**: Gráficas de rendimiento dinámicas con **Recharts**.

---

## 🏗️ Arquitectura del Dashboard

El Dashboard actúa como el consumidor final en un flujo de tres capas:

1.  **Capa de Datos (Prisma)**: Consulta el historial de salud para poblar las gráficas al cargar la página.
2.  **Capa de Sincronización (Hook SSE)**: Escucha el microservicio de Node.js y actualiza la caché local.
3.  **Capa de Presentación**: Componentes reactivos que reflejan cambios en CPU, RAM y procesos críticos.



---

## 🛠️ Stack Tecnológico

* **Framework**: Next.js (App Router)
* **Estilos**: Tailwind CSS + Lucide React (Icons)
* **Estado & Cache**: SWR
* **Gráficas**: Recharts
* **Base de Datos**: Prisma ORM (Shared Schema)

---

## ⚙️ Instalación y Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar variables de entorno (`.env.local`):**
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/monitor_db"
    NEXT_PUBLIC_MONITOR_API_URL="http://localhost:4000"
    ```

3.  **Sincronizar el cliente de Prisma:**
    ```bash
    npx prisma generate
    ```

4.  **Iniciar el Dashboard:**
    ```bash
    npm run dev
    ```

---

## 💡 Lógica de Visualización Real-Time

El dashboard no consulta la base de datos para actualizaciones en vivo. Sigue este flujo:
1. El hook `useServerMetrics` abre una conexión `EventSource`.
2. Al recibir un mensaje, inyecta el nuevo punto en la caché de **SWR**.
3. SWR dispara un re-renderizado solo en los componentes que dependen de ese dato.

---

## 🔍 Troubleshooting (Dashboard)

### El stream no conecta (CORS Error):
Asegúrate de que el backend de Node.js tenga el dominio del dashboard en su configuración de CORS.

### Las gráficas no se mueven:
Verifica en la pestaña *Network* de las herramientas de desarrollador si la conexión `/stream` está en estado "Pending" (Correcto) o "Closed".

### Datos desactualizados al navegar:
SWR está configurado para revalidar los datos al recuperar el foco de la ventana, asegurando que el histórico sea siempre el más reciente tras una inactividad.

---

## 🛡️ Estándares de Código

* **Separación de Conceptos**: Server Components para datos estáticos y Client Components para interactividad.
* **Tipado Estricto**: Uso de interfaces compartidas para garantizar que los datos del Ingestor coincidan con los del Dashboard.