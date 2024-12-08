import React, { useState, useEffect } from "react";
import { useUserUpdateRequest } from '@dynamic-labs/sdk-react-core';

import {
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal,
  CircularProgress,
} from "@mui/material";

export default function VoteFlow({ voter }) {
  const [maleVote, setMaleVote] = useState("");
  const [femaleVote, setFemaleVote] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateUser } = useUserUpdateRequest();
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.users || []);
        if(voter.metadata.voted){
          setVoted(true);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const submitVote = async () => {
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: maleVote,
          maleVote,
          femaleVote,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit vote");
      console.log("Vote submitted successfully");
      setOpenModal(false);
    } catch (error) {
      console.error("Error submitting vote:", error);
    } finally {
      const updatedUser = await updateUser({ metadata: { voted: true } });
      console.log("Updated user:", updatedUser);
      setVoted(true);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="50%"
      gap={3}
    >
      {voted ? (
        <Typography variant="h6" align="center" color="primary">
          Thank you for voting!
        </Typography>
      ) : (
        <>
          <Typography variant="h5" align="center">
            Vote for 2024's Pajama Winners
          </Typography>

          {/* Male Vote */}
          <FormControl fullWidth>
            <InputLabel id="male-vote-label">Best Male Costume</InputLabel>
            <Select
              labelId="male-vote-label"
              value={maleVote}
              onChange={(e) => setMaleVote(e.target.value)}
            >
              {users
                .filter((user) => user.metadata?.Gender === "Male")
                .map((user) => (
                  <MenuItem key={user.email} value={user.email}>
                    {user.email}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Female Vote */}
          <FormControl fullWidth>
            <InputLabel id="female-vote-label">Best Female Costume</InputLabel>
            <Select
              labelId="female-vote-label"
              value={femaleVote}
              onChange={(e) => setFemaleVote(e.target.value)}
            >
              {users
                .filter((user) => user.metadata?.Gender === "Female")
                .map((user) => (
                  <MenuItem key={user.email} value={user.email}>
                    {user.email}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            disabled={!maleVote || !femaleVote}
          >
            Submit
          </Button>

          {/* Confirmation Modal */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={modalStyle}>
              <Typography variant="h6" gutterBottom>
                Confirm Your Votes
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Male Costume:</strong> {maleVote}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Female Costume:</strong> {femaleVote}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={submitVote}
                style={{ marginTop: 16 }}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
}
