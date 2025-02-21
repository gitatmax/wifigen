document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const printBtn = document.getElementById('print');
    const qrcodeDiv = document.getElementById('qrcode');
    const qrOutput = document.querySelector('.qr-output');
    let qrcode = null;

    generateBtn.addEventListener('click', () => {
        const ssid = document.getElementById('ssid').value;
        const password = document.getElementById('password').value;
        const encryption = document.getElementById('encryption').value;
        const showSsid = document.getElementById('showSsid').checked;
        const showPassword = document.getElementById('showPassword').checked;
        const additionalText = document.getElementById('additionalText').value;

        if (!ssid) {
            alert('Please enter a network name (SSID)');
            return;
        }

        if (encryption !== 'nopass' && !password) {
            alert('Please enter a password');
            return;
        }

        const qrContent = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        
        // Clear previous QR code and details
        qrcodeDiv.innerHTML = '';
        qrOutput.classList.add('visible');
        
        // Determine QR code colors based on color scheme
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const qrColors = isDarkMode ? {
            colorDark: "#ffffff",
            colorLight: "#2d2d2d"
        } : {
            colorDark: "#000000",
            colorLight: "#ffffff"
        };

        // Generate new QR code
        qrcode = new QRCode(qrcodeDiv, {
            text: qrContent,
            width: 256,
            height: 256,
            ...qrColors,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Add details text if any options are selected
        if (showSsid || showPassword || additionalText) {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'details-text';
            let details = '';
            
            if (showSsid) {
                details += `Network: ${ssid}\n`;
            }
            if (showPassword) {
                details += `Password: ${password}\n`;
            }
            if (additionalText) {
                details += `\n${additionalText}`;
            }
            
            detailsDiv.textContent = details.trim();
            qrcodeDiv.appendChild(detailsDiv);
        }
    });

    printBtn.addEventListener('click', () => {
        if (qrcodeDiv.innerHTML) {
            window.print();
        } else {
            alert('Please generate a QR code first');
        }
    });
});
