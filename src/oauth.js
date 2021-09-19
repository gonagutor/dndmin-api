import oauth2orize from 'oauth2orize';
import utils from 'util';

const server = oauth2orize.createServer();

server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
  const code = utils.uid(16);

  const ac = new AuthorizationCode(code, client.id, redirectURI, user.id, ares.scope);
  ac.save((err) => {
    if (err) { return done(err); }
    return done(null, code);
  });
}));

server.exchange(oauth2orize.exchange.code((client, code, redirectURI, done) => {
  AuthorizationCode.findOne(code, (err, code) => {
    if (err) { return done(err); }
    if (client.id !== code.clientId) { return done(null, false); }
    if (redirectURI !== code.redirectUri) { return done(null, false); }

    const token = utils.uid(256);
    const at = new AccessToken(token, code.userId, code.clientId, code.scope);
    at.save((err) => {
      if (err) { return done(err); }
      return done(null, token);
    });
  });
}));
