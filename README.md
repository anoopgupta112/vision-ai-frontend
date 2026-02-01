# Lead Generation Platform - Frontend

React + Vite frontend for the Lead Generation platform with modern UI components and real-time job monitoring.

## Features

- 🎨 **Modern UI**: Built with React, TailwindCSS, and shadcn/ui
- 🔐 **Authentication**: JWT-based login/register
- 🎯 **Lead Generation**: Create jobs, monitor progress, download leads
- 📊 **Dashboard**: View credits, job history, and statistics
- 👨‍💼 **Admin Panel**: User management, job monitoring, credit management
- 📱 **Responsive**: Mobile-friendly design

## Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/main_dashboard_frontend.git
cd main_dashboard_frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start dev server
npm run dev
```

Visit `http://localhost:5173`

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

For production:

```env
VITE_API_URL=https://api.yourdomain.com
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   └── ui/           # shadcn/ui components
├── features/         # Feature-based modules
│   ├── auth/         # Login, register, auth context
│   ├── dashboard/    # Main dashboard
│   ├── lead-gen/     # Job creation, leads table
│   └── admin-dashboard/  # Admin panel
├── lib/              # Utilities (axios, utils)
└── App.tsx           # Main app with routing
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Key Features

### User Features
- **Authentication**: Login/Register with JWT tokens
- **Create Jobs**: Submit search queries for lead generation
- **Monitor Jobs**: Real-time status updates (queued, running, done, failed)
- **Download Leads**: Export leads as CSV
- **Credits System**: View balance and transaction history

### Admin Features
- **User Management**: View all users, add credits
- **Job Monitoring**: View all jobs with filters (status, user)
- **Error Logs**: Collapsible error messages for failed jobs
- **Statistics**: Total users, jobs, and leads

## Deployment

Automated deployment via GitHub Actions on push to `main` branch.

See [.github/README.md](.github/README.md) for deployment setup.

### Quick Deploy

1. **Setup server** (one-time):
   ```bash
   sudo mkdir -p /var/www/lead-gen-frontend
   sudo apt install nginx -y
   # Configure Nginx (see .github/README.md)
   ```

2. **Configure GitHub Secrets**:
   - `SSH_HOST` - Server IP
   - `SSH_USER` - SSH username
   - `SSH_KEY` - Private SSH key
   - `VITE_API_URL` - Backend API URL

3. **Deploy**:
   ```bash
   git push origin main
   ```

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Date Formatting**: date-fns

## Development Tips

### Adding New Features

1. Create feature folder in `src/features/your-feature/`
2. Add components, API calls, and pages
3. Register routes in `App.tsx`

### API Integration

```typescript
// src/features/your-feature/api/yourApi.ts
import api from '@/lib/axios';

export const getData = async () => {
  const response = await api.get('/your-endpoint');
  return response.data;
};
```

### Using React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { getData } from './api/yourApi';

const { data, isLoading } = useQuery({
  queryKey: ['your-key'],
  queryFn: getData
});
```

## Environment Setup

### Development
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

### Production
- Backend: `https://api.yourdomain.com`
- Frontend: `https://app.yourdomain.com`

## Troubleshooting

### API Connection Issues
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS settings in backend

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version: `node -v` (should be 18+)

### Deployment Issues
- Check GitHub Actions logs
- Verify Nginx configuration
- Check server permissions on `/var/www/lead-gen-frontend`

## License

MIT
