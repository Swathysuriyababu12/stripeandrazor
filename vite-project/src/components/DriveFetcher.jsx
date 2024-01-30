import React, { useState } from "react";
import { google } from "googleapis";

const DriveFetcher = () => {
  const [fileContent, setFileContent] = useState("");

  const fetchDataFromDrive = async () => {
    try {
      // Replace 'YOUR_FILE_ID' with the actual ID of your file
      const fileId = "YOUR_FILE_ID";

      // Set up the Google Drive API client
      const auth = await getAuthClient();
      const drive = google.drive({ version: "v3", auth });

      // Fetch the file content
      const response = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "text" }
      );

      // Update state with the fetched content
      setFileContent(response.data);
    } catch (error) {
      console.error("Error fetching data from Google Drive:", error);
    }
  };

  const getAuthClient = async () => {
    // Set up the Google API client
    const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_GOOGLE_API_KEY } =
      process.env;

    const gapi = await window.gapi.client.init({
      apiKey: REACT_APP_GOOGLE_API_KEY,
      clientId: REACT_APP_GOOGLE_CLIENT_ID,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ],
      scope: "https://www.googleapis.com/auth/drive.readonly",
    });

    // Sign in the user, if not already signed in
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      await gapi.auth2.getAuthInstance().signIn();
    }

    return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      .id_token;
  };

  return (
    <div>
      <button onClick={fetchDataFromDrive}>Fetch Data from Google Drive</button>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default DriveFetcher;
