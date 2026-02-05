# Desplegar en Vercel

## 1. Subir el proyecto a GitHub (recomendado)

```bash
git init
git add .
git commit -m "Preparado para Vercel"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## 2. Crear proyecto en Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión.
2. **Add New** → **Project**.
3. Importa tu repositorio de GitHub (o sube la carpeta con **Vercel CLI**).
4. Vercel detectará Node.js; no cambies el **Build Command** (puede quedar vacío o `npm run build` si no tienes script build).
5. En **Environment Variables** agrega:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://Eduardo12:holapapu@clustereduardo.hw818rh.mongodb.net/ProfRobert?retryWrites=true&w=majority&appName=ClusterEduardo`
6. Haz clic en **Deploy**.

## 3. Despliegue con Vercel CLI (alternativa)

```bash
npm i -g vercel
vercel login
vercel
```

Cuando pregunte por variables de entorno, agrega `MONGODB_URI` con tu URI de MongoDB.

Para producción:

```bash
vercel --prod
```

## 4. Después del deploy

- La app quedará en una URL como `https://tu-proyecto.vercel.app`.
- El frontend usa rutas relativas (`/api/...`), así que funcionará en ese dominio.
- Si cambias la URI de MongoDB, edita la variable `MONGODB_URI` en **Project Settings → Environment Variables** y vuelve a desplegar.

## Nota de seguridad

En producción es mejor no dejar la URI de MongoDB en el código. Usa siempre la variable de entorno `MONGODB_URI` en Vercel y deja la URI por defecto solo para desarrollo local.
