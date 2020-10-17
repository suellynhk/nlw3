const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');
//o uso de async permite o uso do await, estratégia para evita o uso de .then() no final
//o await faz com que o js execute e aguarde pra só depois executar a proxima instrução
Database.then(async db => {
    await saveOrphanage (db,   {
        lat: "-23.3212398" ,
        lng: "-51.1395138",
        name: "Lar Anália Franco",
        whatsapp: "43 3325-8060",
        about:"Oferece acolhimento a crianças órfãs, vítimas de abandono e violência. Encaminhados pelo Juiz da Vara da Infância e da Juventude de Londrina que ficam sob a guarda do Lar Anália Franco e recebem todo atendimento de educação e saúde, além de muito carinho e dedicação. É um lar substituto, de caráter provisório, que recebe essas crianças até que elas sejam reintegradas ao convívio familiar ou encaminhadas pelo sistema de Justiça para família substituta.",
        images: [
            "http://127.0.0.1:8800/images/laranalia1.jpg",
            "http://127.0.0.1:8800/images/laranalia2.jpg",
            "http://127.0.0.1:8800/images/laranalia3.jpg",
            "http://127.0.0.1:8800/images/laranalia4.jpg",
        ].toString(),
        instructions: "Um pouquinho da sua atenção, amor e dedicação às crianças do Lar são sempre muito bem-vindas. E até mesmo formas de trabalhar com as crianças, aulas, cursos, o que você se propor a fazer de coração pelo Lar, é disso o que eles estão precisando!",
        opening_hours: "Horários de visitas das 8:00 até 18:00",
        open_on_weekends:"1"
 
    } ) 

     //consultar dados da tabela- 'all' busca todos os dados da tabela
    const selectedOrphanage= await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanage)
  
    //consultar dados de um orfanato pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id="2"')
    console.log(orphanage)
})


