# Create Reports for Selenium

## Create Reports

```javascript
const job = await client.createReport({
  name: 'My Fancy Selenium Job!',
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  browserName: 'Chrome',
  browserVersion: '105',
  framework: 'webdriver',
  platformName: 'Windows 11',
});

console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

## Upload Log

In order to view your test results in the SauceLabs web app, you must upload a test report file along with the report created in the step above.

The minimum `log.json` file to populate the command list on Sauce Labs web UI:

```json
[
  {
    "screenshot": null,
    "suggestion_values": [],
    "request": {},
    "result": {},
    "path": "element",
    "HTTPStatus": 200,
    "method": "POST",
    "statusCode": 0 // 0 for passed status, non-zero for failed
  }
]
```

To upload `log.json`:

```javascript
const uploads = await client.uploadAssets(job.id, [
  {
    filename: 'log.json',
    data: fs.createReadStream('log.json'),
  },
]);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```
