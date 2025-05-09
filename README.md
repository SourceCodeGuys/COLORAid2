# ColorAid - Deployment Guide

This document provides instructions for deploying the ColorAid application on Render.com with Firebase as the database.

## Prerequisites

- A Firebase project with Firestore database
- A Render.com account
- The Firebase Admin SDK private key (firebase_admin_key.json)

## Deployment Steps

### 1. Firebase Setup

1. Make sure your Firebase project has Firestore enabled
2. Generate a Firebase Admin SDK private key if you haven't already:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `firebase_admin_key.json`

### 2. Render.com Deployment

#### Option 1: Deploy from GitHub

1. Push your project to a GitHub repository
2. Sign in to Render.com
3. Click "New" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: coloraid (or your preferred name)
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
6. Add the environment variables:
   - FIREBASE_API_KEY
   - FIREBASE_AUTH_DOMAIN
   - FIREBASE_DATABASE_URL
   - FIREBASE_PROJECT_ID
   - FIREBASE_STORAGE_BUCKET
   - FIREBASE_MESSAGING_SENDER_ID
   - FIREBASE_APP_ID
   - FIREBASE_MEASUREMENT_ID
7. Upload the `firebase_admin_key.json` file:
   - In the Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Under "Secret Files", add a new secret file
   - Path: `firebase_admin_key.json`
   - Contents: Copy and paste the contents of your firebase_admin_key.json file

#### Option 2: Deploy using render.yaml

1. Ensure your project contains the `render.yaml` configuration file
2. Sign in to Render.com
3. Click "New" and select "Blueprint"
4. Connect your GitHub repository
5. Render will detect the `render.yaml` file and configure the services
6. You'll still need to add the Firebase environment variables and the secret file

## Environment Variables

Make sure to set all these environment variables in Render:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Firebase Admin SDK Secret File

Render requires you to upload the Firebase Admin SDK private key file as a secret file:

1. Path: `firebase_admin_key.json`
2. Contents: The contents of your Firebase Admin SDK private key file

## Troubleshooting

- If you encounter deployment issues, check the Render logs for specific error messages
- Verify that all environment variables are correctly set
- Ensure the Firebase Admin SDK private key file is properly uploaded
- Check if your Firebase project has the appropriate security rules configured 