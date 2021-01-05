const { exec } = require("child_process");

module.exports = function addSecrets() {
    exec("kubectl create secret generic aws-credentials -n my-release-main\
    --from-file=aws-access-key=./aws-access-key.txt \
    --from-file=aws-secret-key=./aws-secret-key.txt \
    --from-file=aws-repo=./aws-repo.txt", (error, stdout, stderr) => {
    if (error) {
        console.log(`error on aws-credentials secret creation: ${error}`);
        return;
    }
    if (stderr) {
        console.log(`stderr on aws-credentials secret creation: ${stderr}`);
        return;
    }
    console.log(`aws-credentials secret creation is successful: ${stdout}`);
    });

    exec("kubectl create secret generic react-app-credentials -n my-release-main\
    --from-file=cognito-region=./cognito-region.txt \
    --from-file=cognito-user-pool-id=./cognito-user-pool-id.txt \
    --from-file=cognito-app-client-id=./cognito-app-client-id.txt  \
    --from-file=socket-io-host=./socket-io-host.txt", (error, stdout, stderr) => {
    if (error) {
        console.log(`error on react-app-credentials secret creation: ${error}`);
        return;
    }
    if (stderr) {
        console.log(`stderr on react-app-credentials secret creation: ${stderr}`);
        return;
    }
    console.log(`react-app-credentials secret creation is successful: ${stdout}`);
    });
}



