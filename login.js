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
  if (corpBtn) {
    corpBtn.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
  }

  if (partnerBtn) {
    partnerBtn.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  /**
   * =========================
   * 2. Đăng nhập Đối tác
   * =========================
   * Tạm thời hard-code tài khoản để test.
   * Sau này có thể thay bằng fetch() tới Apps Script hoặc API backend.
   */
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = document.getElementById('partner-user').value.trim().toLowerCase();
      const pass = document.getElementById('partner-pass').value;

      // --- Hard-code test ---
      if (user === 'his_user' && pass === 'MAYAVIETNAM') {
        Swal.fire({
          title: 'Thành công!',
          text: 'Đăng nhập thành công, đang chuyển hướng...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // Thay đổi URL này thành trang thực tế của bạn
          window.location.href = './HIS/index.html';
        });
        return;
      }

      // Nếu không đúng
      Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.', 'error');
    });
  }

  /**
   * =========================
   * 3. Đăng nhập Doanh nghiệp
   * =========================
   * Lưu mã số thuế vào sessionStorage và điều hướng sang module Corporate
   */
  if (corpForm) {
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
      Swal.fire({
          title: 'Xác nhận!',
          text: 'Đã lưu mã số thuế, đang chuyển hướng...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // Thay đổi URL này thành trang thực tế của bạn
          window.location.href = './Corporate/index.html';
        });
    });
  }
});
