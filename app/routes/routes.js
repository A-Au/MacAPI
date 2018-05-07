const cmd = require('node-cmd');

module.exports = function(app) {
  app.get('/increaseVolume', (req, res) => {
    cmd.get('osascript -e \'output volume of (get volume settings)\'', (err, data, stderr) =>{
      cmd.get('osascript -e \'set volume output volume ' + (parseInt(data) + 5) + '\'', (err, data, stderr) =>{
        cmd.get('osascript -e \'output volume of (get volume settings)\'', (err, data, stderr) =>{
          res.send({err, data, stderr});
        });
      });
    });
  });
  app.get('/reduceVolume', (req, res) => {
    cmd.get('osascript -e \'output volume of (get volume settings)\'', (err, data, stderr) =>{
      cmd.get('osascript -e \'set volume output volume ' + (parseInt(data) - 5) + '\'', (err, data, stderr) =>{
        cmd.get('osascript -e \'output volume of (get volume settings)\'', (err, data, stderr) =>{
          res.send({err, data, stderr});
        });
      });
    });
  });
  app.get('/setVolume/:vol', (req, res) => {
    const vol = Math.round(req.params.vol);
    cmd.get('osascript -e \'set volume output volume ' + vol + '\'', (err, data, stderr) =>{
      res.send({err, data, stderr});
    });
  });
  app.get('/volume', (req, res) => {
    cmd.get('osascript -e \'output volume of (get volume settings)\'', (err, data, stderr) =>{
      res.send({err, data, stderr});
    });
  });
  app.get('/sleep', (req, res) => {
    cmd.get('pmset displaysleepnow', (err, data, stderr) =>{
      res.send({err, data, stderr});
    });
  });
};