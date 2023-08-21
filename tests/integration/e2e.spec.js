const {Region, TestComposer} = require('../../src/index');
const Readable = require('stream').Readable;

let client;

beforeAll(() => {
  // Set your credentials!
  expect(process.env.SAUCE_USERNAME).toBeDefined()
  expect(process.env.SAUCE_ACCESS_KEY).toBeDefined()

  client = new TestComposer({
    region: 'us-west-1',
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    headers: {'User-Agent': `node-testcomposer/0.0.0`}
  })
});

test('creating JavaScript framework reports', async () => {
  const job = await client.createReport({
    name: "node-testcomposer - JS report creation",
    passed: true,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    browserName: "Chrome",
    browserVersion: "105",
    framework: "playwright",
    frameworkVersion: "1.25.0",
    platformName: "Windows 11"
  });

  expect(job.id).toBeDefined();
  expect(job.url).toBeDefined();

  console.log(`Job creation successful: ${job.url}`);

  const s = new Readable();
  s.push('hello!');
  s.push(null);

  const uploads = await client.uploadAssets(job.id, [{filename: "console.log", data: s}]);
  expect(uploads.uploaded.length).toBe(1);
});

test('creating selenium reports', async () => {
  const job = await client.createReport({
    name: "node-testcomposer - selenium report creation",
    passed: true,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    browserName: "Chrome",
    browserVersion: "105",
    framework: "webdriver",
    platformName: "Windows 11"
  });

  expect(job.id).toBeDefined();
  expect(job.url).toBeDefined();

  console.log(`Job creation successful: ${job.url}`);

  const content = `
  {
    "screenshot": null,
    "suggestion_values": [
 
    ],
    "request": {

    },
    "result": {

    },
    "path": "element",
    "HTTPStatus": 200,
    "method": "POST",
    "statusCode": 0 // 0 for passed status, non-zero for failed
  }
]`;

  const s = new Readable();
  s.push(content);
  s.push(null);

  const uploads = await client.uploadAssets(job.id, [{filename: "log.json", data: s}]);
  expect(uploads.uploaded.length).toBe(1);
});

test('creating Espresso reports', async () => {
  const job = await client.createReport({
    name: "node-testcomposer - espresso report creation",
    passed: true,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    framework: "espresso",
    platformName: "Linux",
    deviceName: "Android GoogleAPI Emulator",
    platformVersion: "12.0.",
  });

  expect(job.id).toBeDefined();
  expect(job.url).toBeDefined();

  console.log(`Job creation successful: ${job.url}`);

  const content = `{
    "package_name": "com.saucelabs.mydemoapp.android",
    "status": "success",
    "stdout": "I am output",
    "tests": [
      {
        "class": "com.saucelabs.mydemoapp.android.view.activities.DashboardToCheckout",
        "name": "dashboardProductTest",
        "status": "success",
        "status_code": 0,
        "test_number": "1"
      }
    ]
  }`;
  const s = new Readable();
  s.push(content);
  s.push(null);

  const uploads = await client.uploadAssets(job.id, [{filename: "native-log.json", data: s}]);
  expect(uploads.uploaded.length).toBe(1);
});

test('creating XCUITest reports', async () => {
  const job = await client.createReport({
    name: "node-testcomposer - xcuitest report creation",
    passed: true,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    framework: "xcuitest",
    platformName: "Mac 12",
    deviceName: "iPhone 11 Simulator",
    platformVersion: "16.2",
  });

  expect(job.id).toBeDefined();
  expect(job.url).toBeDefined();

  console.log(`Job creation successful: ${job.url}`);

  const content = `<testsuites name="All tests" tests="1" failures="0">
  <testsuite name="DemoAppUITests.DemoAppUIAnotherTests" tests="1" failures="0">
      <testcase classname="DemoAppUITests.DemoAppUIAnotherTests" name="testExample" time="9.561" />
  </testsuite>
</testsuites>`;

  const s = new Readable();
  s.push(content);
  s.push(null);

  const uploads = await client.uploadAssets(job.id, [{filename: "junit.xml", data: s}]);
  expect(uploads.uploaded.length).toBe(1);
});
