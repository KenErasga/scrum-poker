const { exec } = require("child_process");
const addSecrets = require("./addSecrets");

exec("helm install my-release -f ../cicd/values.yaml concourse/concourse", (error, stdout, stderr) => {
    if (error) {
        console.log(`error on installing concourse on kube: ${error}`);
        return;
    }
    if (stderr) {
        console.log(`stderr on installing concourse on kube: ${stderr}`);
        return;
    }
    console.log(`installing concourse on kube is successful: ${stdout}`);
    if (stdout) {
        addSecrets();
        return;
    }
});