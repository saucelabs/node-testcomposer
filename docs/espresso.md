# Create Reports for Espresso

## Create Reports

```javascript
const job = await client.createReport({
  name: "My Fancy Espresso Job!",
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  framework: "espresso",
  platformName: "Linux",
  deviceName: "Android GoogleAPI Emulator",
  platformVersion: "12.0."
});

console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

## Upload Log

In order to view your test results in the SauceLabs web app, you must upload a test report file along with the report created in the step above.

The minimum `native-log.json` file to populate the command list on Sauce Labs web UI:

```json
{
  "filters": [
    
  ],
  "package_name": "com.saucelabs.mydemoapp.android",
  "status": "success",
  "stdout": "I am output",
  "tests": [
    {
      "class": "com.saucelabs.mydemoapp.android.view.activities.DashboardToCheckout",
      "failure_reason": null,
      "name": "dashboardProductTest",
      "status": "success",
      "status_code": 0, // 0 for passed status, non-zero for failed
      "stream": null,
      "test_number": "1"
    }
  ]
}
```

To upload `native-log.json`:

```javascript
const uploads = await client.uploadAssets(
  job.id,
  [{
    filename: "native-log.json",
    data: fs.createReadStream("native-log.json")
  }]
);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```
