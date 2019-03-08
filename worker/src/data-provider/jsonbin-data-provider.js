class JsonbinDataProvider {
  constructor() {
    this.cfpEndsSoon = process.env.JSONBIN_CFP_ENDS_SOON_ID;
    this.confStartsSoon = process.env.JSONBIN_STARTS_SOON_ID;
  }

  getCfps() {
    return this.get(this.cfpEndsSoon);
  }

  getStartingSoon() {
    return this.get(this.confStartsSoon);
  }

  get(id) {
    return fetch('https://api.jsonbin.io/b/' + id + '/latest').then(res => res.json());
  }
}

module.exports = new JsonbinDataProvider();
