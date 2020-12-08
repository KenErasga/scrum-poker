const { exec } = require("child_process");

exec("fly --target tutorial login --concourse-url http://127.0.0.1:8080 -u test -p test", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});