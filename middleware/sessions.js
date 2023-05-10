const crypto = require("crypto");

let sessions = {};

function createSession(userName) {
  let sid = getUserSession(userName);
  let expiry = Date.now() + 1 * 60 * 1000;
  if (sid) {
    let sess = sessions[sid];
    sess.expiry = expiry;
    return sid;
  } else {
    let sessionid = crypto.randomBytes(32).toString("base64");
    sessions[sessionid] = {
      user: userName,
      expiry: expiry
    };
    return sessionid;
  }
}

function getUserSession(userName) {
  for (sid in sessions) {
    if (sessions[sid] === userName) {
      return sid;
    }
  }
  return false;
}
function deleteSession(sid) {
  if (sid in sessions) {
    delete sessions[sid];
    return true;
  }
  return false;
}

function isValidSession(sid) {
  if (sid in sessions) {
    if (sessions[sid].expiry > Date.now()) return true;
    deleteSession(sid);
    return false;
  }
  return false;
}

function getSessions() {
  return sessions;
}

module.exports = {
  createSession: createSession,
  deleteSession: deleteSession,
  isValidSession: isValidSession,
  getSessions: getSessions
};
