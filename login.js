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
   */
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = document.getElementById('partner-user').value.trim().toLowerCase();
      const pass = document.getElementById('partner-pass').value;

      let targetUrl = '';

      // --- Kiểm tra tài khoản cho từng đối tác ---

      // Đối tác HIS
      if (user === 'his_user' && pass === 'MAYAVIETNAM') {
        targetUrl = './HIS/index.html';
      } 
      // [MỚI] Đối tác TOYOTA - Vui lòng thay đổi mật khẩu
      else if (user === 'toyota_user' && pass === 'PASSWORD_TOYOTA') {
        targetUrl = './TOYOTA/index.html';
      }
      // [MỚI] Đối tác YAMAHA - Vui lòng thay đổi mật khẩu
      else if (user === 'yamaha_user' && pass === 'PASSWORD_YAMAHA') {
        targetUrl = './YAMAHA/index.html';
      }

      // --- Xử lý kết quả ---

      if (targetUrl) {
        // Nếu tìm thấy tài khoản hợp lệ
        Swal.fire({
          title: 'Thành công!',
          text: 'Đăng nhập thành công, đang chuyển hướng...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = targetUrl;
        });
      } else {
        // Nếu không có tài khoản nào khớp
        Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.', 'error');
      }
    });
  }

  /**
   * =========================
   * 3. Đăng nhập Doanh nghiệp
   * =========================
   */
  if (corpForm) {
    corpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('corp-tax-code').value.trim();
      if (!code) {
        Swal.fire('Thiếu thông tin', 'Vui lòng nhập mã số thuế doanh nghiệp.', 'warning');
        return;
      }
      sessionStorage.setItem('corpTaxCode', code);
      Swal.fire({
        title: 'Xác nhận!',
        text: 'Đã lưu mã số thuế, đang chuyển hướng...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = './Corporate/Index.html';
      });
    });
  }
});

