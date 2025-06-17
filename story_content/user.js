var c = ",";
var player = GetPlayer();

// ========== KONFIGURASI GOOGLE SHEETS ==========
// WAJIB DIISI: Ganti dengan URL Web App Anda
var GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzUjHw7oq384XTDfqyPsbBehhnXA1xKOTqGeQiXD5ItXGfGDVLyB0yIq2AL0-CsbSDQ/exec";

// Nama guru dan mata pelajaran
var namaGuru = "Asep Maulana Yusuf, S.Pd.I";
var mataPelajaran = "Pendidikan Agama Islam";

// Ambil variabel dari Storyline
var nama = player.GetVar("nama");
var kelas = player.GetVar("kelas");
var a1 = player.GetVar("a1");
var a2 = player.GetVar("a2");
var a3 = player.GetVar("a3");
var a4 = player.GetVar("a4");
var a5 = player.GetVar("a5");
var a6 = player.GetVar("a6");
var a7 = player.GetVar("a7");
var a8 = player.GetVar("a8");
var a9 = player.GetVar("a9");
var a10 = player.GetVar("a10");

// Tentukan nilai untuk jawaban benar
var nilaiBenar = 10;
var totalMaksimal = nilaiBenar * 10;

// Hitung total dan persentase
var total = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
var persen = ((total / totalMaksimal) * 100).toFixed(1);

