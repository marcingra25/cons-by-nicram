document.getElementById('srtForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let speed = parseFloat(document.getElementById('speed').value);
    let distance = parseFloat(document.getElementById('distance').value);
    let total_seconds = 600; // 10 minut
    let total_frames = total_seconds * 10; // 0.1 sekundy per frame

    let srt_content = "";

    for (let i = 0; i < total_frames; i++) {
        let start_time = i / 10;
        let end_time = (i + 1) / 10;
        let start_time_str = formatTime(start_time);
        let end_time_str = formatTime(end_time);
        let current_distance = (speed * start_time).toFixed(2);

        srt_content += `${i + 1}\n${start_time_str} --> ${end_time_str}\n${current_distance} m\n\n`;
    }

    let blob = new Blob([srt_content], { type: 'text/plain' });
    let link = document.getElementById('downloadLink');
    link.href = URL.createObjectURL(blob);
    link.download = 'subtitles.srt';
    link.style.display = 'block';
});

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);
    let millisecs = Math.floor((seconds % 1) * 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${millisecs.toString().padStart(3, '0')}`;
}
