// import React from "react";
// import { useStoreState } from "easy-peasy";
// import { Grid } from "@mui/material";
// import { Container } from "@mui/system";
// import { useParams } from "react-router-dom";
// import VideoCardItem from "../../video-card-item";

// const PlayerPage = () => {
//   const { playlistId } = useParams();
//   const { data } = useStoreState((state) => state.playlists);
//   const current = data[playlistId];

//   if (!current) return;

//   const videoItemArray = current.playlistItems;

//   return (
//     <div>
//       <Container maxWidth={"lg"} sx={{ paddingTop: 12 }}>
//         {videoItemArray.length > 0 && (
//           <Grid container alignItems="stretch">
//             {videoItemArray.map((item, index) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} mb={1}>
//                 <VideoCardItem
//                   key={index}
//                   title={item.title}
//                   thumbnails={item.thumbnails}
//                   videoId={item.contentDetails.videoId}
//                   videos={videoItemArray.map(
//                     (item) => item.contentDetails.videoId
//                   )}
//                   playlistId={playlistId}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default PlayerPage;

import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import { Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import VideoCardItem from "../../video-card-item";

const PlayerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { playlistId } = useParams();
  const { data } = useStoreState((state) => state.playlists);
  const current = data[playlistId];

  // Return a message or fallback if the playlist is not found
  if (!current) {
    return (
      <Container maxWidth="lg" sx={{ paddingTop: 12, textAlign: "center" }}>
        <h2>Playlist not found!</h2>
      </Container>
    );
  }

  const videoItemArray = current.playlistItems;

  // Filter playlists based on the search query
  const filteredPlaylistItem = videoItemArray.filter((playlistItem) =>
    playlistItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ paddingTop: 12 }}>
        {/* Search Bar */}
        <TextField
          placeholder="Search Videos"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            marginBottom: 3,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "4px",
          }}
        />

        {filteredPlaylistItem.length > 0 ? (
          <Grid container alignItems="stretch" spacing={2}>
            {filteredPlaylistItem.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.contentDetails.videoId}
              >
                <VideoCardItem
                  title={item.title}
                  thumbnails={item.thumbnails}
                  videoId={item.contentDetails.videoId}
                  videos={filteredPlaylistItem.map(
                    (video) => video.contentDetails.videoId
                  )}
                  playlistId={playlistId}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <h3 style={{ textAlign: "center" }}>No videos found!</h3>
        )}
      </Container>
    </div>
  );
};

export default PlayerPage;
