// import React, { useState } from 'react';
// import './App.css';

// const App = () => {
//   const [url, setUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleUrlChange = (event) => {
//     setUrl(event.target.value);
//   };

//   const handleFetch = async () => {
//     setLoading(true);
//     setError(null);

//     const apiUrl = 'https://all-media-downloader1.p.rapidapi.com/Twitter';
//     const data = new FormData();
//     data.append('url', url);

//     const options = {
//       method: 'POST',
//       headers: {
//         'x-rapidapi-key': 'aad11d36a0msh8ba392534a1ac7fp14d056jsn1a47acca3254',
//         'x-rapidapi-host': 'all-media-downloader1.p.rapidapi.com'
//       },
//       body: data
//     };

//     try {
//       const response = await fetch(apiUrl, options);
//       const result = await response.json();
//       setLoading(false);

//       if (result.found && result.media && result.media.length > 0) {
//         window.open(result.media[0].url, '_blank'); // Open the media URL in a new window
//       } else {
//         setError('Media not found.');
//       }
//     } catch (error) {
//       setError('Failed to fetch the media. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Media Downloader</h1>
//       <input
//         type="text"
//         value={url}
//         onChange={handleUrlChange}
//         placeholder="Enter the URL to download media"
//         className="input"
//       />
//       <button onClick={handleFetch} disabled={loading} className="button">
//         {loading ? 'Fetching...' : 'Fetch'}
//       </button>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';
// import "loaders-ui/dist/main/index.min.css";
// import { FoldingCube } from 'loaders-ui';

// const App = () => {
//   const [url, setUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [downloadLink, setDownloadLink] = useState('');
//   const [platform, setPlatform] = useState('');

//   const handleUrlChange = (event) => {
//     setUrl(event.target.value);
//   };

//   const handlePlatformChange = (event) => {
//     setPlatform(event.target.value);
//   };

//   const handleFetch = async () => {
//     setLoading(true);
//     setError(null);
//     setDownloadLink('');

//     let apiUrl, data;
//     if (platform === 'twitter') {
//       apiUrl = 'https://all-media-downloader1.p.rapidapi.com/Twitter';
//       data = new FormData();
//       data.append('url', url);

//       const options = {
//         method: 'POST',
//         headers: {
//           'x-rapidapi-key': 'aad11d36a0msh8ba392534a1ac7fp14d056jsn1a47acca3254',
//           'x-rapidapi-host': 'all-media-downloader1.p.rapidapi.com'
//         },
//         body: data
//       };

//       try {
//         const response = await fetch(apiUrl, options);
//         const result = await response.json();
//         setLoading(false);

//         if (result.found && result.media && result.media.length > 0) {
//           setDownloadLink(result.media[0].url);
//         } else {
//           setError('Media not found.');
//         }
//       } catch (error) {
//         setError('Failed to fetch the media. Please try again.');
//         setLoading(false);
//       }
//     } else if (platform === 'instagram') {
//       apiUrl = 'https://all-media-downloader.p.rapidapi.com/download';
//       data = new FormData();
//       data.append('url', url);

//       const options = {
//         method: 'POST',
//         url: apiUrl,
//         headers: {
//           'x-rapidapi-key': 'aad11d36a0msh8ba392534a1ac7fp14d056jsn1a47acca3254',
//           'x-rapidapi-host': 'all-media-downloader.p.rapidapi.com',
//         },
//         data: data,
//       };

//       try {
//         const response = await axios.request(options);
//         setDownloadLink(response.data[0]); 
//         setError('');
//       } catch (error) {
//         console.error('Error fetching the download link', error);
//         setError('Failed to fetch media. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <h1 className='hi'>Media Downloader</h1>
//       <div className="select">
//         <select value={platform} onChange={handlePlatformChange} className="input">
//           <option value="">Select Platform</option>
//           <option value="twitter">Twitter</option>
//           <option value="instagram">Instagram</option>
//         </select>
//       </div>
//       <div className="button-group">
//         <input
//           type="text"
//           value={url}
//           onChange={handleUrlChange}
//           placeholder="Enter the URL to download media"
//           className="input"
//         />
//         <button onClick={handleFetch} disabled={loading} className="button">
//           {loading ? 'Fetching...' : 'Fetch Video'}
//         </button>
//       </div>
//       {loading && (
//         <div className="spinner-container">
//           <FoldingCube />
//         </div>
//       )}
//       {error && <p className="error">{error}</p>}
//       {downloadLink && (
//         <a href={downloadLink} target="_blank" rel="noopener noreferrer" download className="download-link">
//           Download Video
//         </a>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Loader from './Loader'; // Import the Loader component
import Popup from './Popup'; // Import the Popup component

