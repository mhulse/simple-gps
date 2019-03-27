const gps = require('../index');

(async () => {

  try {
    const before = await gps(`${__dirname}/a.jpg`);
    console.log('read:', before);
  } catch(err) {
    console.error(err);
  }

  console.log('-------------------------------------------');

  try {
    const write = await gps(`${__dirname}/a.jpg`, 44.0520691, -123.0867536);
    console.log('write:', write);
  } catch(err) {
    console.error(err);
  }

  console.log('-------------------------------------------');

  try {
    const read = await gps(`${__dirname}/a.jpg`);
    console.log('read:', read);
  } catch(err) {
    console.error(err);
  }

  console.log('-------------------------------------------');

  try {
    const clear = await gps(`${__dirname}/a.jpg`, true);
    console.log('clear:', clear);
  } catch(err) {
    console.error(err);
  }

  console.log('-------------------------------------------');

  try {
    const after = await gps(`${__dirname}/a.jpg`);
    console.log('read:', after);
  } catch(err) {
    console.error(err);
  }

})();
