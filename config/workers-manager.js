//core
const { spawn } = require('child_process');

//config
const workersPath = "/../app/workers/";
const registeredWorkers = [
	//"notifications-worker",
	//"job-processor"
];

//registering workers as separate processes
registeredWorkers.forEach(workerName => {

	let subprocess = spawn("node ", [ __dirname + workersPath + workerName + ".js" ], { shell: true,  stdio: 'inherit' });
	subprocess.on('close', (code) => console.log(`child process exited with code ${code}`));
	subprocess.on('error', () => console.log(`child process error`));
});