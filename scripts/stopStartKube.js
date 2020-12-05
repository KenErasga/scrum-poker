const { exec } = require("child_process");

    exec("minikube delete && minikube start --disk-size=250000mb --memory=4gb --driver=virtualbox", (error, stdout, stderr) => {
        if (error) {
            console.log(`error on minikube: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr on minikube: ${stderr}`);
            return;
        }
        console.log(`stdout on minikube: ${stdout}`);
    });