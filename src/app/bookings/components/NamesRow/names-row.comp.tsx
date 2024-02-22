import React from 'react'
import {TableCell, TableRow} from '@mui/material'

const NamesRow = () => {
  return (
    <TableRow>
        <TableCell></TableCell>
        <TableCell>User id</TableCell>
        <TableCell>User</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Origin</TableCell>
        <TableCell>Destination</TableCell>
        <TableCell>Status</TableCell>
        <TableCell></TableCell>
    </TableRow>
  )
}

export default NamesRow