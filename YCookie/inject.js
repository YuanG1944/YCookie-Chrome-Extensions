// 监听消息
chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  try {
    const cookies = JSON.parse(request);
    if (cookies instanceof Array) {
      cookies.forEach((c) => {
        console.log((document.cookie = `${c.name}=${c.value}; path=/`));
        return (document.cookie = `${c.name}=${c.value}; path=/`);
      });
    } else {
      throw new Error("inseter cookie fail");
    }
  } catch (e) {
    console.warn(e);
    sendResponse("fail");
  }
  console.log("注入cookie成功!");
  sendResponse("success");
});