function App() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handlePlatformSelect = (selectedPlatform) => {
    setPlatform(selectedPlatform);
    setError(null);
    setMediaUrl(null);
    setVideoDetails(null);
  };

  const handleDownload = async () => {
    if (!platform) {
      setError('Please select a platform.');
      return;
    }

    setLoading(true); // Set loading to true when starting fetch

    let apiUrl;
    let data = new FormData();

    if (platform === 'instagram') {
      apiUrl = 'https://all-media-downloader.p.rapidapi.com/download';
      data.append('url', url);
    } else if (platform === 'twitter') {
      apiUrl = 'https://all-media-downloader1.p.rapidapi.com/Twitter';
      data.append('url', url);
    } else if (platform === 'youtube') {
      apiUrl = `https://social-media-video-downloader.p.rapidapi.com/smvd/get/youtube?url=${encodeURIComponent(url)}`;
    }

    const options = {
      method: platform === 'youtube' ? 'GET' : 'POST',
      headers: {
        'x-rapidapi-key': '86590e184bmsh3586ffb45c8dbe8p1e1f5bjsn172a244c0755',
        'x-rapidapi-host': platform === 'instagram' ? 'all-media-downloader.p.rapidapi.com' :
          platform === 'twitter' ? 'all-media-downloader1.p.rapidapi.com' :
          'social-media-video-downloader.p.rapidapi.com',
      },
      body: platform !== 'youtube' ? data : undefined,
    };

    try {
      const response = await fetch(apiUrl, options);
      const result = await response.json();

      if (platform === 'twitter') {
        if (result.found && result.media.length > 0) {
          setMediaUrl(result.media[0].url);
        } else {
          setError('No media found for the given Twitter URL.');
        }
      } else if (platform === 'instagram') {
        setMediaUrl(result[0]);
      } else if (platform === 'youtube') {
        if (result.success) {
          setVideoDetails({
            title: result.title,
            author: result.author.name,
            thumbnail: result.picture,
            videoUrl: result.src_url,
            viewCount: result.stats.viewCount,
            likes: result.stats.likes,
            links: result.links || [], // Ensure links are available
          });
        } else {
          setError('Failed to fetch video details.');
        }
      }

      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch media. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  };

  const downloadMedia = () => {
    if (mediaUrl) {
      window.open(mediaUrl, '_blank');
    }
  };

  const iconStyle = (platformName) => ({
    color: platform === platformName ? 
      (platformName === 'instagram' ? '#E1306C' : 
       platformName === 'twitter' ? '#1DA1F2' : 
       platformName === 'youtube' ? '#FF0000' : 'white') 
      : 'white',
    fontSize: '60px', // Increased size
    cursor: 'pointer',
    display: 'inline-block', // Ensure the icon remains inline with other elements
    margin: '0 10px', // Space between icons
  });

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    // Set up an interval to show popup every 10 seconds
    const interval = setInterval(() => {
      setShowPopup(true);
    }, 20000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {/* {showPopup && <Popup onClose={closePopup} />}
      {showPopup && <div className="background-blur" />} */}
      <h1>Social Media Video Downloader</h1>
      <div className="platform-selection">
        <div
          onClick={() => handlePlatformSelect('instagram')}
          style={iconStyle('instagram')}
        >
          <InstagramIcon style={{ fontSize: '60px' }} />
        </div>
        <div
          onClick={() => handlePlatformSelect('twitter')}
          style={iconStyle('twitter')}
        >
          <TwitterIcon style={{ fontSize: '60px' }} />
        </div>
        <div
          onClick={() => handlePlatformSelect('youtube')}
          style={iconStyle('youtube')}
        >
          <YouTubeIcon style={{ fontSize: '50px' }} />
        </div>
      </div>
      <input
        type="text"
        placeholder={platform ? `Enter the URL of ${platform}` : "Select The Media Above And Then Enter the URL"}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={!platform}
        style={{
          textAlign: 'center',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          width: '90%'
        }}
      />
      <button onClick={handleDownload} disabled={!platform || !url}>
        Fetch Media
      </button>
      {loading && (
        <div className="loader-container">
          <Loader /> {/* Use the Loader component */}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {mediaUrl && (
        <div>
          <button onClick={downloadMedia}>Download Media</button>
        </div>
      )}
      {videoDetails && (
        <div className="video-details">
          <h2>{videoDetails.title}</h2>
          <p>Author: {videoDetails.author}</p>
          <img src={videoDetails.thumbnail} alt="Thumbnail" />
          <p>View Count: {videoDetails.viewCount}</p>
          <p>Likes: {videoDetails.likes}</p>
          <a href={videoDetails.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
          <div className="video-links">
            {videoDetails.links.map((link, index) => (
              <div key={index} className="link-item">
                <p>Quality: {link.quality}</p>
                <a href={link.link} target="_blank" rel="noopener noreferrer">Download</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;