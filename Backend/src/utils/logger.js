const log = (msg, data={}) => {
    console.log(JSON.stringify({
      time: new Date().toISOString(),
      message: msg,
      ...data
    }));
  };
  
  module.exports = log;
  