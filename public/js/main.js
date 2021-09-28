function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const secretKey = urlParams.get('key');

    console.log(secretKey);
    // const secretKey = location.pathname.substr(1)

    let resultElem = document.getElementById('result');
    let inputForm = document.getElementById("inputForm");
    let secretInput = document.getElementById("secret");

    if (secretKey !== null && secretKey !== '') {

        console.log('secretKey');
        console.log(secretKey);
        if (secretKey.match(/^[\d\D]{32}$/) != null) {
            inputForm.classList.add('hidden');
            handleSecret(secretKey)
            console.log('Секретный код ')
        } else {
            alert('Секретный код должен состоять из 32 символов')
            location.href = '/'
        }

    } else {

        console.log(inputForm);

        inputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let secret = secretInput.value;
            handleSecret(secret)
        })
        resultElem.classList.add('hidden');



        if (window.innerWidth > 600) {
            secretInput.focus()
        }
    }
    function handleSecret(secret)   {
        let remainTimeElem = document.getElementById('remainTime');
        let interval;
        if (secret && secret.length === 32) {
            resultElem.classList.remove('hidden');
            // interval = setInterval(() => {
            //     let remainSeconds = Number.parseInt(remainTimeElem.innerText);
            //     if (remainSeconds > 0) {
            //         remainSeconds--
            //     } else {
            //         remainSeconds = 30
            //     }
            //
            //     remainTimeElem.innerText = remainSeconds;
            // }, 1000);

            // 'HDHHHREEEWEJHDHHHREEEWEJCRRHHRRF'
            const code = () => window.otplib.authenticator.generate(secret)
            const time = () => window.otplib.authenticator.timeRemaining()
            const dangerTime = () => {
                time() <= 5
                    ? remainTimeElem.classList.add('danger')
                    : remainTimeElem.classList.remove('danger')
            }

            dangerTime()
            let verifyCode = document.getElementById('verifyCode');
            console.log(verifyCode);
            let value = code();
            console.log(value);
            verifyCode.value = value
            remainTimeElem.innerText = time()

            interval = setInterval(() => {
                if (time() === 30) {
                    verifyCode.textContent = code()
                }

                dangerTime()

                remainTimeElem.textContent = time()
            }, 1000)

            updateQrCode(secret)
            // let qrcodeContainer = document.getElementById("qrcode");
            // qrcodeContainer.innerHTML = "";
            // const qrCodeText = `otpauth://totp/2FA.FB.RIP:secret(*${secret.substring(secret.length - 6)})?secret=${secret}`;
            //
            // new QRCode(qrcodeContainer, qrCodeText);
        } else {
            clearInterval(interval);
            resultElem.classList.add('hidden');

            alert("Please enter a valid URL");
        }
    }
}

function updateQrCode(secret) {
    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    const qrCodeText = `otpauth://totp/2FA.FB.RIP:secret(*${secret.substring(secret.length - 6)})?secret=${secret}`;

    new QRCode(qrcodeContainer, qrCodeText);
}

let copiedCode = document.getElementById('copiedCode');
let verifyCode = document.getElementById('verifyCode');
verifyCode.addEventListener('click', function () {
    if (!copyTextToClipboard(verifyCode.value)) {
        copiedCode.innerText = 'Код скопирован'

    }
})

function copyTextToClipboard(data) {
   navigator.clipboard
        .writeText(data)
        .then(() => {
            return true
        })
        .catch((err) => {
            return false
        })
}

window.onload = function () {
    main();
};