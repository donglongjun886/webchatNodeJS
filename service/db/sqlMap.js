var sqlMap = {
  token : {
    select : 'SELECT * FROM token limit 1',
    insert : 'INSERT INTO token(access_token, expires_in) VALUES(?, ?)',
    delete : 'delete from token'
  },
  reserver : {
    select : 'SELECT * FROM reserver',
    insert : 'INSERT INTO reserver(openid,user_name,user_phone,reserver_time) VALUES (?,?,?,?)'
  }
}

module.exports = sqlMap;
