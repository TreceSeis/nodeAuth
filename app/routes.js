module.exports = function(app, passport) {
  //Homepage
  app.get("/", function(req, res) {
    res.render("index.ejs");
  });
  //login
  app.get("/login", function(req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  //process login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  //signup form
  app.get("/signup", function(req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });
  //process signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );

  //view profile while logged in
  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile.ejs", {
      user: req.user
    });
  });

  //logout
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //Facebook routes
  //route for facebook authentication and login
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  //handle the callback after facebook has authenticated user
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  //route middleware to validate login
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
  }
};
