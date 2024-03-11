require('dotenv').config()
const nodemailer=require('nodemailer');
// objecto que recebe os dados do email como o email e o nome do usuario
const DadosEmail={
    email_clinent:"",
    nome_Client:""
}
// Metodo de criação do Email
let transporter=nodemailer.createTransport({
    host: "gmail",
    port:465,
    secure:true,
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.SENHA }});

 // Metodo para envio do Email       
const sendTestEmail=async(DadosEmail)=>{
 await transporter.sendMail({
    from:process.env.EMAIL,
    to:DadosEmail.email_clinent,
    subject:`Parabéns por se juntar à nossa comunidade de e-commerce!🎉🎊`,
    text:``,
    html:`
        <p>Olá ${DadosEmail.nome_Client}, seja muito bem-vindo(a) a <strong>AstroCommerce</strong>, Estamos muito felizes por ter você conosco.</p>
        <p>Aqui você pode comprar e vender produtos de diversos tipos, categorias e preços. Você também pode interagir com outros usuários, avaliar suas compras e receber feedbacks.</p>
        <p>Se você tiver alguma dúvida, sugestão ou reclamação, entre em contato conosco pelo e-mail suporte@Astro.com.ao ou pelo telefone (+244) 995184644. Estamos à disposição para atendê-lo.</p>
        <p> Esperamos que você aproveite a sua experiência de e-commerce conosco. Obrigado por escolher a nossa plataforma!
        </p>
        <br>
        Atenciosamente,
        <br>
       A Equipe da AstroCommerce Conectando universos de vendas 🚀`
}).then(msg=>{
console.log(msg);
}).catch(err=>{
    console.log(`erro ao enviar`+err)
})
}
module.exports = { sendTestEmail };