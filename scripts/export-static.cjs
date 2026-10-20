// Portable Next export launcher: works in Windows npm scripts as well as POSIX shells.
const {spawnSync}=require('node:child_process');
const result=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build'],{stdio:'inherit',env:{...process.env,BIOVENT_STATIC_EXPORT:'1'}});
if(result.error){console.error(result.error.message);process.exit(1)}process.exit(result.status??1);
