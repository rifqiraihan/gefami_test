// 1. Deret kelipatan 5 dari 50–100
console.log("1. Deret kelipatan 5 dan penilaian:");
for (let i = 50; i <= 100; i += 5) {
  let status = '';
  if (i <= 60) status = 'KURANG';
  else if (i <= 70) status = 'CUKUP';
  else if (i <= 80) status = 'BAIK';
  else status = 'LUAR BIASA';

  console.log(`${i} - ${status}`);
}

console.log("\n2. Deret Fibonacci 20 angka:");
const fib = [0, 1];
while (fib.length < 20) {
  fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
}
console.log(fib.join(' '));

console.log("\n3. Segitiga bintang sesuai x:");
const x = 4; // ubah value x
for (let i = 1; i <= x; i++) {
  console.log('* '.repeat(i).trim());
}

console.log("\n4. Terbilang 4 digit angka:");

function terbilang(num) {
  const satuan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
  const puluhan = ['', 'Sepuluh', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];
  const belasan = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];

  let hasil = '';

  const ribuan = Math.floor(num / 1000);
  const ratusan = Math.floor((num % 1000) / 100);
  const puluh = Math.floor((num % 100) / 10);
  const satu = num % 10;

  if (ribuan === 1) hasil += 'Seribu ';
  else if (ribuan > 0) hasil += satuan[ribuan] + ' Ribu ';

  if (ratusan === 1) hasil += 'Seratus ';
  else if (ratusan > 0) hasil += satuan[ratusan] + ' Ratus ';

  if (puluh === 1) {
    hasil += belasan[satu] + ' ';
  } else {
    if (puluh > 0) hasil += puluhan[puluh] + ' ';
    if (satu > 0) hasil += satuan[satu] + ' ';
  }

  return hasil.trim();
}

// Contoh penggunaan:
const numbersToConvert = [2234, 8500, 7001];
numbersToConvert.forEach((num) => {
  console.log(`${num} = ${terbilang(num)}`);
});
