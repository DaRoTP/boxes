import { Button, TextField } from '@mui/material'
import React from 'react'

const Login = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="username" variant="outlined" />
      <TextField id="outlined-basic" label="password" variant="outlined" type="password" />
      <Button variant="contained" size="medium">
              Login
      </Button>
    </div>
  )
}

export default Login