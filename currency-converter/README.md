# Currency Converter

A full-stack currency converter application built with Angular and Node.js.

## Features

- Real-time currency conversion using Free Currency API
- Support for multiple currencies
- Conversion history tracking with local storage persistence
- Responsive design optimized for mobile devices
- Secure API key handling

## Tech Stack

### Frontend
- Angular 17
- Bootstrap 5
- Angular Material
- TypeScript
- SCSS

### Backend
- Node.js
- Express
- TypeScript
- Free Currency API
- CORS enabled

## Project Structure

```
currency-converter/
├── backend/                 # Node.js + Express + TypeScript backend
│   ├── src/
│   │   └── app.ts          # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json         # Vercel deployment config
└── frontend/
    └── currency-converter-app/  # Angular frontend
        ├── src/
        │   ├── app/
        │   │   ├── components/
        │   │   │   ├── converter/    # Currency converter component
        │   │   │   └── history/      # History display component
        │   │   └── services/
        │   │       └── currency.service.ts  # API and localStorage service
        │   └── styles.scss     # Global styles
        └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd currency-converter
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with your API key
echo "PORT=3000" > .env
echo "API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2" >> .env

# Build TypeScript
npm run build

# Start the server
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend/currency-converter-app
npm install

# Start the development server
ng serve
```

### 4. Access the Application

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

## API Endpoints

### Backend Routes

- `GET /currencies` - Fetch all supported currencies
- `GET /convert?from=USD&to=EUR&amount=100` - Convert currency

## Usage

1. **Currency Conversion**:
   - Select source currency from dropdown
   - Select target currency from dropdown
   - Enter amount to convert
   - Click "Convert" to see results

2. **View History**:
   - Navigate to "History" tab
   - View all past conversions with timestamps
   - Clear history if needed

3. **Responsive Design**:
   - Optimized for mobile and desktop
   - Touch-friendly interface
   - Responsive tables and forms

## 🚀 Deployment

### Quick Deployment to Vercel

**📋 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step deployment instructions.**

### Summary:

1. **Push to GitHub Repository**
2. **Deploy Backend:**
   - Root Directory: `backend/`
   - Add Environment Variables: `API_KEY`, `NODE_ENV`, `CORS_ORIGINS`
3. **Deploy Frontend:**
   - Root Directory: `frontend/currency-converter-app/`
   - Auto-detects backend URL in production

### Live Demo URLs:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend API**: `https://your-backend.vercel.app`
- **API Test**: `https://your-backend.vercel.app/test`

### Environment Variables (Vercel Dashboard):
```env
# Backend Environment Variables
API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
NODE_ENV=production
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:4200
```

## Development Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

### Frontend
- `ng serve` - Start development server
- `ng build` - Build for production
- `ng build --watch` - Build and watch for changes

## Features Implemented

✅ **Backend Requirements**
- Hidden API key (server-side only)
- `/currencies` endpoint for supported currencies
- `/convert` endpoint for currency conversion
- TypeScript configuration
- Environment variables support

✅ **Frontend Requirements**
- Mobile-first responsive design
- Currency selection dropdowns
- Amount input validation
- Loading spinners
- Dynamic result display
- Local storage for conversion history
- Persistent history after page reload
- Bootstrap + Angular Material styling

✅ **Additional Features**
- Error handling and user feedback
- Form validation
- Clean, modern UI
- Accessible design
- SEO-friendly structure

## API Key Setup

1. Visit [Free Currency API](https://freecurrencyapi.com/)
2. Sign up for a free account
3. Get your API key
4. Add it to your `.env` file in the backend directory
5. For deployment, set it as an environment variable in Vercel

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend is running on port 3000
2. **API Key Issues**: Check that the API key is correctly set in environment variables
3. **Build Errors**: Ensure all dependencies are installed

### Development Tips

- Use `npm run dev` for backend development with auto-restart
- Use `ng serve` for frontend development with hot reload
- Check browser console for any JavaScript errors
- Verify API endpoints are accessible

## License

MIT License - feel free to use this project for learning and development purposes.
