'use client';

import React from 'react';
import clsx from 'clsx';

import { Assets } from '@/utils/consts';

import classes from './YangoPlayer.module.scss';

const Radius = 48;
const Circumference = 2 * Math.PI * Radius;

export const YangoPlayer: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const start = () => {
    void videoRef.current?.play().catch(() => setPlaying(false));
  };

  return (
    <div className={clsx(classes.player, playing && classes.expanded)}>
      <video
        ref={videoRef}
        className={clsx(classes.video, !playing && classes.hidden)}
        controls={playing}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;

          setProgress(video.duration ? video.currentTime / video.duration : 0);
        }}
        muted
      >
        <source src={Assets.yangoPlayVideo} type="video/mp4" />
      </video>

      <button
        type="button"
        aria-label="Play the Yango Plus video"
        className={classes.badge}
        inert={playing}
        onClick={start}
      >
        <span aria-hidden className={classes.icon} />
      </button>

      {progress > 0 && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className={classes.ring}
          style={{ rotate: '-90deg' }}
        >
          <circle className={classes.track} cx="50" cy="50" r={Radius} />
          <circle
            className={classes.progress}
            cx="50"
            cy="50"
            r={Radius}
            strokeDasharray={Circumference}
            strokeDashoffset={Circumference * (1 - progress)}
          />
        </svg>
      )}
    </div>
  );
};
