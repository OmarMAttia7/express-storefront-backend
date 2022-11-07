const { spawnSync } = require("node:child_process");
function runScript(scriptObject, stopOnError) {
  stopOnError = stopOnError === undefined ? true : stopOnError;
  const spawn = spawnSync(scriptObject.script, (scriptObject.options || []),
  {
    stdio: 'inherit',
    env: process.env
  });

  if(stopOnError) stopProcess(spawn);
}

function stopProcess(spawn) {
  if(spawn.status !== 0) {
    process.stderr.write(`\nProcess exited with exit code ${spawn.status}\n`);
    process.exit(spawn.status);
  }
}

module.exports = {runScript, stopProcess};