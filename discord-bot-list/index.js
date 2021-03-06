const request = require("request")
module.exports = class Client {
    constructor(options) {
        this.options = {
            token: options.token,
            id: options.id
        }
    }
    getUser(id, callback) {
        if(typeof callback !== "function") {
            throw new Error(`Callback function is not a function but a ${typeof callback} instead`, null)
        } else {
            if(typeof id !== "string") {
                callback(new Error(`ID is not a string but a ${typeof id} instead`), null)
            } else {
                request(`https://discordbots.org/api/users/${id}`, (err, res, body) => {
                    if(err) {
                        callback(err, null)
                    } else {
                        if(res.statusCode !== 200) {
                            callback(new Error(`Got HTTP Code ${res.statusCode}`), null)
                        } else {
                            body = JSON.parse(body)
                            if(body.error) {
                                callback(new Error(body.error), null)
                            } else {
                                callback(null, body)
                            }
                        }
                    }
                })
            }
        }
    }
    getBot(id, callback) {
        if(typeof callback !== "function") {
            throw new Error(`Callback function is not a function but a ${typeof callback}`, null)
        } else {
            if(typeof id !== "string") {
                callback(new Error(`ID is not a string but a ${typeof id} instead`), null)
            } else {
                request(`https://discordbots.org/api/bots/${id}`, (err, res, body) => {
                    if(err) {
                        callback(err, null)
                    } else {
                        if(res.statusCode !== 200) {
                            callback(new Error(`Got HTTP Code ${res.statusCode}`), null)
                        } else {
                            body = JSON.parse(body)
                            if(body.error) {
                                callback(new Error(body.error), null)
                            } else {
                                callback(null, body)
                            }
                        }
                    }
                })
            }
        }
    }
    getVotes(callback) {
        if(typeof callback !== "function") {
            throw new Error(`Callback function is not a function but a ${typeof callback}`, null)
        } else {
            if(typeof id !== "string") {
                callback(new Error(`ID is not a string but a ${typeof id} instead`), null)
            } else {
                request(`https://discordbots.org/api/bots/${this.options.id}/votes`, (err, res, body) => {
                    if(err) {
                        callback(err, null)
                    } else {
                        if(res.statusCode !== 200) {
                            callback(new Error(`Got HTTP Code ${res.statusCode}`), null)
                        } else {
                            body = JSON.parse(body)
                            if(body.error) {
                                callback(new Error(body.error), null)
                            } else {
                                callback(null, body)
                            }
                        }
                    }
                })
            }
        }
    }
    postStats(serverCount, callback) {
        if(typeof callback !== "function") {
            throw new Error(`Callback function is not a function but a ${typeof callback}`, null)
        } else {
            if(typeof serverCount !== "number") {
                callback(new Error(`serverCount is not a number but a ${typeof number} instead`), null)
            } else {
                if(!this.options.token) {
                    callback(new Error(`No token defined`))
                } else {
                    if(!this.options.id) {
                        callback(new Error(`No bot ID defined`))
                    } else {
                        request.post({
                                url: `https://discordbots.org/api/bots/${this.options.id}/stats`,
                                form: {server_count: serverCount},
                                json: true,
                                headers: {
                                    Authorization: this.options.token
                                }
                            },
                            (err, res, body) => {
                                if(err) {
                                    callback(err, null)
                                } else {
                                    if(res.statusCode !== 200) {
                                        callback(new Error(`Got HTTP Code ${res.statusCode}`), null)
                                    } else {
                                        if(body.error) {
                                            callback(new Error(body.error), null)
                                        } else {
                                            callback(null, body)
                                        }
                                    }
                                }
                            })
                    }
                }
            }
        }
    }
}
