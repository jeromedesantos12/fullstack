# BUG

## Bug REGISTER
kasih halaman register rute baru yang tidak dikunci jwt, dgn method post baru yg auto isi rolenya jadi "USER", sehingga halaman frontend nggak perlu masukin default isi role lagi di attr axios.

## Bug REACT ROUTER
cobain metode protected routes. (utk sekarang baru migrasi dari kunci per halaman langung kunci per rutenya) 

## Bug ROUTE
rute "/auth/logout" dari passport tidak terpakai (kalo di hapus bug) karena dgn logout saja sudah cukup, lalu bermasalah: 
- kalo bikin kondisi if ada token di frontend udh pasti aneh lah ya, gak udah dibahas) menyimpang dari tujuan awal pakai cookies biar gak bisa diakses dari depan
- "/auth/logout" tidak bisa redirect method deletenya si "/user/logout" solusi "/user/logout" ubah methodnya jadi get kaya si routenya passport yg pake method get semua
- "/user/logout" redirect ke "/auth/logout" jika kondisi? ada req.user (dari serialize user) SALAH!: ada req.cookies.session BENAR! masalah baru res.JSON gak bisa dikirim barengan sama redirect (karena di anggap double header response) lempar response ke "/user/logout" ? jadi frontend gk pake "/user/logout" lalu masalah baru pas muncul res.json harus kena redirect ke user login lagi (yg berarti hapus JSON biar jalan)
- keputusan? utk sementara pakai "/user/logout" dulu

## Bug VALIDASI OATH
masalah di mulai ketika res.json & res.redirect sama-sama kirim header, lalu bagaimana cara kirim alert ke frontend kalo pas login error? (soalnya tidak ditarik axios) (ini juga jadi masalah ketika simpan akun ke db lalu akunnya udh ada)
- res.send
-> kasih halaman user tampilan html + tombol balik ke beranda (css nggak masuk, js tanpa npm, mungkin pakai ejs) mungkin masih bisa kirim variabel beda halaman di satu service
- res.render
-> kasih kasih halaman user tampilan html templating engiene ejs, pas masuk kalo email belum ada langsung di lempar ke halaman itu dan disuruh isi username dan password + tombol tambah 
(masuk rute post)
- res.redirect -> sebelum balik ke login, oper ke 1 halaman khusus dulu di react.js lalu kirim messsage pakai parameter url (tangkep pakai useParams)
- solusi paling mudah? ganti attribut username sama nama biasa lalu jika email kembar ya berarti udah daftar
- solusi yg didapat -> kalo email user belum terdaftar, kirim attr email pakai cookies! biar user yg isi sendiri attribut lainnya! (masa bodoh username kembar juga, pokoknya kalo kembar ya bakal muncul validasi di form)

## Bug GOOGLE & FB OAUTH
masalah ketika google cuma mau nerima 127.0.0.1, sedangkan fb maunya localhost dan default vite pakainya 127.0.0.1 jadi gak jalan