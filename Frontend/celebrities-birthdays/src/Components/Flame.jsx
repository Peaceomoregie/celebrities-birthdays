import React, { useState, useEffect } from "react";

function Flame() {
    const [flameOpacity, setFlameOpacity] = useState(1);
    const [isBlowing, setIsBlowing] = useState(false);
    const [micStream, setMicStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    const blowThreshold = 110;
    useEffect(() => {
        startBlowDetection();
        return () => {
            if (audioContext) {
                audioContext.close();
                micStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);
    function startBlowDetection() {
        navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const audioCtx = new AudioContext();
            setAudioContext(audioCtx);
            setMicStream(stream);
            const microphone = audioCtx.createMediaStreamSource(stream);
            const analyserNode = audioCtx.createAnalyser();
            analyserNode.fftSize = 256;
            microphone.connect(analyserNode);
            setAnalyser(analyserNode);
            listenForBlow(analyserNode);
        })
        .catch((err) => {
            console.error("Error accessing microphone:", err);
        });
    }
    function listenForBlow(analyserNode) {
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        function detectBlow() {
            analyserNode.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const averageAmplitude = sum / bufferLength;
            if (averageAmplitude > blowThreshold) {
                setFlameOpacity((prevOpacity) => Math.max(prevOpacity - 0.05, 0));
            }
            requestAnimationFrame(detectBlow);
        }
        detectBlow();
    }
    return (
        <div className="w-fit h-fit z-50">
            <img
                src="/flame.gif"
                alt="flame"
                style={{
                opacity: flameOpacity,
            }}
            className="w-8 h-10 mx-auto"
        />
    </div>
  );
}

export default Flame;