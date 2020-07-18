const httpReferrer = require('./httpreferrer'),
  fileUtil = require('./fileutil'),
  //default data folder
  path = require('path'),
  dataFolder = path.resolve('./data') + path.sep,
  //file save throttling - no more than every 10 seconds
  saveFrequency = 10 * 1000;

module.exports = class {
  constructor() {
    this.counter = {};

    (async () => {
      //store folder available?
      this.folder = await fileUtil.folderUsable(dataFolder);
      if (!this.folder) return;

      this.saved = await fileUtil.folderList(this.folder.path, '.json');

      //import and merge latest data
      if (this.saved.length) {
        Object.assign(this.counter, require(this.saved[0].path));
      }
    })();
  }

  count(req) {
    let hash = httpReferrer(req);
    if (!hash) return null;

    this.counter[hash] = this.counter[hash] || 0;

    // save event
    this.saveTimer =
      this.saveTimer || setTimeout(this.save.bind(this), saveFrequency);

    return ++this.counter[hash];
  }

  async save() {
    //can save
    if (!this.folder) return;

    //save new file
    let fn = `${this.folder.path}hit${+new Date()}.json`;

    if (await fileUtil.write(fn, JSON.stringify(this.counter))) {
      console.log(`page hits stored: ${fn}`);

      //delete old files
      fileUtil.unlinkMany(this.saved);

      //add current file to saved list

      this.saved = [{ path: fn }];
    }

    //reset timer
    this.saveTimer = null;
  }
};
