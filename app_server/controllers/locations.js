/* GET 'home' page */
module.exports.homelist = function(req, res){
res.render('index', { title: 'Home' });
};

module.exports.discoverlist = function(req, res){
res.render('discover', { title: 'Discover' });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
res.render('index', { title: 'Add review' });
};