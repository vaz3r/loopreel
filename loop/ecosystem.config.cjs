module.exports = {
  apps: [
    {
      name: 'loop-editor',
      script: 'npx',
      args: 'vite --host',
      cwd: __dirname,
      watch: false,
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
