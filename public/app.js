getSessionID = function() {
  let name = "node-ctr-sesion_id";
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];

  return "no-session";
};

async function getAPI() {
  let sid = getSessionID();
  let headers = {
    headers: { "node-ctr-sesion_id": sid }
  };

  let res = await fetch("/api", headers);

  if (res.redirected) window.location.href = res.url;
  else {
    let data = await res.json();
    console.log(data);
  }
}
