module.exports = {
    apps: [
        {
            name: "manage-my-life",
            script: "pnpm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            }
        }
    ]
}