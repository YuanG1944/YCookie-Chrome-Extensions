export default () => {
  const clearDom = document.querySelector("#y-clear");

  clearDom.addEventListener("click", () => {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs.query(queryInfo, (tab) => {
      if (tab && tab?.length) {
        const { url } = tab[0];
        const targetUrl = new URL(url);
        console.log("targetUrl", targetUrl);
        chrome.cookies.getAll(
          {
            url: targetUrl.origin,
          },
          async (cookies) => {
            await navigator.clipboard.writeText(JSON.stringify(cookies));
            cookies.forEach((c) => {
              chrome.cookies.remove(
                {
                  url: targetUrl.origin,
                  name: c.name,
                },
                (obj) => {
                  console.log(obj);
                }
              );
            });
            chrome.notifications.create(
              String(new Date()),
              {
                iconUrl: "../icons/cookies.png",
                type: "basic",
                title: "YCookie",
                message: "Cookie clear success",
                eventTime: Date.now() + 1000,
              },

              (id) => {
                console.log(id);
              }
            );
          }
        );
      }
    });
  });
};
