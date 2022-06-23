export default () => {
  const pasteDom = document.querySelector("#y-paste");
  const input = document.querySelector("#y-input-paste");

  function sendMessageToContentScript(message, callback) {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs.query(queryInfo, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        if (callback) callback(response);
      });
    });
  }

  pasteDom.addEventListener("click", async () => {
    const { value } = input;
    console.log("value--->", value);
    if (value) {
      try {
        sendMessageToContentScript(value, function (msg) {
          if (msg === "success") {
            chrome.notifications.create(
              String(new Date()),
              {
                iconUrl: "../icons/cookies.png",
                type: "basic",
                title: "YCookie",
                message: "Cookie import success",
                eventTime: Date.now() + 1000,
              },

              (id) => {
                console.log(id);
              }
            );
          }
          if (msg === "fail") {
            chrome.notifications.create(
              String(new Date()),
              {
                iconUrl: "../icons/cookies.png",
                type: "basic",
                title: "YCookie",
                message: "Cookie import fail",
                eventTime: Date.now() + 1000,
              },

              (id) => {
                console.log(id);
              }
            );
          }
        });
      } catch (e) {
        console.warn(e);
      }
    }
  });
};
