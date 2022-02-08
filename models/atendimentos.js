const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
  adiciona(atendimento, res){
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

    const dateIsValid = moment(data).isSameOrAfter(dataCriacao)
    const clienteIsValid = atendimento.cliente.length > 4

    const validacoes = [
      {
        nome: 'data',
        isValide: dateIsValid,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        isValide: clienteIsValid,
        mensagem: 'Cliente deve ter mais de 4 caracteres'
      }
    ]

    const erros = validacoes.filter(campo => !campo.isValide)
    const existemErros = erros.length

    if(existemErros){
      res.status(400).json(erros)
    }else{
      const atendimentoDatado = {...atendimento, dataCriacao, data}

      const sql = 'INSERT INTO Atendimentos SET ?'

      conexao.query(sql,atendimentoDatado, (erro, result)=>{
        if(erro){
          res.status(400).json(erro)
        }else{
          res.status(201).json(atendimentoDatado)
        }
      })
    }
  }

  lista(res){
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (erro, rest) => {
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json(rest)
      }
    })
  }

  buscaPorId(id, res){
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
    
    conexao.query(sql, (erro, rest) => {
      const atendimento = rest[0]

      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json(atendimento)
      }
    })
  }

  alterar(id,values, res) {
    if(values.data){
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
    
    conexao.query(sql, [values, id], (erro, result) => {
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json({...valores, id})
      }
    })
  }

  deletar(id, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?'
    
    conexao.query(sql,id, (erro, result) => {
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Atendimento