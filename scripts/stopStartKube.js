const { exec } = require("child_process");

    exec("minikube delete && minikube start --disk-size=100000mb --memory=6gb --driver=kvm2", (error, stdout, stderr) => {
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