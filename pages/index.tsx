import React, { useEffect } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import { UserProps } from "../components/User";
import TransactionForm from "../components/TransactionForm";

export const getStaticProps: GetStaticProps = async () => {
 
  const users = await fetch(`http://localhost:3000/api/users/`, {
    method: 'GET'
  });
  const res = await users.json();

  return { 
    props: { users: res }, 
    revalidate: 10 
  }
}

type Props = {
  users: UserProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <TransactionForm />
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Name </TableCell>
                  <TableCell align="right"> Email </TableCell>
                  <TableCell align="right"> Cheking Account</TableCell>
                  <TableCell align="right"> Cheking Funds</TableCell>
                  <TableCell align="right"> Saving Account</TableCell>
                  <TableCell align="right"> Saving Funds</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.users?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.checking.id}</TableCell>
                    <TableCell align="right">{row.checking.fund}</TableCell>
                    <TableCell align="right">{row.saving.id}</TableCell>
                    <TableCell align="right">{row.saving.fund}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </TableContainer>
    </Layout>
  )
}

export default Blog
