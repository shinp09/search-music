/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import ReactAudioPlayer from "react-audio-player";
import Style from "./MainContents.module.scss";

const ContentsView = (props) => {
  return (
    <div className={Style.container}>
      <div className={Style.maincontents}>
        <img className={Style.img} src={props.searchContents.trackImg} />
        <div className={Style.textArea}>
          <p className={Style.textContents}>
            <p className={Style.artistsName}>
              {props.searchContents.artistName}
            </p>
            <p className={Style.trackName}>{props.searchContents.trackName}</p>
          </p>
          <ul>
            <li>danceability : {props.trackInformation.danceability}</li>
            <li>energy : {props.trackInformation.energy}</li>
            <li>key : {props.trackInformation.key}</li>
            <li>loudness: {props.trackInformation.loudness}</li>
            <li>mode : {props.trackInformation.mode}</li>
            <li>valence : {props.trackInformation.valence}</li>
            <li>tempo : {props.trackInformation.tempo}</li>
          </ul>
          <ReactAudioPlayer
            className={Style.audio}
            src={props.searchContents.trackPreviewURL}
            controls
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentsView;
