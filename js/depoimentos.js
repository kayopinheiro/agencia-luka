// ============================================
// AGÊNCIA LUKA — Avatar de iniciais (depoimentos)
//
// Preenche cada [data-avatar-name] com as iniciais do nome
// (primeira letra do primeiro e do último nome), evitando
// hardcodar as iniciais no HTML.
// ============================================
(function () {
  function getInitials(fullName) {
    const parts = fullName.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  document.querySelectorAll('[data-avatar-name]').forEach(avatar => {
    const initialsEl = avatar.querySelector('.card-depoimento__initials');
    if (!initialsEl) return;
    initialsEl.textContent = getInitials(avatar.dataset.avatarName);
  });
})();
