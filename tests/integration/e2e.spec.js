const {Region, TestComposer} = require('../../src/index');
const Readable = require('stream').Readable;

let client;

beforeAll(() => {
  // Set your credentials!
  expect(process.env.SAUCE_USERNAME).toBeDefined()
  expect(process.env.SAUCE_ACCESS_KEY).toBeDefined()

  client = new TestComposer({
    region: Region.USWest1,
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    headers: {'User-Agent': `node-testcomposer/0.0.0`}
  })
});

test('creating reports', async () => {
  const job = await client.createReport({
    name: "node-testcomposer - report creation",
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
