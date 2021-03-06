// Dependencies
const sqlite3 = require('sqlite3').verbose();

/* 
 * Thank you for using quick.db!
 * Author: TrueXPixels (youtube.com/c/TrueXPixels)
 * Queue System: Zelak312 (Zelak#6169)
 * Comments for the Queue System: Zelak312 (Zelak#6169)
 */
 
 /* * * * * * * * * * * * * 
 *               *         *
 *  TrueXPixels  *  Zelak  *
 *               *         *
 * * * * * * * * * * * * * */ 

// Queue System
//I will remake the queue system since I fill like it would
//also I didn't know if you wanted to have it on all none debug function but I made it, Sry if it wasn't this :(
let queue = [];

function executeQueue(object, queue) { //The executeQueue function will be called all the time there would need to queue up a function or to get the next function in the queue
    if (object) { //When I queue up the function the parameter object would be defined, if it's not queuing up something and just executing object would be undefined
        queue.push(object); //here I check if object is defined to queue it
        if (queue.length > 1) return; // after I look if it's the first element in the list if it's not the first then I return so the queue part ends here if there is already something in the queue
    }
    switch (queue.length) { // this works like a if statement so it takes the queue.length
        case 0: // if the queue.length == 0 then it execte the code here
            // No more functions in the queue
            break;

        default: // the default part is actiavted when the other cases are not valid so in this case if queue.length != 0
            let realObj = object ? object : queue[0]; //since this function queue up the function and dont return if its the first element I look if object is defined or I take the first fun in the queue
            tools[realObj.fun](...realObj.args).then((...result) => { //there it only execute the function in the tools variable with the args
                realObj.innerFunc[0](...result); //this will resolve the promise you passed in with the innerFunc proprety
                queue.shift(); // get the first elment of the array out so it pass to the next function
                executeQueue(null, queue); // re execute the queue without the object parameter so this will not queue up only execute the queue
            }).catch((...err) => {
                realObj.innerFunc[1](...err); // this will reject the error so you can use .catch same thing has resolve
                queue.shift(); // same thing has higher
                executeQueue(null, queue); // here too
            });
    }
} // NOTE the 3 dots ex: ...result only means that if there is more then one parameter it will get them all / or it you pass it as a parameter it will put them all like separated args

