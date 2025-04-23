## 📖 Códigos de estado HTTP (estándar para respuestas de servidor)

### ✅ Respuestas exitosas (2xx)

| Código | Significado     | Uso recomendado |
|--------|-----------------|------------------|
| `200`  | OK              | Todo bien, se devuelve contenido |
| `201`  | Created         | Recurso creado exitosamente |
| `202`  | Accepted        | Petición aceptada, procesamiento en curso |
| `204`  | No Content      | Todo bien, sin contenido que devolver |

---

### 🔁 Redirecciones (3xx)

| Código | Significado             | Uso recomendado |
|--------|-------------------------|------------------|
| `301`  | Moved Permanently       | Redirección permanente |
| `302`  | Found (Moved Temporarily) | Redirección temporal |

---

### ❗ Errores del cliente (4xx)

| Código | Significado     | Uso recomendado |
|--------|-----------------|------------------|
| `400`  | Bad Request     | Error de validación o parámetros incorrectos |
| `401`  | Unauthorized    | No autenticado |
| `403`  | Forbidden       | Autenticado pero sin permisos |
| `404`  | Not Found       | Recurso no encontrado |
| `409`  | Conflict        | Conflicto de estado (ej. duplicado) |

---

### 💥 Errores del servidor (5xx)

| Código | Significado             | Uso recomendado |
|--------|-------------------------|------------------|
| `500`  | Internal Server Error   | Error interno del servidor |
| `502`  | Bad Gateway             | Respuesta inválida de otro servidor |
| `503`  | Service Unavailable     | Servicio no disponible o en mantenimiento |
