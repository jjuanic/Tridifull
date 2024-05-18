const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

export {
    logoutUser
};