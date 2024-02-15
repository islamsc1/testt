function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  var styleContent = `
  .popup-content::before {
    transform: translateX(-50%) translateY(30%) ;
  }
  `;
  
  var styleContent1 = `
  .popup-content::before {
    transform: translateX(-50%);
  }
  `;
  var styleContent2 = `
  .popup-content::before {
    border-top: 31px solid transparent;
  
  }
  `;
  var styleContent3 = `
  .popup-content::before {
    border-top: 31px solid red;
  
  }
  `;
  
  document.querySelectorAll(".monthbtn").forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.id.replace("Button", "");
      toggleDiv(targetId);
    });
  });
  
  function toggleDiv(targetId) {
    const div = document.getElementById(targetId);
  
    if (div.classList.contains("open")) {
      div.classList.remove("open");
    } else {
      div.classList.add("open");
    }
  }
  /*
  document.querySelectorAll('[id^="open-popup"]').forEach(function (openButton) {
    openButton.addEventListener("click", async function () {
      const popupId = openButton.id.replace("open-", "");
      const popup = document.getElementById(popupId);
      popup.style.display = "block";
      var styleElement = document.createElement("style");
      styleElement.innerHTML = styleContent3;
      // Append the style element to the head of the document
      document.head.appendChild(styleElement);
      for (let i = 0; i < 8; i++) {
        await delay(200);
        var styleElement = document.createElement("style");
        styleElement.innerHTML = styleContent;
        // Append the style element to the head of the document
        document.head.appendChild(styleElement);
        await delay(200);
        var styleElement = document.createElement("style");
        styleElement.innerHTML = styleContent1;
        // Append the style element to the head of the document
        document.head.appendChild(styleElement);
        console.log("Iteration:", i);
      }
      var styleElement = document.createElement("style");
      styleElement.innerHTML = styleContent2;
      // Append the style element to the head of the document
      document.head.appendChild(styleElement);
    });
  });


  document
    .querySelectorAll('[id^="close-popup"]')
    .forEach(function (closeButton) {
      closeButton.addEventListener("click", function () {
        const popup = closeButton.parentElement.parentElement;
        popup.style.display = "none";
      });
    });
  */
 
  var loader = document.getElementById("preload");
  let loaded = false;
  let enoughTimePassed = false;
  
  window.addEventListener("load", function () {
    if (enoughTimePassed) {
      hidePreloader();
    }
    loaded = true;
  });
  
  setTimeout(() => {
    if (loaded) {
      hidePreloader();
    }
    enoughTimePassed = true;
  }, 1000);
  
  function hidePreloader() {
    document.getElementById("preload").remove();
  }
  