document.addEventListener('DOMContentLoaded', () => {
  const container   = document.getElementById('container');
  const corpBtn     = document.getElementById('corp-btn');
  const partnerBtn  = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm    = document.getElementById('corp-form');

  /**
   * =========================
   * 1. Chuyển qua lại form
   * =========================
   */
  corpBtn.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });

  partnerBtn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });

  /**
   * =========================
   * 2. Đăng nhập Đối tác
   * =========================
   * Tạm thời hard-code tài khoản để test.
   * Sau này có thể thay bằng fetch() tới Apps Script hoặc API backend.
   */
  partnerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById('partner-user').value.trim().toLowerCase();
    const pass = document.getElementById('partner-pass').value;

    // --- Hard-code test ---
    if (user === 'his_user' && pass === 'MAYAVIETNAM') {
      window.location.href = './HIS/index.html';
      return;
    }

    // --- Gọi API kiểm tra (nếu có) ---
    /*
    try {
      const res = await fetch('URL_API_XAC_THUC', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await res.json();
      if (data.result === 'success') {
        window.location.href = data.redirectUrl || './HIS/index.html';
      } else {
        Swal.fire('Lỗi', data.error || 'Sai tài khoản hoặc mật khẩu.', 'error');
      }
    } catch (err) {
      Swal.fire('Lỗi', 'Không kết nối được máy chủ.', 'error');
    }
    */

    // Nếu không đúng
    Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.', 'error');
  });

  /**
   * =========================
   * 3. Đăng nhập Doanh nghiệp
   * =========================
   * Lưu mã số thuế vào sessionStorage và điều hướng sang module Corporate
   */
  corpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const code = document.getElementById('corp-tax-code').value.trim();
    if (!code) {
      Swal.fire('Thiếu thông tin', 'Vui lòng nhập mã số thuế doanh nghiệp.', 'warning');
      return;
    }

    // Lưu vào sessionStorage để module Corporate lấy lại
    sessionStorage.setItem('corpTaxCode', code);

    // Điều hướng sang trang Corporate
    window.location.href = './Corporate/index.html';
  });
});