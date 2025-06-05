export function openCartOffcanvas() {
  const cartOffcanvas = document.getElementById("cartOffcanvas");
  if (cartOffcanvas) {
    const bsOffcanvas = new bootstrap.Offcanvas(cartOffcanvas);
    bsOffcanvas.show();
  }
}