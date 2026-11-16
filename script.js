async function tampilkanData() {
  const tbody = document.getElementById("isi-tabel");
  const pesan = document.getElementById("pesan");

  try {
    const SQL = await initSqlJs({
      locateFile: (file) =>
        "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/" + file,
    });

    const respon = await fetch("./pendidikan.db");

    if (!respon.ok) {
      throw new Error("Database pendidikan.db tidak ditemukan.");
    }

    const buffer = await respon.arrayBuffer();
    const db = new SQL.Database(new Uint8Array(buffer));

    const hasil = db.exec(
      "SELECT nama_sekolah, tahun_masuk, tahun_lulus, keterangan FROM riwayat",
    );

    tbody.innerHTML = "";

    if (hasil.length > 0 && hasil[0].values.length > 0) {
      hasil[0].values.forEach((baris) => {
        const tr = document.createElement("tr");

        baris.forEach((data) => {
          const td = document.createElement("td");
          td.textContent = data ?? "";
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML =
        '<tr><td colspan="4">Belum ada data pendidikan.</td></tr>';
    }

    db.close();
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="4">Data gagal dimuat.</td></tr>';

    pesan.textContent = error.message;
    console.error(error);
  }
}

tampilkanData();
