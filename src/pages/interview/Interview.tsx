import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Video, Mic, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DUMMY_JOBS } from "@/lib/constants";
import NavBar from "@/components/NavBar";

const voiceWaveKeyframes = `
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes voiceWave {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.4);
    opacity: 0.15;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
`;

const softGlowKeyframes = `
@keyframes softGlowPulse {
  0% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
}`;

const style = document.createElement("style");
style.textContent = voiceWaveKeyframes;
document.head.appendChild(style);

if (!document.getElementById("softGlowKeyframes")) {
  const style = document.createElement("style");
  style.id = "softGlowKeyframes";
  style.textContent = softGlowKeyframes;
  document.head.appendChild(style);
}

if (!document.getElementById("voiceWaveKeyframes")) {
  const style = document.createElement("style");
  style.id = "voiceWaveKeyframes";
  style.textContent = voiceWaveKeyframes;
  document.head.appendChild(style);
}

const Interview = () => {
  const { jobid } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  // Separate states for video and audio
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<{
    microphones: MediaDeviceInfo[];
    speakers: MediaDeviceInfo[];
  }>({
    microphones: [],
    speakers: [],
  });

  const [selectedDevices, setSelectedDevices] = useState({
    camera: "",
    microphone: "",
    speaker: "",
  });

  // Separate refs for video and audio streams
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // For demo purposes, we'll use the first job from DUMMY_JOBS
  const job = DUMMY_JOBS.find((item) => item.id === Number(jobid));

  const updateDeviceList = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const cameras = devices
        .filter((device) => device.kind === "videoinput")
        .sort((a, b) => {
          if (a.label.toLowerCase().includes("default")) return -1;
          if (b.label.toLowerCase().includes("default")) return 1;
          if (
            a.label.toLowerCase().includes("built-in") ||
            a.label.toLowerCase().includes("mac")
          )
            return -1;
          if (
            b.label.toLowerCase().includes("built-in") ||
            b.label.toLowerCase().includes("mac")
          )
            return 1;
          return 0;
        });

      const microphones = devices
        .filter((device) => device.kind === "audioinput")
        .sort((a, b) => {
          if (a.label.toLowerCase().includes("default")) return -1;
          if (b.label.toLowerCase().includes("default")) return 1;
          if (
            a.label.toLowerCase().includes("built-in") ||
            a.label.toLowerCase().includes("mac")
          )
            return -1;
          if (
            b.label.toLowerCase().includes("built-in") ||
            b.label.toLowerCase().includes("mac")
          )
            return 1;
          return 0;
        });

      const speakers = devices
        .filter((device) => device.kind === "audiooutput")
        .sort((a, b) => {
          if (a.label.toLowerCase().includes("default")) return -1;
          if (b.label.toLowerCase().includes("default")) return 1;
          if (
            a.label.toLowerCase().includes("built-in") ||
            a.label.toLowerCase().includes("mac")
          )
            return -1;
          if (
            b.label.toLowerCase().includes("built-in") ||
            b.label.toLowerCase().includes("mac")
          )
            return 1;
          return 0;
        });

      setVideoDevices(cameras);
      setAudioDevices({ microphones, speakers });

      // Update selected devices if current ones are no longer available
      setSelectedDevices((prev) => {
        const newSelected = { ...prev };

        if (!cameras.find((c) => c.deviceId === prev.camera)) {
          newSelected.camera = cameras[0]?.deviceId || "";
        }
        if (!microphones.find((m) => m.deviceId === prev.microphone)) {
          newSelected.microphone = microphones[0]?.deviceId || "";
        }
        if (!speakers.find((s) => s.deviceId === prev.speaker)) {
          newSelected.speaker = speakers[0]?.deviceId || "";
        }

        return newSelected;
      });
    } catch (error) {
      console.error("Error updating device list:", error);
    }
  }, []);

  const setupVideoStream = useCallback(async (deviceId?: string) => {
    try {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoStreamRef.current = stream;

      // Update video element with stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error("Error setting up video stream:", error);
      throw error;
    }
  }, []);

  const setupAudioStream = useCallback(async (deviceId?: string) => {
    try {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: false,
        audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      audioStreamRef.current = stream;
      return stream;
    } catch (error) {
      console.error("Error setting up audio stream:", error);
      throw error;
    }
  }, []);

  const handleDeviceChange = async (
    type: "camera" | "microphone" | "speaker",
    deviceId: string
  ) => {
    setSelectedDevices((prev) => ({ ...prev, [type]: deviceId }));

    try {
      if (type === "camera") {
        await setupVideoStream(deviceId);
      } else if (type === "microphone") {
        await setupAudioStream(deviceId);
      }
      // Speaker changes don't require stream updates
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error switching device",
        description: "Failed to switch device. Please try again.",
      });
    }
  };

  useEffect(() => {
    const initializeDevices = async () => {
      try {
        // Initialize both video and audio streams
        await setupVideoStream();
        await setupAudioStream();
        await updateDeviceList();
        setPermissionsGranted(true);
      } catch (error) {
        console.error("Error initializing devices:", error);
        toast({
          variant: "destructive",
          title: "Permission denied",
          description: "Please allow camera and microphone access to continue.",
        });
      }
    };

    initializeDevices();

    // Add device change listener
    navigator.mediaDevices.addEventListener("devicechange", updateDeviceList);

    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        updateDeviceList
      );
    };
  }, [setupVideoStream, setupAudioStream, updateDeviceList, toast]);

  // Add speech synthesis
  useEffect(() => {
    const speakText = () => {
      const voices = window.speechSynthesis.getVoices();
      const text = "If you are able to hear me you can start the interview";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find((v) => v.name === "Kathy") || voices[5];

      utterance.onstart = () => {
        setIsSpeaking(true);
        setHasSpoken(true);
      };
      utterance.onend = () => setIsSpeaking(false);

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 1000);
    };

    const timer = setTimeout(() => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.resume();
        speakText();
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Add a function to replay the audio
  const replayAudio = () => {
    const text = "If you are able to hear me you can start the interview";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setHasSpoken(true);
    };
    utterance.onend = () => setIsSpeaking(false);

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleStartInterview = async () => {
    navigate(`/interview/${jobid}/call`);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Video Preview and Device Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{job.title} Interview</CardTitle>
                <p className="text-muted-foreground">
                  Please ensure your camera and microphone are working properly
                  before starting the interview.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Preview */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                </div>

                {/* Device Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-muted-foreground" />
                    <Select
                      value={selectedDevices.camera}
                      onValueChange={(value) =>
                        handleDeviceChange("camera", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoDevices.map((camera) => (
                          <SelectItem
                            key={camera.deviceId}
                            value={camera.deviceId}
                          >
                            {camera.label ||
                              `Camera ${camera.deviceId.slice(0, 5)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-muted-foreground" />
                    <Select
                      value={selectedDevices.microphone}
                      onValueChange={(value) =>
                        handleDeviceChange("microphone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select microphone" />
                      </SelectTrigger>
                      <SelectContent>
                        {audioDevices.microphones.map((mic) => (
                          <SelectItem key={mic.deviceId} value={mic.deviceId}>
                            {mic.label ||
                              `Microphone ${mic.deviceId.slice(0, 5)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                    <Select
                      value={selectedDevices.speaker}
                      onValueChange={(value) =>
                        handleDeviceChange("speaker", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select speaker" />
                      </SelectTrigger>
                      <SelectContent>
                        {audioDevices.speakers.map((speaker) => (
                          <SelectItem
                            key={speaker.deviceId}
                            value={speaker.deviceId}
                          >
                            {speaker.label ||
                              `Speaker ${speaker.deviceId.slice(0, 5)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Ready to Join */}
          <div className="flex flex-col justify-center">
            {/* Voice Speaking Animation */}
            <div className="relative flex flex-col items-center justify-center mb-6">
              {/* Voice Wave Animation (when speaking) */}
              {isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="absolute w-28 h-28 rounded-full border-2 border-primary"
                      style={{
                        animation: `voiceWave 1.8s cubic-bezier(0.4,0,0.2,1) ${
                          i * 0.4
                        }s infinite`,
                        opacity: 0.5,
                      }}
                    />
                  ))}
                </div>
              )}
              {/* Radial Glow (static, always visible) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div
                  className="w-24 h-24 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.05) 70%, transparent 100%)",
                    filter: "blur(4px)",
                  }}
                />
              </div>
              {/* Central Logo Circle */}
              <div
                className="relative w-20 h-20 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md z-10 cursor-pointer"
                onClick={replayAudio}
                title="Click to replay audio"
              >
                <span
                  className="text-4xl font-bold"
                  style={{
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI
                </span>
              </div>
            </div>
            {/* Improved Waiting Text and Dots */}
            {!isSpeaking && !hasSpoken && (
              <div className="flex flex-col items-center gap-3 mb-6">
                <p className="text-lg text-muted-foreground font-medium text-center">
                  Waiting for HirebyAI
                </p>
                <div className="flex gap-2 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]"></div>
                </div>
              </div>
            )}

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold">Ready to join?</h2>
                  <p className="text-muted-foreground">
                    Your interview is about to begin. Make sure your camera and
                    microphone are working properly.
                  </p>
                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleStartInterview}
                      disabled={!permissionsGranted}
                    >
                      Start Interview
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Support",
                          description:
                            "Our support team will contact you shortly.",
                        });
                      }}
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Having Issues?
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to AI Interview</DialogTitle>
            <DialogDescription>
              This interview will take approximately 10 minutes to complete.
              Please ensure you have a quiet environment and stable internet
              connection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">What to expect:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Technical questions related to the position</li>
                <li>Problem-solving scenarios</li>
                <li>Behavioral questions</li>
                <li>Real-time feedback and evaluation</li>
              </ul>
            </div>
            <Button
              className="w-full"
              onClick={() => setShowWelcomeModal(false)}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Interview;
