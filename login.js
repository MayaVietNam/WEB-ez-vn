/* === FILE: login.js (Phiên bản KHÔNG BẢO MẬT) === */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const corpBtn = document.getElementById('corp-btn');
  const partnerBtn = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm = document.getElementById('corp-form');

  // KHÔNG CẦN URL SCRIPT NỮA

  /**
   * =========================
   * 1. Chuyển qua lại form (Giữ nguyên)
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
   * 2. Đăng nhập Đối tác (Sửa lại - KHÔNG BẢO MẬT)
   * =========================
   */
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // [CẢNH BÁO] MẬT KHẨU LỘ THIÊN NGAY TẠI ĐÂY
      const ACCOUNTS = {
        "his_user": { pass: "MAYAVIETNAM", url: "./HIS/index.html" },
        "Toyota": { pass: "123456789", url: "./TOYOTA/index.html" },
        "yamaha": { pass: "0123456789", url: "./YAMAHA/index.html" },
        "mitsubishi": { pass: "0987654321", url: "./MITSUBISHI/index.html" }
      };

      const user = document.getElementById('partner-user').value.trim().toLowerCase();
      const pass = document.getElementById('partner-pass').value;

      // Hiển thị thông báo "Đang tải"
      Swal.fire({
        title: 'Đang đăng nhập...',
        text: 'Vui lòng chờ trong giây lát.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      // Tạm dừng 0.5s để người dùng thấy thông báo
      await new Promise(resolve => setTimeout(resolve, 500));

      // Bắt đầu kiểm tra mật khẩu
      if (ACCOUNTS[user] && ACCOUNTS[user].pass === pass) {
        // ĐĂNG NHẬP ĐÚNG
        Swal.fire({
          title: 'Thành công!',
          text: 'Đăng nhập thành công, đang chuyển hướng...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = ACCOUNTS[user].url; // Chuyển hướng
        });
      } else {
        // ĐĂNG NHẬP SAI
        Swal.fire('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.', 'error');
      }

    });
  }

  /**
   * =========================
   * 3. Đăng nhập Doanh nghiệp (Giữ nguyên)
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
  
  // --- PHẦN JS CỦA POP-UP HƯỚNG DẪN (GIỮ NGUYÊN) ---
  const guideModal = document.getElementById('guide-modal');
  const guideBtnLeft = document.getElementById('guide-btn-left');
  const guideBtnRight = document.getElementById('guide-btn-right');
  const closeModalBtn = document.getElementById('modal-close-btn');

  const openModal = () => {
    if (guideModal) guideModal.style.display = 'flex';
  };
  const closeModal = () => {
    if (guideModal) guideModal.style.display = 'none';
  };

  if (guideBtnLeft && guideBtnRight && closeModalBtn) {
    guideBtnLeft.addEventListener('click', openModal);
    guideBtnRight.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
  }
  if (guideModal) {
    guideModal.addEventListener('click', (event) => {
      if (event.target === guideModal) closeModal();
    });
  }
  
}); // Kết thúc 'DOMContentLoaded'