document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // LỜI CHÚC HAY NHẤT (Đầy đủ ý, vừa vặn, dễ thương)
    // =================================================================
    const config = {
        recipientName: "một nửa thế giới siêu đáng yêu",
        letterMessage: `Nhân ngày 20/10, xin gửi những lời chúc ngọt ngào và chân thành nhất đến các bạn nữ xinh đẹp.\n\nChúc các bạn một ngày thật vui vẻ, luôn cười tươi như hoa, an nhiên như mây và hạnh phúc trọn vẹn. Hãy luôn nhớ rằng bạn là một ngôi sao lấp lánh và xứng đáng nhận được tất cả những điều tuyệt vời nhất trên đời!`,
        signature: "Gửi ngàn tim! ❤️"
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
    const letter = document.querySelector('.letter');
    const letterText = document.getElementById('letter-text');
    
    let musicStarted = false;
    let letterOpened = false;
    const typingSpeed = 50; // Tốc độ viết chữ (ms)

    function playMusic() {
        if (!musicStarted) {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play().catch(error => console.log("Cần tương tác để bật nhạc:", error));
            musicStarted = true;
        }
    }

    // Kịch bản chính
    setTimeout(() => {
        loader.style.display = 'none';
        mainContent.classList.remove('hidden');
        giftContainer.classList.remove('hidden');
        playMusic();
        setTimeout(() => giftBox.classList.add('open'), 1000);
        setTimeout(() => {
            giftContainer.classList.add('hidden');
            envelopeContainer.classList.remove('hidden');
        }, 3000);
    }, 4000);

    // Sự kiện mở phong bì
    envelopeWrapper.addEventListener('click', () => {
        if (!letterOpened) {
            envelopeWrapper.classList.add('open');
            letterOpened = true;
            setTimeout(typeLetter, 800); // Đợi phong bì rơi rồi mới viết
        }
    });
    
    // Hàm viết thư
    function typeLetter() {
        const fullMessage = `<strong>Gửi ${config.recipientName},</strong><br><br>${config.letterMessage.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>')}<br><br><p class="signature">${config.signature}</p>`;
        
        letter.style.opacity = '1';
        letterText.innerHTML = '<span>.</span>'; 
        let initialHeight = letterText.scrollHeight;
        letter.style.height = `${initialHeight}px`;
        letterText.innerHTML = '';

        let i = 0;
        function typeWriter() {
            if (i < fullMessage.length) {
                if (fullMessage[i] === '<') {
                    const closingTagIndex = fullMessage.indexOf('>', i);
                    if (closingTagIndex !== -1) {
                        letterText.innerHTML += fullMessage.substring(i, closingTagIndex + 1);
                        i = closingTagIndex + 1;
                    }
                } else {
                    letterText.innerHTML += `<span>${fullMessage[i]}</span>`;
                    i++;
                }

                let currentHeight = letterText.scrollHeight;
                letter.style.height = `${currentHeight}px`;
                
                setTimeout(typeWriter, typingSpeed);
            }
        }
        typeWriter();
    }

    document.body.addEventListener('click', playMusic, { once: true });
});
