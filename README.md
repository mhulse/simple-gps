# Simple GPS

**Read and write GPS metadata to image files using [`exiftool`](https://exiftool.org/).**

This Node.js module provides a minimal async API for embedding or removing GPS coordinates from image files, and for reading existing location metadata.

> ⚠️ Requires `exiftool` to be installed and available on your system PATH.

## Usage

```js
import gps from 'simple-gps'

const image = '/path/to/image.jpg'

// Read GPS data:
const data = await gps(image)

// Write GPS coordinates:
await gps(image, 44.0520691, -123.0867536)

// Remove GPS metadata:
await gps(image, true)
```

## CLI example

```bash
npm run example
```

This will copy a test fixture to your temp directory, mutate it with GPS data, and print before/after output.

## Install

```bash
npm install simple-gps
```

## Development

```bash
npm test
```

Includes Mocha tests that cover read, write, and clear operations using an isolated fixture.

## License

Copyright © 2019–2025
Michael Hulse

Licensed under the Apache License, Version 2.0 (the “License”).
You may not use this work except in compliance with the License.
You may obtain a copy of the License in the `LICENSE` file or at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
