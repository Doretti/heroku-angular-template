const express = require('express');
const app = express();
function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
app.use(express.static('dist/ang-app'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/ang-app/'}
  );
});
app.use(requireHTTPS);
app.listen(process.env.PORT || 8080);
