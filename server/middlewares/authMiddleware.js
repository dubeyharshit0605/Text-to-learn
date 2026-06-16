const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

const attachUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    let profile = null;

    if (token && process.env.AUTH0_DOMAIN) {
      const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        profile = await response.json();
      }
    }

    req.user = {
      auth0Id: req.auth?.payload?.sub || profile?.sub || null,
      email: profile?.email || "",
      name: profile?.name || "",
      picture: profile?.picture || "",
    };

    next();
  } catch (error) {
    next(error);
  }
};

const protect = [checkJwt, attachUser];

module.exports = {
  protect,
};