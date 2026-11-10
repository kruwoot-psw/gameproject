export function setupMap(game) {
  const overlay = document.getElementById('mapOverlay');
  document.getElementById('btnMap').onclick = () => overlay.classList.add('show');
  document.getElementById('mapClose').onclick = () => overlay.classList.remove('show');
  document.getElementById('minimap').onclick = () => overlay.classList.add('show');
}
