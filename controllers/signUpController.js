

const signUpPage = (req,res) => {
    res.render('signup')
};

const signUpUser = (req,res) =>{
    const user = req.body.user;
    const password = req.body.password;

    console.log(user,password);

    res.render('login')
}

module.exports = {
    signUpPage,
    signUpUser
}