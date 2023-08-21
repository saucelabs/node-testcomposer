# Create Reports for XCUITest

## Create Reports

```javascript
const job = await client.createReport({
  name: "My Fancy XCUITest Job!",
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  framework: "xcuitest",
  platformName: "iOS",
  deviceName: "iPhone 11 Simulator",
  platformVersion: "16.2",
});

console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

## Upload Log

In order to view your test results in the SauceLabs web app, you must upload a test report file along with the report created in the step above.

The minimum `junit.xml` file to populate the command list on Sauce Labs web UI:

```xml
<testsuites name="All tests" tests="1" failures="0">
    <testsuite name="DemoAppUITests.DemoAppUIAnotherTests" tests="1" failures="0">
        <testcase classname="DemoAppUITests.DemoAppUIAnotherTests" name="testExample" time="9.561" />
    </testsuite>
</testsuites>
```

To upload `junit.xml`:

```javascript
const uploads = await client.uploadAssets(
  job.id,
  [{
    filename: "junit.xml",
    data: fs.createReadStream("junit.xml")
  }]
);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```
