# SkillGap Analyzer Deployment Guide

This guide describes how to deploy the full stack using **Vercel** (for the frontend) and **Render** (for the backend), with a free **MongoDB Atlas** cloud database.

---

## Part 1: Setting up MongoDB Atlas (Database)

Since Render does not offer a free database service that lasts forever, we use MongoDB Atlas (the official free cloud tier for MongoDB, which is free forever).

1. **Sign Up/Log In**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create an account.
2. **Create a Cluster**:
   - Create a new project or database deployment.
   - Select the **M0 (Free)** tier.
   - Choose a cloud provider (e.g., AWS or Google Cloud) and region closest to you.
   - Click **Create**.
3. **Database Access Security**:
   - Go to **Security** -> **Database Access** in the left sidebar.
   - Click **Add New Database User**.
   - Choose **Password** authentication, enter a username (e.g., `db_user`) and a secure password.
   - Under **Database User Privileges**, select **Read and write to any database**.
   - Click **Add User** and note down the password!
4. **Network Access Security**:
   - Go to **Security** -> **Network Access** in the left sidebar.
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere** (adds `0.0.0.0/0`).
   - Click **Confirm**. (This allows Render servers to connect to the database).
5. **Get your connection string**:
   - Go to **Database** -> **Overview** in the left sidebar.
   - Click **Connect** on your cluster.
   - Choose **Drivers**.
   - Copy the connection string. It will look like this:
     ```
     mongodb+srv://db_user:<db_password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `<db_password>` with the password you created in step 3. Note down this URI for later!

---

## Part 2: Deploying the Backend on Render

1. **Commit and Push**:
   - Commit all recent changes (including the new `render.yaml` and `apps/frontend/vercel.json` configurations) and push them to your GitHub repository.
2. **Create Render Service**:
   - Go to [Render Dashboard](https://dashboard.render.com/) and log in.
   - Click the blue **New +** button in the top right corner and select **Blueprint**.
   - Connect your GitHub account and select your `SkillGapAnalyzer` repository.
3. **Configure the Blueprint**:
   - Render will detect the `render.yaml` file automatically.
   - Enter a name for the group (e.g., `skillgap-stack`).
   - Fill in the required environment variables:
     - `MONGODB_URI`: Enter the MongoDB Atlas connection string from Part 1 (replacing `<db_password>` with your database user password).
     - `CORS_ORIGINS`: You can temporarily set this to `*` or a placeholder like `https://temp.vercel.app`. **Once your Vercel deployment is finished in Part 3, you should update this variable in Render to your exact Vercel URL (e.g., `https://skill-gap-analyzer.vercel.app`) to secure the backend.**
4. **Deploy**:
   - Click **Apply**. Render will start building the Docker container for the Spring Boot backend.
   - After a few minutes, the build will complete, and Render will show you the backend service URL (e.g., `https://skillgap-backend.onrender.com`). Note down this URL.

---

## Part 3: Deploying the Frontend on Vercel

1. **Log In to Vercel**:
   - Go to [Vercel](https://vercel.com/) and log in.
2. **Import Project**:
   - Click **Add New** -> **Project**.
   - Import your GitHub repository.
3. **Configure Project Settings**:
   - **Framework Preset**: Select **Vite** or leave it as Other (it auto-detects Vite).
   - **Root Directory**: Click *Edit* and select `apps/frontend`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variables**:
   - Expand the **Environment Variables** section and add the following keys:
     - `VITE_API_BASE_URL`: The URL of your backend on Render with `/api/v1` appended at the end (e.g., `https://skillgap-backend.onrender.com/api/v1`).
     - `VITE_GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
5. **Deploy**:
   - Click **Deploy**. Vercel will build the frontend assets and host them.
   - Once deployed, copy your live Vercel URL (e.g., `https://skill-gap-analyzer-frontend.vercel.app`).
6. **Finalize Backend CORS Settings**:
   - Go back to your [Render Dashboard](https://dashboard.render.com/).
   - Click on the `skillgap-backend` service.
   - Navigate to **Environment**.
   - Change `CORS_ORIGINS` from the placeholder to your live Vercel URL (e.g., `https://skill-gap-analyzer-frontend.vercel.app`).
   - Save changes. Render will automatically redeploy with the correct CORS configuration.

---

## Part 4: Verification

1. Open your live Vercel URL.
2. Check if the login page loads correctly.
3. Attempt to register a new user or log in.
4. Try requesting a skill gap analysis to verify the Gemini API integration and MongoDB persistence.
