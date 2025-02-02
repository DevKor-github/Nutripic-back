module.exports = {
  apps: [
    {
      name: 'Nutripic',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      merge_logs: true,
      autorestart: true,
      listen_timeout: 5000,
      kill_timeout: 5000,
    },
  ],
};
