const supabase = require("./db");

// create admin with info@okgconsult.com
exports.createAdmin() = async () => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: "info@okgconsult.com",
    password: "2a.foMhc",
    email_confirm: true,
  });

  if (error) {
    console.error("Error creating admin user:", error);
  } else {
    console.log("Admin user created successfully:", data);
  }
}

// Call the function to create the admin user
createAdmin();

// check if admin exists and login details
exports.loginAdmin = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    console.error("Error logging in admin user:", error);
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  //   if user exists assign jwt token using jwt
  const token = jwt.sign(
    { email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  data.token = token;
  res.status(200).json({ data });
};


// reset password for admin user
exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://www.okgconsult.com/reset-password",
  });
    if (error) { 
        console.error("Error sending password reset email:", error);
    };
    res.status(200).json({ message: "Password reset email sent" });
}

