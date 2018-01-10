# Socket Docs

Short documentation to send information by socket about changes on the Project Gantt.


## Connect 

Connect with socket server and room.

```js
var socket = io.connect('http://35.167.196.64:8100');

socket.on('connect', function (data) {
    socket.emit('join room', 'idProject' );
});
```

## Event time

Example 

```js
socket.on('time', function(data) {
    console.log(data);
    // Method to create task on gantt
});
```

Where data is: 

```json
{
    "time_now": 1511863680009
}
```

## Event addTask 

Example 

```js
socket.on('addTask', function(data) {
    console.log(data);
    // Method to create task on gantt
});
```

Where data is: 

```json
{
    "_id": "59e5aa134f0558095297e2e0",
    "start_date": "2017-10-16 02:00:0",
    "end_date": "2017-10-17 02:00:00",
    "project": "59df4c714fbe2a1ca7665fa2",
    "parent": "0",
    "duration": 24,
    "action_window_duration": 16,
    "action_window_progress": 0, 
    "progress": 0.6,
    "type_task": "action_window",
    "text": "New task",
    "description": "example description",
    "activity_type": "developent", 
    "open": true
}
```

## Event updateTask

Example 

```js
socket.on('updateTask', function(data) {
    console.log(data);
    // Method to update task on gantt
});
```

Where data is: 

```json
{
    "_id": "59e5aa134f0558095297e2e0",
    "start_date": "2017-10-16 02:00:0",
    "end_date": "2017-10-17 02:00:00",
    "project": "59df4c714fbe2a1ca7665fa2",
    "parent": "0",
    "duration": 24,
    "action_window_duration": 16,
    "action_window_progress": 0, 
    "progress": 0.6,
    "type_task": "action_window",
    "text": "New task",
    "description": "example description",
    "activity_type": "developent", 
    "open": true
}
```

## Event deleteTask

Example 

```js
socket.on('deleteTask', function(data) {
    console.log(data);
    // Method to update task on gantt
});
```

Where data is: 

```json
{
    "_id": "59e5aa134f0558095297e2e0",
}
```


## Event addLink

Example 

```js
socket.on('addLink', function(data) {
    console.log(data);
    // Method to update task on gantt
});
```

Where data is: 

```json
{
    "source": "59e5aa134f0558095297e2e0",
    "target": "59e5aa134f0558095297e2e2",
    "type": "1", 
    "id": "59e5aa134f055809529dad3" 
}
```

## Event updateLink

Example 

```js
socket.on('updateLink', function(data) {
    console.log(data);
    // Method to update task on gantt
});
```

Where data is: 

```json
{
    "source": "59e5aa134f0558095297e2e0",
    "target": "59e5aa134f0558095297e2e2",
    "type": "1",  
    "id": "59e5aa134f055809529dad3" 
}
```

## Event deleteLink

Example 

```js
socket.on('deleteLink', function(data) {
    console.log(data);
    // Method to update task on gantt
});
```

Where data is: 

```json
{
    "_id": "59e5aa134f0558095297e2e0",
}
```