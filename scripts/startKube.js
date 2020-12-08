const { exec } = require("child_process");

    exec("minikube start --disk-size=250000mb --memory=4gb  --driver=virtualbox", (error, stdout, stderr) => {
        if (error) {
            console.log(`error on minikube start: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr on minikube start: ${stderr}`);
            return;
        }
        console.log(`stdout on minikube start: ${stdout}`);
    }); 
