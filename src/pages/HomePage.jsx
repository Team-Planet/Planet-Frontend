import {
  Container,
  Grid,
  Box,
  Pagination,
  Divider,
  Paper,
  Typography,
  Avatar
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserBoard from "../components/UserBoard";
import { getUserBoards } from "../services/boardService";
import { redirect } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import MainPaper from "../components/MainPaper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const userBoards = useSelector((state) => state.board.userBoards);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const {user} = useAuth();

  async function fetchData() {
    const response = await getUserBoards({
      pageSize: 8,
      currentPage: currentPage,
    });

    setCurrentPage(response.body.currentPage);
    setPageCount(response.body.pageCount);
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <MainPaper title="Aktif Panolarım" icon={<DashboardIcon />}>
            <Container>
              <Grid container spacing={2}>
                {userBoards.map((value, index) => (
                  <Grid key={index} item xs={6} md={3}>
                    <UserBoard boardId={value.id} title={value.title} />
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} orientation="horizontal" />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  color="primary"
                  count={pageCount}
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                />
              </Box>
            </Container>
          </MainPaper>
        </Grid>
        <Grid item md={4}>
          <MainPaper title="Profilim" icon={<PersonOutlineIcon />}>
            <Box display="flex" justifyContent="center">
              <Avatar sx={{width: 150, height: 150}} />
            </Box>
            <Typography marginTop={1} fontSize={20} fontWeight={500} align="center">{user.name}</Typography>
            <Typography marginTop={0.5} fontSize={14} fontWeight={300} align="center">{user.email}</Typography>
          </MainPaper>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
