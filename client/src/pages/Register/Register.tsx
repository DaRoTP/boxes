import { Button, TextField } from '@mui/material'
import React from 'react'

const Register = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="username" variant="outlined" />
      <TextField id="outlined-basic" label="password" variant="outlined" type="password" />
      <TextField id="outlined-basic" label="repeat password" variant="outlined" type="password" />
      <Button variant="contained" size="medium">
          Register
      </Button>
    </div>
  )
}

export default Register