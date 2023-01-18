const fs = require('fs');

function readFromFile(filename) {
    try {
        const data = fs.readFileSync(filename);
        return JSON.parse(data);
    }
    catch (err) {
        console.log(err)
        return {};
    }
}

function writeToFile(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.log(err)
    }
}

function createSampleData() {
    return {
        "startState": "",
        "endStates": [],
        "states": []
    }
}

// Finds the start state from the tangrams data
function findStartStateId(tangramsData) {
    return tangramsData.states.find(state => state.stateType === 'START_STATE').stateId;
}

// Extracts the edges from the tangrams data's connections
function getEdges(tangramsData) {
    return tangramsData.connections.map(connection => {
        return {
            "from": connection.connectionFrom,
            "to": connection.connectionTo, 
        }
    })
}

function addEdgesToFSM(fsm, edges) {
    edges.forEach(edge => {
        // check if from state exists
        const fromState = fsm.states.find(state => state.id === edge.from);
        // if not, create it, and add the to state
        if (!fromState) {
            fsm.states.push({
                "id": edge.from,
                "dest": [
                    edge.to
                ]
            })
        }
        // if it does, check if the to state is already in the dest array before adding
        else {
            if (!fromState.dest.includes(edge.to)) {
                fromState.dest.push(edge.to);
            }
        }
        // check if to state exists, if not add it to the fsm
        const toState = fsm.states.find(state => state.id === edge.to);
        if (!toState) {
            fsm.states.push({
                "id": edge.to,
                "dest": []
            })
        }
    })
}

// Looks for end states by finding states with no destinations
function findEndStateIds(fsm) {
    return fsm.states.filter(state => state.dest.length === 0).map(state => state.id);
}


const TangramsData = readFromFile('TangramsRace.json');

const fsm = createSampleData();

fsm.startState = findStartStateId(TangramsData);

const edges = getEdges(TangramsData);

addEdgesToFSM(fsm, edges);

fsm.endStates = findEndStateIds(fsm);

writeToFile('SimpleGraph.json', fsm);