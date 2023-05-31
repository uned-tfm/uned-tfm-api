// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'tfm-malware-api',
      script: 'node /tfm-malware-api/src/apps/malware-api/index.js',
      error_file: './pm2-logs/tfm-malware-api-err.log',
      out_file: './pm2-logs/tfm-malware-api-output.log'
    }
  ]
};
