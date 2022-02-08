const Atendimento = require('../models/atendimentos')

module.exports = app => {
  
  //Rota get - lista atendimentos
  app.get('/atendimentos',(req, res) => {
    Atendimento.lista(res)
  })

  app.get('/atendimentos/:id',(req, res) => {
    const id = parseInt(req.params.id)
    Atendimento.buscaPorId(id, res)
  })

  app.patch('/atendimentos/:id',(req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    Atendimento.alterar(id, valores, res)
  })

  app.delete('/atendimentos/:id',(req, res) => {
    const id = parseInt(req.params.id)
    
    Atendimento.deletar(id, res)
  })

  //Rota post - create atendimentos
  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    Atendimento.adiciona(atendimento, res)
  })
}