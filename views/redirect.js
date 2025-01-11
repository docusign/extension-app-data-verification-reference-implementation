document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("redirectButton");
  const redirectUri = button.dataset.redirectUri;
  const code = button.dataset.code;
  const state = button.dataset.state;

  button.addEventListener("click", () => {
      window.location.href = `${redirectUri}?code=${code}&state=${state}`;
  });
});
