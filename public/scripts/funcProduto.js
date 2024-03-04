const f_foto=document.getElementById('f_foto');
const imagem=document.getElementById('imagem');


f_foto.addEventListener('change', function(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    imagem.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
 });

 
  


