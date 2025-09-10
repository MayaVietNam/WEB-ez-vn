// js/login.js

document.addEventListener('DOMContentLoaded', () => {
  const container   = document.getElementById('container');
  const corpBtn     = document.getElementById('corp-btn');
  const partnerBtn  = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm    = document.getElementById('corp-form');

  // Toggle panels
  corpBtn.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });
  partnerBtn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });

  // Partner login
  partnerForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('partner-user').value.trim().toLowerCase();
    const pass = document.getElementById('partner-pass').value;
    if (user === 'his_user' && pass === 'MAYAVIETNAM') {
      window.location.href = './HIS/index.html';
    } else {
      Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.', 'error');
    }
  });

  // Corporate login
  corpForm.addEventListener('submit', e => {
    e.preventDefault();
    const code = document.getElementById('corp-tax-code').value.trim();
    if (!code) {
      Swal.fire('Thiếu thông tin', 'Vui lòng nhập mã số thuế doanh nghiệp.', 'warning');
      return;
    }
    sessionStorage.setItem('corpTaxCode', code);
    window.location.href = './Corporate/router.html';
  });
});
