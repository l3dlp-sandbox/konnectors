// Generated by CoffeeScript 1.11.1
var api, baseOVHKonnector, connector, link, name, slug;

baseOVHKonnector = require('../lib/base_ovh_konnector');

name = 'Runabove';

slug = 'runabove';

link = 'runabove.com';

api = {
  endpoint: 'runabove-ca',
  appKey: '6flmchEj8cORJnv9',
  appSecret: '6CzGLAmbfsFfrIIscN7QCgEQd3ka7t90'
};

connector = module.exports = baseOVHKonnector.createNew(api, name, slug, link);
