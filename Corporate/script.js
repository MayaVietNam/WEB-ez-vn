/* NỘI DUNG CHO TỆP script.js */

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIG ---
    const PACKAGE_LIST = ["500MB/ngày", "1GB/ngày", "5GB/ngày"];
    const COUNTRY_LIST = typeof PRICE_TABLE !== 'undefined' ? Object.keys(PRICE_TABLE).sort() : [];
    // [QUAN TRỌNG] URL script không đổi
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCEzp3E_n1B167Lfg4wfgoY1YMGTX9pPXwoU92EDZY5haOlxhjcIZdAt789qKfM86v/exec';
    // [QUAN TRỌNG] Đặt tên cho sheet mới sẽ được tạo
    const UNIT_NAME = "CorporateOrders";

    // ... (Phần script còn lại giữ nguyên không thay đổi) ...
    // !!! BẠN CẦN DÁN PHẦN MÃ JAVASCRIPT CÒN LẠI CỦA MÌNH VÀO ĐÂY !!!
    
    const payload = { 
        unit: UNIT_NAME, // Gửi kèm tên sheet để script biết ghi vào đâu
        globalSenderInfo: senderInfo, 
        shippingInfo: shippingInfo, 
        rentalRequests, 
        submissionTime: new Date().toISOString() 
    };
});