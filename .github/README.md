# GitHub Actions Workflows

This repository includes GitHub Actions workflows for automated CI/CD.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Jobs:**
- Sets up Node.js 20
- Installs dependencies
- Runs linter
- Builds production bundle

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to `main` branch

**Jobs:**
- Builds production bundle
- Deploys to server via SCP
- Reloads Nginx

## Required GitHub Secrets

Add these secrets in GitHub repository settings:

**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SSH_HOST` | Server IP/hostname | `123.456.789.0` |
| `SSH_USER` | SSH username | `root` |
| `SSH_KEY` | Private SSH key | Your private key content |
| `VITE_API_URL` | Backend API URL | `https://api.yourdomain.com` |

### Setting up SSH_KEY

1. **Generate SSH key pair**:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy
   ```

2. **Copy public key to server**:
   ```bash
   ssh-copy-id -i ~/.ssh/github_deploy.pub root@your-server
   ```

3. **Add private key to GitHub**:
   ```bash
   cat ~/.ssh/github_deploy
   ```
   Copy the output and add as `SSH_KEY` secret in GitHub.

## Server Setup

On your production server:

1. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. **Create directory**:
   ```bash
   sudo mkdir -p /var/www/lead-gen-frontend
   sudo chown -R $USER:$USER /var/www/lead-gen-frontend
   ```

3. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/lead-gen-frontend
   ```
   
   ```nginx
   server {
       listen 80;
       server_name app.yourdomain.com;
       
       root /var/www/lead-gen-frontend;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/lead-gen-frontend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Setup SSL** (optional but recommended):
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d app.yourdomain.com
   ```

## Deployment Process

1. Push code to `main` branch
2. GitHub Actions automatically builds and deploys
3. Frontend is updated on server
4. Nginx serves the new version

## Monitoring

- **GitHub**: Actions tab shows workflow status
- **Server**: `sudo tail -f /var/log/nginx/access.log`

## Troubleshooting

### Build Failed
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs in GitHub Actions

### Deployment Failed
- Verify GitHub secrets are correct
- Check server SSH access
- Ensure `/var/www/lead-gen-frontend` exists and has correct permissions

### Nginx Issues
- Test config: `sudo nginx -t`
- Check logs: `sudo tail -f /var/log/nginx/error.log`
- Reload: `sudo systemctl reload nginx`
