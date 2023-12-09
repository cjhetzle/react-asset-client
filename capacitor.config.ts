import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'react-asset-client',
  webDir: 'dist',
  plugins: {
    LiveUpdates: {
      appId: 'f0ddf5df',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
