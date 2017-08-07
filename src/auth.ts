import * as jwt from 'jsonwebtoken'

let key = jwt.sign({ uuid: 'uuid' }, 'secret', {
  expiresIn: 1000    
})

console.log(key)

jwt.verify(key, 'secret', (err, decoded) => {
  if (err) {
    console.error(err)
  }
  console.log(decoded)
})
