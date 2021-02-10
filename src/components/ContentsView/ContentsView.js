/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import ReactAudioPlayer from "react-audio-player";
import Style from "./ContentsView.module.scss";

const ContentsView = (props) => {


  return (
    <div className={Style.container}>
      <div className={Style.maincontents}>
      <img className={Style.img} src={props.searchContents.trackImg} />
      <div className={Style.textContents}>
        <h3>{props.searchContents.artistName}</h3>
        <h3>{props.searchContents.trackName}</h3>
      </div>
      <ReactAudioPlayer
        className={Style.audio}
        src={props.searchContents.trackPreviewURL}
        controls
      />
      </div>
      <div className={Style.wrapper}>
        <ul>
          <li>
            danceability : {props.trackInformation.danceability}
            (踊りやすさ) 
          </li>
          <li>energy : {props.trackInformation.energy} (曲の過激さ) </li>
          <li>key : {props.trackInformation.key} (楽曲のキー)</li>
          <li>
            loudness:{" "}
            {props.trackInformation.loudness}
            (音量・音圧（db）の平均値) 
          </li>
          <li>
            mode : {props.trackInformation.mode} (調性 メジャー=1、マイナー=0)
          </li>
          <li>valence : {props.trackInformation.valence} (明るさ)</li>
          <li>tempo : {props.trackInformation.tempo} (BPM)</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentsView;
