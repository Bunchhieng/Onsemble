module.exports.homelist = function(req, res){
res.render('index', { title: 'Home' });
};

module.exports.discoverPage = function(req, res) {
    res.render('discover', {title: 'Discover'});
};

module.exports.stagePage = function(req, res) {
    res.render('stage', {title: 'Stage'});
};