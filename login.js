/* === FILE: login.js (Phiên bản đúng) === */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const corpBtn = document.getElementById('corp-btn');
  const partnerBtn = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm = document.getElementById('corp-form');

  // [QUAN TRỌNG] Dán URL ứng dụng web (Web App URL) của bạn vào đây
  const LOGIN_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCEzp3E_n1B167Lfg4wfgoY1YMGTX9pPXwoU92EDZY5haOlxhjcIZdAt789qKfM86v/exec'; 
  // (Hãy chắc chắn URL này là URL triển khai của file Code.gs đã sửa lỗi CORS)

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
   * 2. Đăng nhập Đối tác (Đã sửa bảo mật & CORS)
   * =========================
   */
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = document.getElementById('partner-user').value;
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

      try {
        // [SỬA] Xây dựng URL để gọi action=login bằng GET
        const url = new URL(LOGIN_SCRIPT_URL);
        url.searchParams.append('action', 'login');
        url.searchParams.append('user', user);
        url.searchParams.append('pass', pass);
        
        // [SỬA] Gửi yêu cầu GET đến Google Apps Script
        const response = await fetch(url, {
          method: 'GET', // Phải là GET
          mode: 'cors'
        });

        // Xử lý lỗi mạng (ví dụ: 404, 500)
        if (!response.ok) {
           throw new Error('Lỗi máy chủ hoặc kết nối mạng: ' + response.statusText);
        }

        const result = await response.json();

        // Xử lý kết quả trả về từ Google Apps Script
        if (result.success) {
          // Thành công!
          Swal.fire({
            title: 'Thành công!',
            text: 'Đăng nhập thành công, đang chuyển hướng...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = result.url; // Chuyển hướng đến URL mà server trả về
          });
        } else {
          // Thất bại (sai pass, sai user)
          Swal.fire('Lỗi', result.message, 'error');
        }

      } catch (err) {
        // Lỗi (ví dụ: mất mạng, fetch bị từ chối)
        Swal.fire('Lỗi nghiêm trọng', 'Không thể kết nối đến máy chủ. ' + err.message, 'error');
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