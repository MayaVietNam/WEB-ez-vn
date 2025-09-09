const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqKgCKJune5u9ezFieKBaTY-P78jOiWExBBgLB7SD-0Yr5svIUn3gsGs-DVHsNvnuf/exec';

const partnerAccounts = {
  his_user: { path: './HIS/index.html' },
  toyota_user: { path: './TOYOTA/index.html' },
  yamaha_user: { path: './YAMAHA/index.html' }
};
const partnerPassword = 'MAYAVIETNAM';

const partnerTab = document.getElementById('partner-tab');
const corpTab = document.getElementById('corp-tab');
const partnerForm = document.getElementById('partner-form');
const corpForm = document.getElementById('corp-form');
const corpRegisterLink = document.getElementById('corp-register-link');

function switchTab(active) {
  const isPartner = active === 'partner';
  partnerTab.classList.toggle('active', isPartner);
  corpTab.classList.toggle('active', !isPartner);
  partnerTab.setAttribute('aria-selected', isPartner);
  corpTab.setAttribute('aria-selected', !isPartner);
  partnerForm.classList.toggle('hidden', !isPartner);
  corpForm.classList.toggle('hidden', isPartner);
  corpRegisterLink.classList.toggle('hidden', isPartner);
}

partnerTab.addEventListener('click', () => switchTab('partner'));
corpTab.addEventListener('click', () => switchTab('corp'));

partnerForm.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('partner-user').value.trim().toLowerCase();
  const pass = document.getElementById('partner-pass').value;
  if (partnerAccounts[user] && pass === partnerPassword) {
    window.location.href = partnerAccounts[user].path;
  } else {
    Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu đối tác không chính xác.', 'error');
  }
});

corpForm.addEventListener('submit', async e => {
  e.preventDefault();
  const taxCode = document.getElementById('corp-user').value.trim();
  const password = document.getElementById('corp-pass').value;
  if (!taxCode || !password) {
    Swal.fire('Thiếu thông tin', 'Vui lòng nhập Mã số thuế và Mật khẩu.', 'warning');
    return;
  }
  Swal.fire({ title: 'Đang đăng nhập...', didOpen: Swal.showLoading, allowOutsideClick: false });
  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', taxCode, password })
    });
    const result = await res.json();
    if (result.result === 'success' && result.isValid) {
      Swal.close();
      window.location.href = `./Corporate/order.html?taxCode=${taxCode}`;
    } else {
      throw new Error(result.error || 'Tài khoản hoặc mật khẩu không chính xác.');
    }
  } catch (err) {
    Swal.fire('Lỗi', err.message, 'error');
  }
});
