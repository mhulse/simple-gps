const gps = require('../index');

(async () => {

  try {
    const before = await gps('a.jpg');
    console.log(before);
  } catch(err) {
    console.error(err);
  }

  console.log('-------------------------------------------');

  try {
    const write = await gps('a.jpg', -5, -5);
    console.log(write);
  } catch(err) {
    console.error(err);
  }

  console.log('-------------------------------------------');

  try {
    const after = await gps('a.jpg');
    console.log(after);
  } catch(err) {
    console.error(err);
  }

})();
