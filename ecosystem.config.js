module.exports = {
    apps: [
        {
            name: "atul-automation",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
            },
        },
    ],
};
