export const getUrl = async (url) => {
    let content = document.getElementById('content'); // Pindahkan definisi content ke sini
    try {
        let res = await fetch('/url', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoUrl: url })
        });

        if (!res.ok) {
            content.innerHTML = '<h3 class="messageError">Sory, The URL is not valid or Video not found!</h3>';
            return;
        }

        let { nowm, wm, music } = await res.json();
        console.log("Response Data:", nowm, wm, music);

        // Agregamos la etiqueta video...
        let video = `
            <video controls="" autoplay="" name="media">
                <source src="${nowm}" type="video/mp4"></source>
            </video>
        `;

        let audioButton = document.createElement('a');
        audioButton.href = music;
        audioButton.target = '_blank';
        audioButton.className = 'btn';
        audioButton.textContent = 'Download Audio';

        // Buat elemen tombol untuk download video
        let videoButton = document.createElement('a');
        videoButton.href = nowm;
        videoButton.target = '_blank';
        videoButton.className = 'btn';
        videoButton.textContent = 'Download Video';

        content.innerHTML = `${video}`;
        content.appendChild(audioButton);
        content.appendChild(videoButton);
    } catch (error) {
        //let content = document.getElementById('content');
    }
}
