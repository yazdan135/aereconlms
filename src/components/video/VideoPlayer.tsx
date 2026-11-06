import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Lock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  EyeOff,
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  lectureTitle: string;
  studentName?: string;
  studentId?: string;
  onProgress?: (percent: number, currentTime: number, duration: number) => void;
  onComplete?: () => void;
  completionThreshold?: number; // e.g. 90%
  onSecurityEvent?: (type: string, details: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  lectureTitle,
  studentName = 'Hamza Malik',
  studentId = 'STU-PK-101',
  onProgress,
  onComplete,
  completionThreshold = 90,
  onSecurityEvent,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Security deterrent states
  const [isScreenCaptureDetected, setIsScreenCaptureDetected] = useState(false);
  const [securityWarningMessage, setSecurityWarningMessage] = useState<string | null>(null);

  // Dynamic moving watermark position (cycles every 5 seconds)
  const [watermarkPosIndex, setWatermarkPosIndex] = useState(0);

  const watermarkPositions = [
    { top: '12%', left: '8%', transform: 'none' },
    { top: '15%', right: '8%', left: 'auto', transform: 'none' },
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    { bottom: '18%', left: '10%', top: 'auto', transform: 'none' },
    { bottom: '20%', right: '12%', top: 'auto', left: 'auto', transform: 'none' },
  ];

  // Watermark circulation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkPosIndex((prev) => (prev + 1) % watermarkPositions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [watermarkPositions.length]);

  // Screen capture & visibility change detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsScreenCaptureDetected(true);
        setSecurityWarningMessage(
          'Screen recording or background window capture detected. Video playback has been temporarily obscured for intellectual property protection.'
        );
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
        if (onSecurityEvent) {
          onSecurityEvent(
            'VISIBILITY_CHANGE',
            `Window obscured or backgrounded during lecture: ${lectureTitle}`
          );
        }
      }
    };

    const handleWindowBlur = () => {
      // Best-effort detection when focus is lost to another application (e.g. screen recording software)
      // Only set capture if playing to avoid false positives on normal clicks
      if (isPlaying) {
        setIsScreenCaptureDetected(true);
        setSecurityWarningMessage(
          'External recording application focus or screen activity detected. Content secured.'
        );
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isPlaying, lectureTitle, onSecurityEvent]);

  // Video time tracking
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);

    const percent = Math.min(100, Math.round((cur / dur) * 100));
    if (onProgress) {
      onProgress(percent, cur, dur);
    }

    if (percent >= completionThreshold && !isCompleted) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isScreenCaptureDetected) {
      setIsScreenCaptureDetected(false);
      setSecurityWarningMessage(null);
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const watchPercentage = duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;
  const currentPos = watermarkPositions[watermarkPosIndex];

  return (
    <div className="w-full space-y-3">
      {/* Player Frame Container with right-click deterrent */}
      <div
        ref={containerRef}
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none group"
      >
        {/* Core Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          controlsList="nodownload nofullscreen"
          disablePictureInPicture
          playsInline
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
        />

        {/* ─── DYNAMIC MOVING WATERMARK ─── */}
        {!isScreenCaptureDetected && (
          <div
            style={currentPos as React.CSSProperties}
            className="absolute z-20 pointer-events-none transition-all duration-1000 ease-in-out"
          >
            <div className="bg-slate-950/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/45 text-[10px] font-mono leading-tight tracking-wide shadow-sm max-w-xs">
              <div className="font-semibold text-blue-300/60">AERECON EDU SECURE STREAM</div>
              <div>Licensed to: {studentName}</div>
              <div>UID: {studentId} • IP Verified</div>
              <div className="text-[9px] text-red-300/50 uppercase">Distribution strictly prohibited</div>
            </div>
          </div>
        )}

        {/* ─── BLACK OVERLAY SECURITY DETERRENT ─── */}
        {isScreenCaptureDetected && (
          <div className="absolute inset-0 z-30 bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
              <EyeOff className="w-7 h-7" />
            </div>
            <h4 className="text-base font-semibold text-white mb-2">Screen Capture Deterrent Activated</h4>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-5">
              {securityWarningMessage ||
                'Recording software or display capture behavior was detected. Playback has been obscured in accordance with institutional security policies.'}
            </p>
            <button
              onClick={() => {
                setIsScreenCaptureDetected(false);
                setSecurityWarningMessage(null);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Resume Safe Playback
            </button>
          </div>
        )}

        {/* Custom Video Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Progress Seek Bar */}
          <div className="relative mb-2 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-200">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10);
                }}
                title="Rewind 10s"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="text-[11px] font-mono text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Volume */}
              <div className="flex items-center gap-1.5 pl-2">
                <button
                  onClick={toggleMute}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Watch threshold badge */}
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  watchPercentage >= completionThreshold
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {watchPercentage}% Watched {watchPercentage >= completionThreshold && '✓ Target Met'}
              </span>

              <button
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion & Security Guidance Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
        <div className="flex items-center gap-2">
          {watchPercentage >= completionThreshold ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-emerald-800">
                Prerequisite completed! You have watched {watchPercentage}%. The lecture MCQ test is unlocked.
              </span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Watch at least <strong className="text-slate-800">{completionThreshold}%</strong> of this video (currently{' '}
                <strong className="text-blue-600">{watchPercentage}%</strong>) to unlock the associated MCQ assessment.
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
          <span>Dynamic Watermark Protected</span>
        </div>
      </div>
    </div>
  );
};

