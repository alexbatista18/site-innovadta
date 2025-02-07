const concurrently = require("concurrently");
const upath = require("upath");

const browserSyncPath = upath.resolve(
    upath.dirname(__filename),
    "../node_modules/.bin/browser-sync"
);

// Execute apenas os processos necessários e mantenha o ambiente.
concurrently(
    [
        {
            command: "node scripts/sb-watch.js",
            name: "SB_WATCH",
            prefixColor: "bgBlue.bold",
        },
        {
            command: `"${browserSyncPath}" --reload-delay 2000 --reload-debounce 2000 dist -w --no-online`,
            name: "SB_BROWSER_SYNC",
            prefixColor: "bgGreen.bold",
        },
    ],
    {
        prefix: "name",
        killOthers: ["failure", "success"],
        restartable: "always", // Faz com que os processos sejam reiniciados somente se o usuário encerrar manualmente.
    }
).then(success, failure);

function success() {
    console.log("Success");
}

function failure() {
    console.log("Failure");
}
