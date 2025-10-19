document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // BẠN CÓ THỂ DỄ DÀNG TÙY CHỈNH TẠI ĐÂY
    // =================================================================
    const config = {
        recipientName: "cô gái của anh",
        letterMessage: `Nhân ngày 20/10, anh muốn gửi đến em tất cả những gì dịu dàng và tốt đẹp nhất.\n\nCảm ơn em đã đến và thắp sáng cuộc đời anh bằng sự ấm áp và nụ cười rạng rỡ. Chúc em của anh sẽ luôn xinh đẹp, an nhiên và được yêu thương. Mọi bão giông ngoài kia, hãy để anh lo.`,
        signature: "Thương em nhất!"
    };
    // =================================================================
    // KẾT THÚC PHẦN TÙY CHỈNH
    // =================================================================

    const loader = document.getElementById('loader-wrapper');
    const mainContent = document.getElementById('main-content');
    const giftContainer = document.getElementById('gift-container');
    const giftBox = document.querySelector('.gift-box-svg');
    const envelopeContainer = document.getElementById('envelope-container');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const backgroundMusic = document.getElementById('background-music');
    const letterText = document.getElementById('letter-text');
    
    let musicStarted = false;

    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play().catch(error => console.log("Cần tương tác để bật nhạc:", error));
            musicStarted = true;
        }
    }

    // KỊCH BẢN CHÍNH
    setTimeout(() => {
        loader.style.display = 'none';
        
        mainContent.classList.remove('hidden');
        giftContainer.classList.remove('hidden');
        
        playMusic();

        setTimeout(() => {
            giftBox.classList.add('open');
        }, 1000);

        setTimeout(() => {
            giftContainer.classList.add('hidden');
            envelopeContainer.classList.remove('hidden');
        }, 3000);

    }, 4000);

    // Sự kiện mở phong bì
    envelopeWrapper.addEventListener('click', () => {
        envelopeWrapper.classList.toggle('open');
        if (envelopeWrapper.classList.contains('open')) {
            setupLetter();
        }
    });
    
    // Thiết lập nội dung lá thư
    function setupLetter() {
        letterText.innerHTML = `<strong>Gửi ${config.recipientName},</strong><p>${config.letterMessage.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p><p class="signature">${config.signature}</p>`;
    }

    // Fallback để bật nhạc nếu trình duyệt chặn
    document.body.addEventListener('click', playMusic, { once: true });
});