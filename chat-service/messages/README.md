# Messages

## Messages data base structure
``` json
{
    "user1" : [
        {
            "recv": "user2",
            "message": "Hello",
            "id": 1
        },
        {
            "reciever": "user2",
            "message": "How are you?"
            "id": 3
        }
    ],
    "user2" : [
        {
            "reciever": "user1",
            "message": "Hello",
            "id": 2
        },
        {
            "reciever": "user1",
            "message": "I am fine",
            "id": 4
        }
    ]
}
```

## Message data structure
``` json
{
    "sender" : "user1",
    "reciever" : "user2",
    "message" : "Hello!"
}