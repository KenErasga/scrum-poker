const { exec } = require("child_process");

    exec("minikube delete", (error, stdout, stderr) => {
        if (error) {
            console.log(`error on minikube delete: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr on minikube delete: ${stderr}`);
            return;
        }
        console.log(`stdout on minikube delete: ${stdout}`);
    }); 
