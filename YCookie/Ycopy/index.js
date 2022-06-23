export default () => {
  const copyDom = document.querySelector("#y-copy");

  copyDom.addEventListener("click", () => {
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
            try {
              await navigator.clipboard.writeText(JSON.stringify(cookies));
              chrome.notifications.create(
                String(new Date()),
                {
                  iconUrl: "../icons/cookies.png",
                  type: "basic",
                  title: "YCookie",
                  message: "Cookie copy success",
                  eventTime: Date.now() + 1000,
                },

                (id) => {
                  console.log(id);
                }
              );
            } catch (e) {
              chrome.notifications.create(
                new Date(),
                {
                  iconUrl: "../icons/cookies.png",
                  type: "basic",
                  title: "YCookie",
                  message: "Cookie copy fail",
                  eventTime: Date.now() + 1000,
                },

                (id) => {
                  console.log(id);
                }
              );
            }
          }
        );
      }
    });
  });
};
