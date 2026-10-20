const path=require('node:path');const major=Number(require('../package.json').version.split('.')[0]);module.exports=(suffix='')=>path.posix.join('artifacts',`v${major}`,suffix);
