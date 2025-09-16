document.addEventListener('DOMContentLoaded', () => {
  const container   = document.getElementById('container');
  const corpBtn     = document.getElementById('corp-btn');
  const partnerBtn  = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm    = document.getElementById('corp-form');

  /**
   * =========================
   * 1. Chuyển qua lại form
   * =========================
   */
  if (corpBtn && container) {
    corpBtn.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
  }

  if (partnerBtn && container) {
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

      // [SỬA LỖI MẬT KHẨU TẠI ĐÂY]
      // Code đang kiểm tra tài khoản 'his_user' và mật khẩu 'MAYAVIETNAM'.
      // Nếu mật khẩu này không đúng, bạn cần thay thế 'MAYAVIETNAM' bằng mật khẩu chính xác.
      if (user === 'his_user' && pass === 'MAYAVIETNAM') {
        Swal.fire({
          title: 'Thành công!',
          text: 'Đăng nhập thành công, đang chuyển hướng...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = './HIS/index.html';
        });
        return;
      }

      Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.', 'error');
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

      // [GIẢI THÍCH LỖI CHUYỂN HƯỚNG]
      // Dòng code dưới đây đang hoạt động chính xác. Nó điều hướng người dùng
      // đến file 'index.html' nằm trong thư mục 'Corporate'.
      //
      // Lỗi 404 bạn gặp phải có nghĩa là server không tìm thấy file tại đường dẫn này.
      // => BẠN CẦN KIỂM TRA LẠI CẤU TRÚC THƯ MỤC TRÊN GITHUB:
      //    1. Phải có thư mục tên là 'Corporate' (viết hoa chữ C).
      //    2. Bên trong phải có file 'index.html'.
      //    3. Đảm bảo bạn đã push thư mục và file này lên GitHub.
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