var tools = module.exports = {

    fetchObject: function(ID) {
        return new Promise((resolve, error) => { // I will just format this because its painful
            executeQueue({
                "fun": "fetchObjectDebug", // this is the function to execute
                "args": [ID], // this is the array of args you need so if you have ID, lol, what like args it would be [ID, lol, what]
                "innerFunc": [resolve, error] // this is to pass the promise because you need to resolve() or error() it so I pass it on the object so I can call them directly in the executeQueue function and it will resolve or error for the user
            }, queue); // here I pass the queue 

            // here you pass every args the execute function will need
        });
    },

    setArray: function(ID, array) {

        return new Promise((resolve, error) => {
            executeQueue({ "fun": "setArrayDebug", "args": [ID, array], "innerFunc": [resolve, error] }, queue);
        });

    },

    fetchArray: function(ID) {

        return new Promise((resolve, error) => {
            executeQueue({ "fun": "fetchArrayDebug", "args": [ID], "innerFunc": [resolve, error] }, queue);
        });

    },

    updateValue: function(ID, increase) {

        return new Promise((resolve, error) => {
            executeQueue({ "fun": "updateValueDebug", "args": [ID, increase], "innerFunc": [resolve, error] }, queue);
        });

    },

    updateText: function(ID, text) {

        return new Promise((resolve, error) => {
            executeQueue({ "fun": "updateTextDebug", "args": [ID, text], "innerFunc": [resolve, error] }, queue);
        });

    },

    // Ignore the ones below

    setArrayDebug: function(ID, array) {
        const getInfo = new Promise((resolve, error) => {

            // Check if array is an object
            if (typeof array !== 'object') {
                console.log('ARRAY is NOT AN ARRAY');
                return error('ERROR: ARRAY is NOT AN ARRAY')
            }

            let db;
            let response;
            let arrayKey;

            function createDb() { // Create Database Chain
                db = new sqlite3.Database('./arrays.sqlite', createTable);
            }

            function createTable() { // Create table if it doesn't exist
                db.run("CREATE TABLE IF NOT EXISTS arrays (ID TEXT, array TEXT)");
                checkForKey()
            }

            function checkForKey() { // Check if row exists w/ ID

                db.get(`SELECT * FROM arrays WHERE ID = (?)`, 'SECRET_ARRAYKEY_DONOTDELETE', function(err, row) {
                    if (!row || row.array === 'none') { // Run if row not found...
                        insertKey()
                    }
                    else { // Run if row found...
                        arrayKey = row.array
                        checkIfCreated()
                    }
                })

            }

            function insertKey() { // Create an empty row w/ ID

                let key = ''
                let possible = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϑϒϖ–—‚""„†‡•…‰‾€Π™←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋〈〉◊♠♣♥♦ŒœŠšŸƒ'
                for (var i = 0; i < 15; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));

                db.run("INSERT INTO arrays (ID,array) VALUES (?,?)", 'SECRET_ARRAYKEY_DONOTDELETE', key, checkForKey())
            }

            function checkIfCreated() { // Check if row exists w/ ID

                db.get(`SELECT * FROM arrays WHERE ID = (?)`, ID, function(err, row) {
                    if (!row) {
                        insertRows()
                    }
                    else {

                        let newArray = array.join(arrayKey)

                        db.run(`UPDATE arrays SET array = (?) WHERE ID = (?)`, newArray, ID);
                        db.get(`SELECT * FROM arrays WHERE ID = (?)`, ID, function(err, row) {
                            response = row.array.split(arrayKey);
                            returnDb()
                        })
                    }
                })

            }

            function insertRows() { // Create an empty row w/ ID
                db.run("INSERT INTO arrays (ID,array) VALUES (?,?)", ID, "", checkIfCreated)
            }

            function returnDb() { // Returns Row
                db.close();
                return resolve(response)
            }

            createDb()

        });

        return getInfo;

    },

    fetchArrayDebug: function(ID) {
        const getInfo = new Promise((resolve) => {

            let db;
            let response;
            let arrayKey;

            function createDb() { // Create Database Chain
                db = new sqlite3.Database('./arrays.sqlite', createTable)
            }

            function createTable() { // Create table if it doesn't exist
                db.run("CREATE TABLE IF NOT EXISTS arrays (ID TEXT, array TEXT)")
                checkForKey()
            }

            function checkForKey() { // Check if row exists w/ ID

                db.get(`SELECT * FROM arrays WHERE ID = (?)`, 'SECRET_ARRAYKEY_DONOTDELETE', function(err, row) {
                    if (!row || row.array === 'none') { // Run if row not found...
                        insertKey()
                    }
                    else { // Run if row found...
                        arrayKey = row.array
                        checkIfCreated()
                    }
                })

            }

            function insertKey() { // Create an empty row w/ ID

                let key = ''
                let possible = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϑϒϖ–—‚""„†‡•…‰‾€Π™←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋〈〉◊♠♣♥♦ŒœŠšŸƒ'
                for (var i = 0; i < 15; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));

                db.run("INSERT INTO arrays (ID,array) VALUES (?,?)", 'SECRET_ARRAYKEY_DONOTDELETE', key, checkForKey())
            }

            function checkIfCreated() { // Check if row exists w/ ID

                db.get(`SELECT * FROM arrays WHERE ID = (?)`, ID, function(err, row) {
                    if (!row) { // Run if row not found...
                        insertRows()
                    }
                    else { // Run if row found...
                        response = row.array.split(arrayKey);
                        returnDb()
                    }
                })

            }

            function insertRows() { // Create an empty row w/ ID
                db.run("INSERT INTO arrays (ID,array) VALUES (?,?)", ID, "", checkIfCreated)
            }

            function returnDb() { // Return Row
                db.close();
                return resolve(response)
            }

            createDb()

        });

        return getInfo

    },

    updateValueDebug: function(ID, increase) {

        const getInfo = new Promise((resolve, error) => {

            // Turns increase into a number automatically
            increase = parseInt(increase);

            // Check if increase is a number
            if (isNaN(increase)) {
                console.log('INCREASE VALUE is NOT A NUMBER');
                return error('ERROR: INCREASE VALUE is NOT A NUMBER')
            }

            let db;
            let response;

            function createDb() { // Create Database Chain
                db = new sqlite3.Database('./database.sqlite', createTable)
            }

            function createTable() { // Create table if it doesn't exist
                db.run("CREATE TABLE IF NOT EXISTS database (ID TEXT, value INTEGER, text TEXT)")
                checkIfCreated()
            }

            function checkIfCreated() { // Check if row exists w/ ID
                db.get(`SELECT * FROM database WHERE ID = (?)`, ID, function(err, row) {

                    if (!row) { // Run if it doesn't exist...
                        insertRows()
                    }
                    else { // Run if it does exist...
                        db.run(`UPDATE database SET value = (?) WHERE ID = (?)`, row.value + increase, ID);
                        db.get(`SELECT * FROM database WHERE ID = (?)`, ID, function(err, row) {
                            response = row;
                            returnDb()
                        })
                    }

                })
            }

            function insertRows() { // Create an empty row w/ ID
                db.run("INSERT INTO database (ID,value,text) VALUES (?,?,?)", ID, 0, "", checkIfCreated)
            }

            function returnDb() { // Return Row
                db.close();
                return resolve(response)
            }

            createDb()

        });

        return getInfo

    },

    fetchObjectDebug: function(ID) {
        const getInfo = new Promise((resolve) => {

            let db;
            let response;

            function createDb() { // Create Database Chain
                db = new sqlite3.Database('./database.sqlite', createTable)
            }

            function createTable() { // Create table if it doesn't exist
                db.run("CREATE TABLE IF NOT EXISTS database (ID TEXT, value INTEGER, text TEXT)", checkIfCreated)
            }

            function checkIfCreated() { // Check if row exists w/ ID

                db.get(`SELECT * FROM database WHERE ID = (?)`, ID, function(err, row) {
                    if (!row) { // Run if row not found...
                        insertRows()
                    }
                    else { // Run if row found...
                        response = row;
                        returnDb()
                    }
                })

            }

            function insertRows() { // Create an empty row w/ ID
                db.run("INSERT INTO database (ID,value,text) VALUES (?,?,?)", ID, 0, "", checkIfCreated)
            }

            function returnDb() { // Return Row
                db.close();
                return resolve(response)
            }

            createDb()

        });

        return getInfo

    },

    updateTextDebug: function(ID, text) {
        const getInfo = new Promise((resolve, error) => {

            // Check if text is a string
            if (typeof text !== 'string') {
                console.log('TEXT is NOT A STRING');
                return error('ERROR: TEXT is NOT A STRING')
            }

            let db;
            let response;

            function createDb() { // Create Database Chain
                db = new sqlite3.Database('./database.sqlite', createTable);
            }

            function createTable() { // Create table if it doesn't exist
                db.run("CREATE TABLE IF NOT EXISTS database (ID TEXT, value INTEGER, text TEXT)", checkIfCreated);
            }

            function checkIfCreated() { // Check if row exists w/ ID

                db.get(`SELECT * FROM database WHERE ID = (?)`, ID, function(err, row) {
                    if (!row) {
                        insertRows()
                    }
                    else {
                        db.run(`UPDATE database SET text = (?) WHERE ID = (?)`, text, ID);
                        db.get(`SELECT * FROM database WHERE ID = (?)`, ID, function(err, row) {
                            response = row;
                            returnDb()
                        })
                    }
                })

            }

            function insertRows() { // Create an empty row w/ ID
                db.run("INSERT INTO database (ID,value,text) VALUES (?,?,?)", ID, 0, "", checkIfCreated)
            }

            function returnDb() { // Returns Row
                db.close();
                return resolve(response)
            }

            createDb()

        });

        return getInfo;

    },

    fetchValue: function(ID) {

        console.log("\nQUICK.DB WARNING: 'fetchValue(ID).then(i => {})' is deprecated. Please use 'fetchObject(ID).then(i => {})")
        console.log("QUICK.DB WARNING: 'fetchValue(ID).then(i => {})' is deprecated. Please use 'fetchObject(ID).then(i => {})\n")

        const getInfo = new Promise((resolve) => {

            let db;
            let response;

            function createDb() { // Create Database Chain
                db = new sqlite3.Database('./database.sqlite', createTable)
            }

            function createTable() { // Create table if it doesn't exist
                db.run("CREATE TABLE IF NOT EXISTS database (ID TEXT, value INTEGER, text TEXT)", checkIfCreated)
            }

            function checkIfCreated() { // Check if row exists w/ ID

                db.get(`SELECT * FROM database WHERE ID = (?)`, ID, function(err, row) {
                    if (!row) { // Run if row not found...
                        insertRows()
                    }
                    else { // Run if row found...
                        response = row;
                        returnDb()
                    }
                })

            }

            function insertRows() { // Create an empty row w/ ID
                db.run("INSERT INTO database (ID,value,text) VALUES (?,?,?)", ID, 0, "", checkIfCreated)
            }

            function returnDb() { // Return Row
                db.close();
                return resolve(response)
            }

            createDb()

        });

        return getInfo

    }

    /* Disabled
        fetchTop: function(column, amount) { // Column == value, or text

            const getInfo = new Promise((resolve) => {

                // Return Statements
                if (column.toUpperCase() !== 'VALUE'.toUpperCase() || column.toUpperCase() !== 'TEXT'.toUpperCase()) {
                    console.log('Quick.db Error w/ fetchTop: Column can only be (VALUE, TEXT).')
                    return error('Quick.db Error w/ fetchTop: Column can only be (VALUE, TEXT).')
                }

                if (isNaN(amount)) {
                    console.log('Quick.db Error w/ fetchTop: amount is not an integer.')
                    return error('Quick.db Error w/ fetchTop: amount is not an integer.')
                }


                let db;
                let response;

                function createDb() { // Create Database Chain
                    db = new sqlite3.Database('./database.sqlite', createTable)
                }

                function createTable() { // Create table if it doesn't exist
                    db.run("CREATE TABLE IF NOT EXISTS database (ID TEXT, value INTEGER, text TEXT)", checkIfCreated)
                }

                function checkIfCreated() { // Check if row exists w/ ID

                    db.get(`SELECT * FROM database ORDER BY (?) DESC LIMIT (?)`, column, amount, function(err, rows) {
                        if (!rows) { // Run if row not found...
                            insertRows()
                        }
                        else { // Run if row found...

                            function asyncFunction(item, callback) {
                                setTimeout(() => {
                                    console.log(`Parsed: ${item}`)
                                    callback();
                                }, 100)
                            }

                            let requests = rows.forEach(item => {
                                return new Promise((resolve) => {
                                    asyncFunction(item, resolve);
                                });
                            })

                            requests.then(() => {
                                response = rows
                                returnDb()
                            })

                        }
                    })

                }

                function insertRows() { // Create an empty row w/ ID
                    db.run("INSERT INTO database (ID,value,text) VALUES (?,?,?)", ID, 0, "", checkIfCreated)
                }

                function returnDb() { // Return Row
                    db.close();
                    return resolve(response)
                }

                createDb()

            });

            return getInfo

        }
    */

};
