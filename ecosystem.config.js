module.exports = {
  apps: [
    {
      name: 'Nutripic',
      script: './dist/main.js',
      args: 'run start:dev',
      exec_mode: 'cluster',
      merge_logs: true,
      autorestart: true,
      listen_timeout: 5000,
      kill_timeout: 5000,
      env_production: {},
    },
  ],
};
