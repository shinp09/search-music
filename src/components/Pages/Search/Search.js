import React, { useState, useEffect } from "react";
import { Credentials } from "../../Credentials";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MainContents from "../../Organisms/MainContents/MainContents";
import Header from "../../Molecules/Header/Header";
import SimilarPage from "../../Organisms/SimilarPage/SimilarPage";
import Style from './Search.module.scss'

const Search = () => {
  const spotify = Credentials();

  const [token, setToken] = useState("");
  const [trackInformation, setTracksInformation] = useState("");
  const [searchContents, setSearchContents] = useState({
    artistName: "",
    artistId: "",
    trackPreviewURL: "",
    trackImg: "",
    trackName: "",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryResult = searchParams.get("query");

  useEffect(() => {

    ResetSearchContentsURL()

    /* アクセスTokenを発行 START */
    // tokenを発行し、権限を付与
    // 付与されたTokenをuseStateのtokenに代入し、値を保持
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      /* アクセスTokenを発行 END */

      /* アーティスト情報を取得 START */

      axios(`https://api.spotify.com/v1/tracks/${queryResult}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      })
        .then((trackContentsReaponse) => {
          setSearchContents({
            artistName: trackContentsReaponse.data.artists[0].name,
            artistId: trackContentsReaponse.data.artists[0].id,
            trackPreviewURL: trackContentsReaponse.data.preview_url,
            trackImg: trackContentsReaponse.data.album.images[0].url,
            trackName: trackContentsReaponse.data.name,
          });
        })
        .catch((err) => {
          console.log("err:", err);
        });

      /* アーティスト情報を取得 END */

      /* 楽曲情報を取得 START */

      axios(`https://api.spotify.com/v1/audio-features?ids=${queryResult}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      })
        .then((tracksReaponse) => {
          setTracksInformation(tracksReaponse.data.audio_features[0]);
        })
        .catch((err) => {
          console.log("err:", err);
        });

      /* 楽曲情報を取得 END */
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResult, spotify.ClientId, spotify.ClientSecret]);

// トラックURLを初期化
  const ResetSearchContentsURL = () =>  {
    setSearchContents({
      trackPreviewURL: "",
    })
  }

  return (
    <div>
      <Header />
      <MainContents
        searchContents={searchContents}
        trackInformation={trackInformation}
      />
      <h3 className={Style.text}>【 {searchContents.trackName} 】に似た曲はこちら</h3>
      <SimilarPage
        token={token}
        trackInformation={trackInformation}
        queryResult={queryResult}
      />
    </div>
  );
};

export default Search;
