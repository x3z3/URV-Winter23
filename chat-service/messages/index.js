import express from 'express';

const app = express();

app.use(express.json());

// Messages database (Its just a local variable, but it could be a data base)
const messages = {};

// Serial ID for messages. This is used to identify order of messages
let serialID = 0;

// Adds a message to the data base - in this case the local variable called messages
function addMessage(message) {
    if (!messages[message.sender]) {
        messages[message.sender] = [];
    } 
    messages[message.sender].push({
        reciever: message.reciever,
        message: message.message,
        id: serialID,
    });
    serialID += 1;
}

// Puts a message into the data base
app.post('/message', (req, res) => {
    // Requires sender-name, reciever-name and message in the body
    const data = req.body;
    if (!data.sender || !data.reciever || !data.message) {
        res.status(400).send('Invalid message');
        return;
    }
    addMessage(data);
    res.status(200).send('Message recieved')
});

app.get('/messages/:sender', (req, res) => {
    // Requires sender name to be in the url parameter
    const sender = req.params.sender;
    if (!messages[data.sender]) {
        res.status(200).send([]);
        return;
    }
    res.status(200).send(messages[sender]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});