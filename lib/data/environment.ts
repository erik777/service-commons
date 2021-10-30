export class FirebaseConfig {
  constructor(
    public apiKey: string,
    public authDomain: string,
    public databaseURL: string,
    public projectId: string,
    public storageBucket: string,
    public messagingSenderId: string,
    public appId: string,
    public measurementId?: string,
  ) { }
}

export class Environment {
  constructor(
		public production = false,
    public serviceJsonUrl = './assets/conf/services.json',
    public cordova = false,
    public assetsUrl = './assets',
    public firebase?: FirebaseConfig,
  ) {}
}