// Debug log
console.log("=== DEBUG INFO ===");
console.log("Nama:", nama, "Kelas:", kelas);
console.log("Nilai a1-a10:", a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
console.log("Total:", total, "Persen:", persen);

// Buat tanggal dan waktu
var now = new Date();
var tanggal = now.getDate().toString().padStart(2, '0') + "/" + 
              (now.getMonth() + 1).toString().padStart(2, '0') + "/" + 
              now.getFullYear();
var waktu = now.getHours().toString().padStart(2, '0') + ":" + 
            now.getMinutes().toString().padStart(2, '0') + ":" + 
            now.getSeconds().toString().padStart(2, '0');

// Generate ID unik
var uniqueID = "REP" + now.getFullYear().toString().substr(-2) + 
               (now.getMonth() + 1).toString().padStart(2, '0') + 
               now.getDate().toString().padStart(2, '0') + 
               now.getHours().toString().padStart(2, '0') + 
               now.getMinutes().toString().padStart(2, '0');

// Hitung grade dan predikat
var grade = "";
var predikat = "";
if (persen >= 90) {
    grade = "A"; predikat = "Sangat Baik";
} else if (persen >= 80) {
    grade = "B"; predikat = "Baik";
} else if (persen >= 70) {
    grade = "C"; predikat = "Cukup";
} else if (persen >= 60) {
    grade = "D"; predikat = "Kurang";
} else {
    grade = "E"; predikat = "Sangat Kurang";
}

// Status kelulusan
var statusLulus = persen >= 75 ? "LULUS" : "TIDAK LULUS";
var emoji = persen >= 75 ? "✓" : "✗";

// Analisis kinerja
var nilaiArray = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
var nilaiTertinggi = Math.max(...nilaiArray);
var nilaiTerendah = Math.min(...nilaiArray);
var indexTertinggi = nilaiArray.indexOf(nilaiTertinggi) + 1;
var indexTerendah = nilaiArray.indexOf(nilaiTerendah) + 1;
var jumlahBenar = nilaiArray.filter(nilai => nilai == nilaiBenar).length;

// Komentar guru
var komentar = "";
if (persen >= 90) {
    komentar = "Excellent! Pertahankan prestasi yang luar biasa ini!";
} else if (persen >= 80) {
    komentar = "Bagus! Terus tingkatkan pemahaman materi.";
} else if (persen >= 70) {
    komentar = "Cukup baik. Perbanyak latihan soal.";
} else {
    komentar = "Perlu bimbingan lebih intensif. Jangan menyerah!";
}

// ========== FUNGSI 1: DOWNLOAD CSV (TETAP BERFUNGSI) ==========
function downloadCSV() {
    console.log("Memulai download CSV...");
    
    var csvContent = "";
    csvContent += "╔══════════════════════════════════════════════════════════════╗\n";
    csvContent += "║                    LAPORAN HASIL EVALUASI                   ║\n";
    csvContent += "╚══════════════════════════════════════════════════════════════╝\n";
    csvContent += "\n";
    csvContent += "ID Laporan" + c + uniqueID + "\n";
    csvContent += "Tanggal Export" + c + tanggal + "\n";
    csvContent += "Waktu Export" + c + waktu + "\n";
    csvContent += "Mata Pelajaran" + c + mataPelajaran + "\n";
    csvContent += "Guru Pengampu" + c + namaGuru + "\n";
    csvContent += "\n";
    csvContent += "=== DATA SISWA ===\n";
    csvContent += "Nama Lengkap" + c + nama + "\n";
    csvContent += "Kelas" + c + kelas + "\n";
    csvContent += "\n";
    csvContent += "=== DETAIL JAWABAN ===\n";
    csvContent += "No" + c + "Soal" + c + "Nilai" + c + "Status\n";
    csvContent += "1" + c + "Soal 1" + c + a1 + c + (a1 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "2" + c + "Soal 2" + c + a2 + c + (a2 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "3" + c + "Soal 3" + c + a3 + c + (a3 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "4" + c + "Soal 4" + c + a4 + c + (a4 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "5" + c + "Soal 5" + c + a5 + c + (a5 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "6" + c + "Soal 6" + c + a6 + c + (a6 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "7" + c + "Soal 7" + c + a7 + c + (a7 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "8" + c + "Soal 8" + c + a8 + c + (a8 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "9" + c + "Soal 9" + c + a9 + c + (a9 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "10" + c + "Soal 10" + c + a10 + c + (a10 == nilaiBenar ? "Benar" : "Salah") + "\n";
    csvContent += "\n";
    csvContent += "=== REKAPITULASI ===\n";
    csvContent += "Total Nilai" + c + total + "\n";
    csvContent += "Persentase" + c + persen + " %\n";
    csvContent += "Grade" + c + grade + "\n";
    csvContent += "Predikat" + c + predikat + "\n";
    csvContent += "Status Kelulusan" + c + statusLulus + " " + emoji + "\n";
    csvContent += "\n";
    csvContent += "=== ANALISIS KINERJA ===\n";
    csvContent += "Soal Tertinggi" + c + "Soal " + indexTertinggi + c + nilaiTertinggi + "\n";
    csvContent += "Soal Terendah" + c + "Soal " + indexTerendah + c + nilaiTerendah + "\n";
    csvContent += "Rata-rata" + c + (total / 10).toFixed(1) + "\n";
    csvContent += "Jawaban Benar" + c + jumlahBenar + " dari 10 soal\n";
    csvContent += "Jawaban Salah" + c + (10 - jumlahBenar) + " dari 10 soal\n";
    csvContent += "\n";
    csvContent += "=== CATATAN GURU ===\n";
    csvContent += "Komentar" + c + komentar + "\n";
    csvContent += "Saran Perbaikan" + c + (persen < 75 ? "Pelajari kembali materi yang kurang dipahami" : "Lanjutkan ke materi berikutnya") + "\n";
    csvContent += "\n";
    csvContent += "--- Generated by E-Learning System ---\n";
    csvContent += "--- muhammad irfanasyidiq/2203010234 ---\n";
    csvContent += "Timestamp: " + now.getTime() + "\n";

    // Download file
    var namaFile = mataPelajaran + "_" + kelas + "_" + nama.replace(/\s+/g, '') + "_" + uniqueID + ".csv";
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", namaFile);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("✓ CSV berhasil didownload:", namaFile);
}

// ========== FUNGSI 2: KIRIM KE GOOGLE SHEETS ==========
function sendToGoogleSheets() {
    console.log("Memulai pengiriman ke Google Sheets...");
    
    // Validasi URL Google Sheets
    if (GOOGLE_SHEETS_URL.includes("YOUR_SCRIPT_ID")) {
        console.error("❌ URL Google Sheets belum dikonfigurasi!");
        alert("⚠️ Konfigurasi Google Sheets belum selesai!\nSilakan update GOOGLE_SHEETS_URL terlebih dahulu.\n\nCSV tetap berhasil didownload.");
        return;
    }
    
    // Siapkan data untuk dikirim
    var dataToSend = {
        // Header
        idLaporan: uniqueID,
        tanggalExport: tanggal,
        waktuExport: waktu,
        mataPelajaran: mataPelajaran,
        guruPengampu: namaGuru,
        
        // Student Data
        namaLengkap: nama,
        kelas: kelas,
        
        // Answers (pastikan dalam format number)
        soal1: Number(a1) || 0,
        soal2: Number(a2) || 0,
        soal3: Number(a3) || 0,
        soal4: Number(a4) || 0,
        soal5: Number(a5) || 0,
        soal6: Number(a6) || 0,
        soal7: Number(a7) || 0,
        soal8: Number(a8) || 0,
        soal9: Number(a9) || 0,
        soal10: Number(a10) || 0,
        
        // Results
        totalNilai: Number(total),
        persentase: Number(persen),
        grade: grade,
        predikat: predikat,
        statusKelulusan: statusLulus,
        
        // Analysis
        soalTertinggi: indexTertinggi,
        nilaiTertinggi: nilaiTertinggi,
        soalTerendah: indexTerendah,
        nilaiTerendah: nilaiTerendah,
        rataRata: Number((total / 10).toFixed(1)),
        jawabanBenar: jumlahBenar,
        jawabanSalah: (10 - jumlahBenar),
        
        // Notes
        komentar: komentar,
        saranPerbaikan: (persen < 75 ? "Pelajari kembali materi yang kurang dipahami" : "Lanjutkan ke materi berikutnya"),
        
        // Timestamp
        timestamp: now.getTime(),
        tanggalLengkap: now.toISOString()
    };
    
    console.log("Data yang akan dikirim:", dataToSend);
    
    // Kirim data menggunakan XMLHttpRequest (lebih reliable)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', GOOGLE_SHEETS_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) { // 0 untuk no-cors
                console.log("✓ Data berhasil dikirim ke Google Sheets");
                console.log("Response:", xhr.responseText);
            } else {
                console.log("⚠️ Status:", xhr.status, "Response:", xhr.responseText);
            }
        }
    };
    
    xhr.onerror = function() {
        console.log("⚠️ Network error saat mengirim ke Google Sheets");
    };
    
    // Kirim data
    xhr.send(JSON.stringify(dataToSend));
    
    // Juga coba dengan fetch sebagai backup
    fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
    }).then(function() {
        console.log("✓ Fetch request sent to Google Sheets");
    }).catch(function(error) {
        console.log("⚠️ Fetch error:", error);
    });
}

// ========== EKSEKUSI UTAMA ==========
console.log("=== MEMULAI EXPORT PROCESS ===");

// 1. Download CSV (selalu jalan)
downloadCSV();

// 2. Kirim ke Google Sheets (jika sudah dikonfigurasi)
sendToGoogleSheets();

// 3. Tampilkan notifikasi
setTimeout(function() {
    alert("📊 EXPORT SELESAI!\n\n" +
          "✅ CSV berhasil didownload\n" +
          "📤 Data dikirim ke Google Sheets\n\n" +
          "Detail:\n" +
          "• ID: " + uniqueID + "\n" +
          "• Nama: " + nama + "\n" +
          "• Total: " + total + "\n" +
          "• Persentase: " + persen + "%\n" +
          "• Grade: " + grade + " (" + predikat + ")");
}, 500);
