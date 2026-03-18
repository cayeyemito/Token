# Práctica JWT con Next.js

Aplicación web sencilla con `Next.js`, `React`, `TypeScript`, componentes estilo `shadcn/ui` y autenticación con `JWT`.

## Funcionalidades

- Login en `/login`
- Endpoint `POST /api/login`
- Sesión guardada en `localStorage`
- Dashboard privado en `/dashboard`
- Logout eliminando el token del cliente
- Preparada para desplegar en Vercel

## Usuario de prueba

- Email: `admin@tomates.com`
- Contraseña: `1234`

## Variables de entorno

Crea un archivo `.env.local` a partir de `.env.example`:

```bash
JWT_SECRET=pon-aqui-un-secreto-largo-y-seguro
```

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Despliegue en Vercel

1. Sube el proyecto a un repositorio Git.
2. Importa el repositorio en Vercel.
3. Añade la variable de entorno `JWT_SECRET`.
4. Despliega sin cambios adicionales.

## Notas de seguridad

- Para simplificar la práctica, el token se guarda en `localStorage`.
- En una aplicación real suele ser preferible usar cookies `httpOnly`.
- El logout en JWT normalmente borra el token del cliente.
- Si el token sigue siendo válido, no queda invalidado en servidor salvo que añadas una estrategia adicional.
