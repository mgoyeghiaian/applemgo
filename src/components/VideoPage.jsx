import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AppleVideo } from '/src/utils/index.js'
const VideoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-[#1D1D1F] relative overflow-hidden">
      <IconButton
        aria-label="close"
        onClick={() => navigate(-1)}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
          backgroundColor: '#333336',
          borderRadius: '50%',
          width: 48,
          height: 48,
        }}
      >
        <CloseIcon className=' foxt-2xl font-extrabold text-gray hover:text-white'
        />
      </IconButton>
      <ReactPlayer
        url={AppleVideo}
        playing
        controls
        width="70%"
        height="70%"
      />
    </div>
  );
};

export default VideoPage;
