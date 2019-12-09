const parallel = require('mocha.parallel');
const assert = require("assert");

const TeemoJS = require("../index");

describe('DDragon API', function() {
  this.slow(1500);

  const api = TeemoJS(TeemoJS.ddragonConfig);
  let version;

  before(async function() {
    const versions = await api.send('api.versions');
    version = versions[0];
  });

  it('gets champion.json', async function() {
    const data = await api.send('cdn.champion', { version, locale: 'en_US' });
    assert.ok(data);
    assert.equal(data.data['Teemo'].title, "the Swift Scout");
  });
  it('gets Teemo.json', async function() {
    const data = await api.send('cdn.championByKey', [ version, 'en_US', 'Teemo' ]);
    assert.ok(data);
    assert.equal(data.data['Teemo'].title, "the Swift Scout");
  });
  it('gets map.json', async function() {
    const data = await api.send('cdn.map', [ version, 'ja_JP' ]);
    assert.ok(data);
    assert.equal(data.data['11'].MapName, 'サモナーズリフト');
  });
});