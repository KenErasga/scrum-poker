const { exec } = require("child_process");

exec("export POD_NAME=$(kubectl get pods --namespace default -l 'app=my-release-web' -o jsonpath='{.items[0].metadata.name}') && kubectl port-forward --namespace default $POD_NAME 8080:8080", (error, stdout, stderr) => {
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