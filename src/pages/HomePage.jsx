import { Container, Grid, Box, Pagination, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserBoard from '../components/UserBoard';
import { getUserBoards } from '../services/boardService';

export default function HomePage() {
  const userBoards = useSelector(state => state.board.userBoards);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  async function fetchData() {
    const response = await getUserBoards({ pageSize: 6, currentPage: currentPage });

    setCurrentPage(response.body.currentPage);
    setPageCount(response.body.pageCount);
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, pageCount]);

  return (
    <>
      <Box sx={{ mt: 5 }}></Box>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <Container>
            <Grid container spacing={2}>
              {userBoards.map((value, index) =>
                <Grid key={index} item md={4} >
                  <UserBoard boardId={value.id} title={value.title} />
                </Grid>
              )}
            </Grid>
            <Divider sx={{ my: 2 }} orientation="horizontal" />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination color="primary" count={pageCount} page={currentPage} onChange={(event, value) => setCurrentPage(value)} />
            </Box>
          </Container>
        </Grid>
        <Grid item md={4}>

        </Grid>
      </Grid>
    </>
  )
}
