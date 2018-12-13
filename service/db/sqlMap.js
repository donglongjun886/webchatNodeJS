var sqlMap = {
  token : {
    select : 'SELECT * FROM token limit 1',
    insert : 'INSERT INTO token(access_token, expires_in) VALUES(?, ?)',
    delete : 'delete from token'
  }
}

module.exports = sqlMap;
