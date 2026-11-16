import sqlite3

# Membuat database
koneksi = sqlite3.connect("pendidikan.db")
cursor = koneksi.cursor()

# Membuat tabel
cursor.execute("""
CREATE TABLE IF NOT EXISTS riwayat (
    nama_sekolah TEXT,
    tahun_masuk INTEGER,
    tahun_lulus INTEGER,
    keterangan TEXT
)
""")

# Mengosongkan data lama agar tidak dobel
cursor.execute("DELETE FROM riwayat")

# Memasukkan data pendidikan
data = [
    ("MIS Dayeuhdatar", 2013, 2019, "Lulus"),
    ("MTs Negeri 2 Ciamis", 2019, 2022, "Lulus"),
    ("MAS Nurul Huda Kawali", 2022, 2025, "Lulus")
]

cursor.executemany("""
INSERT INTO riwayat
(nama_sekolah, tahun_masuk, tahun_lulus, keterangan)
VALUES (?, ?, ?, ?)
""", data)

koneksi.commit()
koneksi.close()

print("Database pendidikan.db berhasil dibuat!")
