import { Container } from '@mui/material'
import React from 'react'

export default function MainLayoutContent(props) {
  return (
    <Container maxWidth="xl" sx={{py: 10}}>
        {props.children}
    </Container>
  )
}
