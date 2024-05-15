
const loginPage = (req,res) => {
    res.render('login')
};

const loginUser = (req,res) => {
    user = req.body.user;
    password = req.body.password;
    console.log('user','password');
    res.redirect('/');
};


module.exports = {
    loginPage,
    loginUser
}