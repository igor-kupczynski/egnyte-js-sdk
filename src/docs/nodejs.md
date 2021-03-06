#Usage notes for node.js

The authorization flow has to be done in the browser, so you'll need to get the access token from there and initialize Egnyte with the token. 
The only auth method that can be successfully used server-side is the password grant, `API.auth.requestTokenByPassword` which is available for "internal applications". (You need to become Egnyte partner to get a key for such an app)

All API methods work as described in main docs, with the following exceptions:

`API.storage.storeFile` accepts a data stream instead of a blob. It also takes two optional arguments which are MIME type and size (in bytes) of stream.

```javascript
var fileStream = fs.createReadStream('sample.txt')
egnyte.API.storage.storeFile(pathFromRoot, fileStream, "text/plain", 1105)
    .then(function(filemeta){
        //
    })

```

`API.storage.streamToChunks` accepts a data stream, splits it in chunks and uses chunked upload to send it to Egnyte. Accepts path, stream, optional mime type and optional chunk size. Chunk size defaults to 10KB but it can be as much as 100MB if you know the file's big. 
Resolves to the same signature as `storeFile` and fails if any chunk failed to upload.

```
var fileStream = fs.createReadStream('sample.txt')
egnyte.API.storage.streamToChunks(pathFromRoot, fileStream, "text/plain" )
    .then(function(filemeta){
        //
    })

```

`API.storage.getFileStream` a new method for node to get a response that can be used with streams. Use it instead of `API.storage.download`
This method resolves its promise to the response object of the API, with a paused data stream. This method also handles queueing and QPS limits transparently.


```javascript
egnyte.API.storage.getFileStream(pathFromRoot)
    .then(function(pausedResponse){
        pausedResponse.pipe(whereverYouWant);
        pausedResponse.resume(); //Be sure to resume the paused stream
    });

```

The streams are handled by the `request` npm module. The functionality of pausing and resuming streams was introduced in nodejsv0.10 and will not work in older versions.