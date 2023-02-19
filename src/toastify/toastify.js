import Toastify from "toastify-js";
function toastify(message) {
  Toastify({
    text: `${message}`,
    duration: 3000,
    close: true,
    duration: 2000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    // style: {
    //   background: "linear-gradient(to right, #00b09b, #96c93d)",
    // },
    gravity: "bottom",
    offset: {
      x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 50, // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {
      console.log("hey u user, u clicked");
    }, // Callback after click
  }).showToast();
}

export { toastify };
