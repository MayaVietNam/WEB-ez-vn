// Đợi cho toàn bộ nội dung trang được tải xong
document.addEventListener('DOMContentLoaded', () => {

    // --- Code JS cho Form Đăng nhập (Chuyển đổi panel) ---
    const container = document.getElementById('container');
    const corpBtn = document.getElementById('corp-btn');
    const partnerBtn = document.getElementById('partner-btn');

    if (corpBtn && partnerBtn && container) {
        corpBtn.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        partnerBtn.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }

    // --- Code JS cho Modal Hướng dẫn (Pop-up) ---
    
    // Lấy các phần tử
    const guideModal = document.getElementById('guide-modal');
    const guideBtnLeft = document.getElementById('guide-btn-left');
    const guideBtnRight = document.getElementById('guide-btn-right');
    const closeModalBtn = document.getElementById('modal-close-btn');

    // Hàm mở modal
    const openModal = () => {
        if (guideModal) {
            guideModal.style.display = 'flex'; // Hiển thị modal
        }
    };

    // Hàm đóng modal
    const closeModal = () => {
        if (guideModal) {
            guideModal.style.display = 'none'; // Ẩn modal
        }
    };

    // Gán sự kiện click cho các nút
    if (guideBtnLeft && guideBtnRight && closeModalBtn) {
        guideBtnLeft.addEventListener('click', openModal);
        guideBtnRight.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Đóng modal khi bấm ra ngoài nền mờ
    if (guideModal) {
        guideModal.addEventListener('click', (event) => {
            if (event.target === guideModal) { // Chỉ khi bấm vào nền mờ (overlay)
                closeModal();
            }
        });
    }

    // --- Code JS cho Form Submit (Ví dụ) ---
    // (Bạn cần thay thế phần này bằng logic đăng nhập thật của bạn)
    
    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn form gửi đi thật
            
            // Ví dụ dùng SweetAlert (bạn đã nhúng thư viện này)
            if (typeof Swal !== 'undefined') {
                const user = document.getElementById('partner-user').value;
                Swal.fire(
                    'Đăng nhập thành công!',
                    'Chào mừng Đối Tác: ' + user,
                    'success'
                );
            } else {
                alert('Đăng nhập thành công!');
            }
            // Sau đó chuyển hướng: window.location.href = 'trang-doi-tac.html';
        });
    }

    const corpForm = document.getElementById('corp-form');
    if (corpForm) {
        corpForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn form gửi đi thật
            
            if (typeof Swal !== 'undefined') {
                const taxCode = document.getElementById('corp-tax-code').value;
                Swal.fire(
                    'Xác thực thành công!',
                    'Đang chuyển đến cổng thông tin Doanh Nghiệp (MST: ' + taxCode + ')',
                    'success'
                );
            } else {
                alert('Xác thực thành công!');
            }
            // Sau đó chuyển hướng: window.location.href = 'trang-doanh-nghiep.html';
        });
    }

}); // Kết thúc 'DOMContentLoaded'